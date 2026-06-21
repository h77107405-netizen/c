// ============================================
// ROUTES INDEX - API Route Structure
// ============================================

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Health check route (no auth required)
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes (will be implemented in Phase 2)
// router.use('/auth', authRoutes);

// Protected routes (require authentication)
// Admin routes
// router.use('/admin', authenticate, requireAdmin, adminRoutes);

// Teacher routes
// router.use('/teachers', authenticate, teacherRoutes);

// Student routes
// router.use('/students', authenticate, studentRoutes);

// Shared routes (accessible by multiple roles with proper checks)
// router.use('/courses', authenticate, courseRoutes);
// router.use('/materials', authenticate, materialRoutes);
// router.use('/live-classes', authenticate, liveClassRoutes);
// router.use('/tests', authenticate, testRoutes);
// router.use('/assignments', authenticate, assignmentRoutes);
// router.use('/doubts', authenticate, doubtRoutes);
// router.use('/payments', authenticate, paymentRoutes);
// router.use('/notifications', authenticate, notificationRoutes);

export default router;
