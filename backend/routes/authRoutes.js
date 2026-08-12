import { config } from 'dotenv';
import { Router } from 'express';
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

config();

const router = Router();
const COOKIE_NAME = 'botani_admin_session';
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const loginAttempts = new Map();

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const sign = (value, secret) => createHmac('sha256', secret).update(value).digest('base64url');

export function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return `scrypt$${salt}$${scryptSync(password, salt, 64).toString('hex')}`;
}

export function verifyPassword(password, storedHash) {
  const [algorithm, salt, expectedHex] = String(storedHash || '').split('$');
  if (algorithm !== 'scrypt' || !salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function createSessionToken(admin) {
  config({ override: true });
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  const payload = encode({
    sub: admin.username,
    name: admin.name,
    role: 'SUPER_ADMIN',
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token) {
  config({ override: true });
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  if (!token || secret.length < 32) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const actual = Buffer.from(signature);
  const expected = Buffer.from(sign(payload, secret));
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.exp > Math.floor(Date.now() / 1000) && session.role === 'SUPER_ADMIN' ? session : null;
  } catch {
    return null;
  }
}

function readSession(req) {
  const cookies = Object.fromEntries(
    String(req.headers.cookie || '').split(';').map((part) => part.trim().split('=')).filter(([key, value]) => key && value)
  );
  return verifySessionToken(cookies[COOKIE_NAME]);
}

export function requireAdmin(req, res, next) {
  const session = readSession(req);
  if (!session) return res.status(401).json({ success: false, message: 'Error: Unauthorized Access' });
  req.admin = session;
  next();
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (loginAttempts.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000);
  recent.push(now);
  loginAttempts.set(ip, recent);
  return recent.length > 8;
}

router.post('/login', (req, res) => {
  config({ override: true });
  if (isRateLimited(req.ip)) {
    return res.status(429).json({ success: false, message: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' });
  }

  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');
  const configuredUser = process.env.ADMIN_USER || '';
  const configuredHash = process.env.ADMIN_PASSWORD_HASH || '';
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || '';

  if (!configuredUser || !configuredHash || sessionSecret.length < 32) {
    return res.status(503).json({ success: false, message: 'Portal admin belum dikonfigurasi.' });
  }
  if (username !== configuredUser || !verifyPassword(password, configuredHash)) {
    return res.status(401).json({ success: false, message: 'Username atau password admin tidak valid.' });
  }

  const admin = { username, role: 'SUPER_ADMIN', name: process.env.ADMIN_NAME || 'Admin PT Botani Seed Indonesia' };
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${createSessionToken(admin)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_TTL_SECONDS}${secure}`);
  loginAttempts.delete(req.ip);
  return res.json({ success: true, message: 'Login berhasil.', admin });
});

router.get('/session', requireAdmin, (req, res) => res.json({ success: true, admin: req.admin }));

router.post('/logout', (_req, res) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secure}`);
  res.json({ success: true, message: 'Logout berhasil.' });
});

export default router;
