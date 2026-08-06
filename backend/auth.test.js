import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';

process.env.ADMIN_SESSION_SECRET = 'test-secret-with-at-least-32-characters';

const { hashPassword, requireAdmin, verifyPassword, verifySessionToken } = await import('./routes/authRoutes.js');
const { buildOrder } = await import('./routes/orderRoutes.js');

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

test('server recalculates product pricing instead of trusting client totals', () => {
  const order = buildOrder({
    orderNumber: 'BTS-20260806-ABC123',
    buyer: {
      name: 'Pembeli', whatsapp: '081234567890', email: '', address: 'Jalan Mawar 1',
      city: 'Bogor', village: 'Babakan', district: 'Dramaga', province: 'Jawa Barat', postal: '16680', note: '',
    },
    cart: { totalQty: 5 },
    shippingService: { code: 'REG', name: 'JNE REG', totalFee: 20_000, eta: '2–3 hari' },
    paymentMethod: 'QRIS',
    pricing: { grandTotal: 1 },
  });
  assert.deepEqual(order.pricing, { productTotal: 80_000, shippingTotal: 20_000, grandTotal: 100_000 });
});
