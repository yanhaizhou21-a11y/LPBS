import { Router } from 'express';

const router = Router();

// Default admin credentials (can be overridden via environment variables)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'botani2026';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = 'botani_admin_token_' + Date.now();
    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        username,
        role: 'SUPER_ADMIN',
        name: 'Admin PT Botani Seed Indonesia',
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Username atau password admin tidak valid.',
  });
});

export default router;
