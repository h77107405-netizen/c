import { Router } from 'express';
import { eq, desc, and, count } from 'drizzle-orm';
import { db, schema } from '../db/index.js';
import { authenticate } from '../middleware/auth.js';
import { asyncHandler, ApiError } from '../middleware/error.js';

const router = Router();
router.use(authenticate);

router.get('/', asyncHandler(async (req, res) => {
  const data = await db
    .select()
    .from(schema.notifications)
    .where(eq(schema.notifications.receiverId, req.user!.id))
    .orderBy(desc(schema.notifications.createdAt))
    .limit(30);
  res.json({ success: true, data });
}));

router.get('/unread-count', asyncHandler(async (req, res) => {
  const [{ total }] = await db
    .select({ total: count() })
    .from(schema.notifications)
    .where(and(
      eq(schema.notifications.receiverId, req.user!.id),
      eq(schema.notifications.isRead, false),
    ));
  res.json({ success: true, data: { count: total } });
}));

router.patch('/:id/read', asyncHandler(async (req, res) => {
  await db
    .update(schema.notifications)
    .set({ isRead: true })
    .where(and(
      eq(schema.notifications.id, req.params.id),
      eq(schema.notifications.receiverId, req.user!.id),
    ));
  res.json({ success: true, message: 'Marked as read' });
}));

router.patch('/read-all', asyncHandler(async (req, res) => {
  await db
    .update(schema.notifications)
    .set({ isRead: true })
    .where(and(
      eq(schema.notifications.receiverId, req.user!.id),
      eq(schema.notifications.isRead, false),
    ));
  res.json({ success: true, message: 'All marked as read' });
}));

router.post('/send', asyncHandler(async (req, res) => {
  if (req.user!.role !== 'admin' && req.user!.role !== 'teacher') {
    throw new ApiError(403, 'Not allowed');
  }
  const { receiverIds, title, message, type = 'general', link } = req.body;
  if (!receiverIds?.length || !title || !message) {
    throw new ApiError(400, 'receiverIds, title, message required');
  }
  await db.insert(schema.notifications).values(
    receiverIds.map((rid: string) => ({
      receiverId: rid, senderId: req.user!.id, type, title, message, link,
    }))
  );
  res.status(201).json({ success: true, message: 'Notifications sent' });
}));

export default router;
