import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { db, schema } from '../db/index.js';
import { comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/error.js';

const router = Router();

// POST /api/auth/login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email and password are required' });
    return;
  }

  const [user] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email.toLowerCase()))
    .limit(1);

  if (!user) {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
    return;
  }

  if (user.status !== 'active') {
    res.status(401).json({ success: false, error: 'Account is not active' });
    return;
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    res.status(401).json({ success: false, error: 'Invalid email or password' });
    return;
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role as any });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
  });
}));

// GET /api/auth/me
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  const [user] = await db
    .select({ id: schema.users.id, name: schema.users.name, email: schema.users.email, role: schema.users.role, profileImage: schema.users.profileImage, status: schema.users.status })
    .from(schema.users)
    .where(eq(schema.users.id, req.user!.id))
    .limit(1);

  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' });
    return;
  }

  res.json({ success: true, data: user });
}));

export default router;
