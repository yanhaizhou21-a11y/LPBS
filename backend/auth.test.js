import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';

process.env.ADMIN_SESSION_SECRET = 'test-secret-with-at-least-32-characters';

const { hashPassword, requireAdmin, verifyPassword, verifySessionToken } = await import('./routes/authRoutes.js');
const { buildOrder } = await import('./routes/orderRoutes.js');
const { default: productRouter, buildProduct } = await import('./routes/productRoutes.js');
const { default: express } = await import('express');

function tokenFor(role, exp = Math.floor(Date.now() / 1000) + 60) {
  const payload = Buffer.from(JSON.stringify({ sub: 'test', name: 'Test', role, exp })).toString('base64url');
  const signature = createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

test('password hash accepts the right password and rejects another', () => {
  const hash = hashPassword('strong-password', 'fixed-test-salt');
  assert.equal(verifyPassword('strong-password', hash), true);
  assert.equal(verifyPassword('wrong-password', hash), false);
});

test('only a signed, unexpired SUPER_ADMIN session is accepted', () => {
  assert.equal(verifySessionToken(tokenFor('SUPER_ADMIN'))?.role, 'SUPER_ADMIN');
  assert.equal(verifySessionToken(tokenFor('BUYER')), null);
  assert.equal(verifySessionToken(tokenFor('STAFF_FINANCE')), null);
  assert.equal(verifySessionToken(tokenFor('SUPER_ADMIN', 1)), null);
  assert.equal(verifySessionToken('forged.token'), null);
});

test('admin middleware returns a visible explicit denial without a valid session', () => {
  const req = { headers: {} };
  let status;
  let body;
  const res = { status(value) { status = value; return this; }, json(value) { body = value; return this; } };
  requireAdmin(req, res, () => assert.fail('next must not be called'));
  assert.equal(status, 401);
  assert.match(body.message, /Unauthorized Access/);
});

test('admin middleware explicitly rejects buyer and staff sessions', () => {
  for (const role of ['BUYER', 'STAFF_INVENTORY', 'STAFF_FINANCE', 'STAFF_TRACKING']) {
    const req = { headers: { cookie: `botani_admin_session=${tokenFor(role)}` } }; let status; let body;
    const res = { status(value) { status = value; return this; }, json(value) { body = value; return this; } };
    requireAdmin(req, res, () => assert.fail(`${role} must not reach admin product routes`)); assert.equal(status, 401); assert.match(body.message, /Unauthorized Access/);
  }
});

test('admin middleware allows a valid SUPER_ADMIN session', () => {
  const req = { headers: { cookie: `botani_admin_session=${tokenFor('SUPER_ADMIN')}` } };
  let called = false;
  requireAdmin(req, {}, () => { called = true; });
  assert.equal(called, true);
});

test('product update and delete routes explicitly deny unauthenticated, buyer, and staff roles', async (t) => {
  const app = express();
  app.use(express.json());
  app.use('/products', productRouter);
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const { port } = server.address();
  const identities = [null, 'BUYER', 'STAFF_INVENTORY', 'STAFF_FINANCE', 'STAFF_TRACKING'];
  for (const method of ['PATCH', 'DELETE']) {
    for (const role of identities) {
      const response = await fetch(`http://127.0.0.1:${port}/products/protected-product`, {
        method,
        headers: role ? { cookie: `botani_admin_session=${tokenFor(role)}`, 'content-type': 'application/json' } : { 'content-type': 'application/json' },
        body: method === 'PATCH' ? JSON.stringify({}) : undefined,
      });
      const body = await response.json();
      assert.equal(response.status, 401, `${method} must reject ${role || 'anonymous'}`);
      assert.match(body.message, /Unauthorized Access/);
    }
  }
});

test('product input is validated and normalized on the server', () => {
  const product = buildProduct({ name: '  Benih Cabai Bonita  ', nameEn: 'Bonita Chili Seeds', category: 'hortikultura', price: 25000, stock: 12, description: 'Benih cabai unggul untuk budidaya.', descriptionEn: 'Premium chili seeds for productive cultivation.', imageUrl: '' });
  assert.equal(product.slug, 'benih-cabai-bonita');
  assert.equal(product.name, 'Benih Cabai Bonita');
  assert.equal(product.nameEn, 'Bonita Chili Seeds');
  const updated = buildProduct({ ...product, name: 'Nama Produk Baru' }, product);
  assert.equal(updated.slug, product.slug, 'editing a name must preserve stable product links');
  assert.throws(() => buildProduct({ ...product, category: 'rahasia' }), /Kategori produk tidak valid/);
});

test('server recalculates product pricing instead of trusting client totals', () => {
  const order = buildOrder({
    orderNumber: 'BTS-20260806-ABC123',
    buyer: {
      name: 'Pembeli', whatsapp: '081234567890', email: '', address: 'Jalan Mawar 1',
      city: 'Bogor', village: 'Babakan', district: 'Dramaga', province: 'Jawa Barat', postal: '16680', note: '',
    },
    cart: { items: [{ id: 'paket-benih-sayur', qty: 5 }] },
    shippingService: { code: 'REG', name: 'JNE REG', totalFee: 20_000, eta: '2–3 hari' },
    paymentMethod: 'QRIS',
    pricing: { grandTotal: 1 },
  });
  assert.deepEqual(order.pricing, { normalTotal: 100_000, discountTotal: 20_000, productTotal: 80_000, shippingTotal: 20_000, grandTotal: 100_000 });
});

test('server prices a mixed cart from its trusted catalog', () => {
  const order = buildOrder({
    orderNumber: 'BTS-20260806-DEF456',
    buyer: { name: 'Pembeli', whatsapp: '081234567890', email: '', address: 'Jalan Mawar 1', city: 'Bogor', village: 'Babakan', district: 'Dramaga', province: 'Jawa Barat', postal: '16680', note: '' },
    cart: { items: [{ id: 'benih-bayam-rosa', qty: 2 }, { id: 'padi-ipb-9g', qty: 1 }] },
    shippingService: null,
    paymentMethod: 'BRI',
  });
  assert.equal(order.cart.totalQty, 3);
  assert.equal(order.pricing.grandTotal, 125_000);
  assert.deepEqual(order.cart.items.map(({ id, qty }) => ({ id, qty })), [{ id: 'benih-bayam-rosa', qty: 2 }, { id: 'padi-ipb-9g', qty: 1 }]);
});
