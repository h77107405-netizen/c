import { Router } from 'express';
import { eq, desc, count, sql, and, ne } from 'drizzle-orm';
import { db, schema } from '../db/index.js';
import { hashPassword } from '../utils/password.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { asyncHandler, ApiError } from '../middleware/error.js';

const router = Router();
router.use(authenticate, requireAdmin);

// ── Dashboard Stats ────────────────────────────────────────────────────────
router.get('/dashboard', asyncHandler(async (req, res) => {
  const [[{ total: totalStudents }], [{ total: totalTeachers }], [{ total: totalCourses }], [{ total: totalBatches }], [{ total: totalTests }]] = await Promise.all([
    db.select({ total: count() }).from(schema.users).where(eq(schema.users.role, 'student')),
    db.select({ total: count() }).from(schema.users).where(eq(schema.users.role, 'teacher')),
    db.select({ total: count() }).from(schema.courses),
    db.select({ total: count() }).from(schema.batches),
    db.select({ total: count() }).from(schema.tests),
  ]);

  const pendingFees = await db.select({ total: sql<number>`COALESCE(SUM(${schema.fees.finalAmount}), 0)` })
    .from(schema.fees);
  const upcomingClasses = await db.select({ total: count() })
    .from(schema.liveClasses)
    .where(eq(schema.liveClasses.status, 'scheduled'));
  const pendingDoubts = await db.select({ total: count() })
    .from(schema.doubts)
    .where(eq(schema.doubts.status, 'open'));

  res.json({
    success: true,
    data: {
      totalStudents, totalTeachers, totalCourses, totalBatches, totalTests,
      pendingFees: pendingFees[0]?.total ?? 0,
      upcomingClasses: upcomingClasses[0]?.total ?? 0,
      pendingDoubts: pendingDoubts[0]?.total ?? 0,
    },
  });
}));

// ── Students ───────────────────────────────────────────────────────────────
router.get('/students', asyncHandler(async (req, res) => {
  const students = await db
    .select({
      id: schema.users.id, name: schema.users.name, email: schema.users.email,
      phone: schema.users.phone, status: schema.users.status, profileImage: schema.users.profileImage,
      createdAt: schema.users.createdAt,
      parentName: schema.studentProfiles.parentName,
      parentPhone: schema.studentProfiles.parentPhone,
      courseId: schema.studentProfiles.courseId,
      enrollmentDate: schema.studentProfiles.enrollmentDate,
    })
    .from(schema.users)
    .leftJoin(schema.studentProfiles, eq(schema.users.id, schema.studentProfiles.userId))
    .where(eq(schema.users.role, 'student'))
    .orderBy(desc(schema.users.createdAt));

  res.json({ success: true, data: students });
}));

router.post('/students', asyncHandler(async (req, res) => {
  const { name, email, phone, password, parentName, parentPhone, address, courseId } = req.body;
  if (!name || !email || !phone || !password) {
    throw new ApiError(400, 'name, email, phone, and password are required');
  }
  const hashed = await hashPassword(password);
  const [user] = await db.insert(schema.users).values({
    name, email: email.toLowerCase(), phone, password: hashed, role: 'student',
  }).returning();
  await db.insert(schema.studentProfiles).values({
    userId: user.id, parentName, parentPhone, address, courseId,
  });
  res.status(201).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
}));

router.put('/students/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, status, parentName, parentPhone, address, courseId } = req.body;
  await db.update(schema.users).set({ name, phone, status, updatedAt: new Date() }).where(eq(schema.users.id, id));
  await db.update(schema.studentProfiles).set({ parentName, parentPhone, address, courseId }).where(eq(schema.studentProfiles.userId, id));
  res.json({ success: true, message: 'Student updated' });
}));

router.delete('/students/:id', asyncHandler(async (req, res) => {
  await db.delete(schema.users).where(and(eq(schema.users.id, req.params.id), eq(schema.users.role, 'student')));
  res.json({ success: true, message: 'Student deleted' });
}));

// ── Teachers ───────────────────────────────────────────────────────────────
router.get('/teachers', asyncHandler(async (req, res) => {
  const teachers = await db
    .select({
      id: schema.users.id, name: schema.users.name, email: schema.users.email,
      phone: schema.users.phone, status: schema.users.status, profileImage: schema.users.profileImage,
      createdAt: schema.users.createdAt,
      qualification: schema.teacherProfiles.qualification,
      experience: schema.teacherProfiles.experience,
      specialization: schema.teacherProfiles.specialization,
    })
    .from(schema.users)
    .leftJoin(schema.teacherProfiles, eq(schema.users.id, schema.teacherProfiles.userId))
    .where(eq(schema.users.role, 'teacher'))
    .orderBy(desc(schema.users.createdAt));

  res.json({ success: true, data: teachers });
}));

router.post('/teachers', asyncHandler(async (req, res) => {
  const { name, email, phone, password, qualification, experience, specialization } = req.body;
  if (!name || !email || !phone || !password) {
    throw new ApiError(400, 'name, email, phone, and password are required');
  }
  const hashed = await hashPassword(password);
  const [user] = await db.insert(schema.users).values({
    name, email: email.toLowerCase(), phone, password: hashed, role: 'teacher',
  }).returning();
  await db.insert(schema.teacherProfiles).values({
    userId: user.id, qualification, experience: experience ? parseInt(experience) : null, specialization,
  });
  res.status(201).json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
}));

router.put('/teachers/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, status, qualification, experience, specialization } = req.body;
  await db.update(schema.users).set({ name, phone, status, updatedAt: new Date() }).where(eq(schema.users.id, id));
  await db.update(schema.teacherProfiles).set({ qualification, experience, specialization }).where(eq(schema.teacherProfiles.userId, id));
  res.json({ success: true, message: 'Teacher updated' });
}));

router.delete('/teachers/:id', asyncHandler(async (req, res) => {
  await db.delete(schema.users).where(and(eq(schema.users.id, req.params.id), eq(schema.users.role, 'teacher')));
  res.json({ success: true, message: 'Teacher deleted' });
}));

// ── Courses ────────────────────────────────────────────────────────────────
router.get('/courses', asyncHandler(async (req, res) => {
  const data = await db.select().from(schema.courses).orderBy(desc(schema.courses.createdAt));
  res.json({ success: true, data });
}));

router.post('/courses', asyncHandler(async (req, res) => {
  const { name, description, classLevel, duration, fee } = req.body;
  if (!name || !description) throw new ApiError(400, 'name and description are required');
  const [course] = await db.insert(schema.courses).values({ name, description, classLevel, duration, fee: fee?.toString() || '0' }).returning();
  res.status(201).json({ success: true, data: course });
}));

router.put('/courses/:id', asyncHandler(async (req, res) => {
  const { name, description, classLevel, duration, fee, status } = req.body;
  await db.update(schema.courses).set({ name, description, classLevel, duration, fee: fee?.toString(), status, updatedAt: new Date() }).where(eq(schema.courses.id, req.params.id));
  res.json({ success: true, message: 'Course updated' });
}));

router.delete('/courses/:id', asyncHandler(async (req, res) => {
  await db.delete(schema.courses).where(eq(schema.courses.id, req.params.id));
  res.json({ success: true, message: 'Course deleted' });
}));

// ── Batches ────────────────────────────────────────────────────────────────
router.get('/batches', asyncHandler(async (req, res) => {
  const batchList = await db
    .select({
      id: schema.batches.id, name: schema.batches.name, timing: schema.batches.timing,
      startDate: schema.batches.startDate, endDate: schema.batches.endDate,
      status: schema.batches.status, description: schema.batches.description,
      createdAt: schema.batches.createdAt,
      courseId: schema.batches.courseId, courseName: schema.courses.name,
    })
    .from(schema.batches)
    .leftJoin(schema.courses, eq(schema.batches.courseId, schema.courses.id))
    .orderBy(desc(schema.batches.createdAt));

  const batchesWithCounts = await Promise.all(batchList.map(async (b) => {
    const [{ total: studentCount }] = await db.select({ total: count() }).from(schema.batchStudents).where(eq(schema.batchStudents.batchId, b.id));
    return { ...b, studentCount };
  }));

  res.json({ success: true, data: batchesWithCounts });
}));

router.post('/batches', asyncHandler(async (req, res) => {
  const { name, courseId, timing, startDate, endDate, description, teacherIds, studentIds } = req.body;
  if (!name || !courseId) throw new ApiError(400, 'name and courseId are required');
  const [batch] = await db.insert(schema.batches).values({ name, courseId, timing, startDate, endDate, description }).returning();
  if (teacherIds?.length) {
    await db.insert(schema.batchTeachers).values(teacherIds.map((tid: string) => ({ batchId: batch.id, teacherId: tid })));
  }
  if (studentIds?.length) {
    await db.insert(schema.batchStudents).values(studentIds.map((sid: string) => ({ batchId: batch.id, studentId: sid })));
  }
  res.status(201).json({ success: true, data: batch });
}));

router.put('/batches/:id', asyncHandler(async (req, res) => {
  const { name, timing, startDate, endDate, description, status } = req.body;
  await db.update(schema.batches).set({ name, timing, startDate, endDate, description, status, updatedAt: new Date() }).where(eq(schema.batches.id, req.params.id));
  res.json({ success: true, message: 'Batch updated' });
}));

router.delete('/batches/:id', asyncHandler(async (req, res) => {
  await db.delete(schema.batches).where(eq(schema.batches.id, req.params.id));
  res.json({ success: true, message: 'Batch deleted' });
}));

// ── Batch Members ───────────────────────────────────────────────────────────
router.get('/batches/:id/members', asyncHandler(async (req, res) => {
  const [teachers, students] = await Promise.all([
    db.select({ id: schema.users.id, name: schema.users.name, email: schema.users.email, phone: schema.users.phone })
      .from(schema.batchTeachers)
      .innerJoin(schema.users, eq(schema.batchTeachers.teacherId, schema.users.id))
      .where(eq(schema.batchTeachers.batchId, req.params.id)),
    db.select({ id: schema.users.id, name: schema.users.name, email: schema.users.email, phone: schema.users.phone })
      .from(schema.batchStudents)
      .innerJoin(schema.users, eq(schema.batchStudents.studentId, schema.users.id))
      .where(eq(schema.batchStudents.batchId, req.params.id)),
  ]);
  res.json({ success: true, data: { teachers, students } });
}));

router.post('/batches/:id/teachers', asyncHandler(async (req, res) => {
  const { teacherId } = req.body;
  if (!teacherId) throw new ApiError(400, 'teacherId is required');
  const existing = await db.select().from(schema.batchTeachers)
    .where(and(eq(schema.batchTeachers.batchId, req.params.id), eq(schema.batchTeachers.teacherId, teacherId)))
    .limit(1);
  if (existing.length) throw new ApiError(409, 'Teacher already in this batch');
  await db.insert(schema.batchTeachers).values({ batchId: req.params.id, teacherId });
  res.json({ success: true, message: 'Teacher added to batch' });
}));

router.delete('/batches/:id/teachers/:teacherId', asyncHandler(async (req, res) => {
  await db.delete(schema.batchTeachers)
    .where(and(eq(schema.batchTeachers.batchId, req.params.id), eq(schema.batchTeachers.teacherId, req.params.teacherId)));
  res.json({ success: true, message: 'Teacher removed from batch' });
}));

router.post('/batches/:id/students', asyncHandler(async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) throw new ApiError(400, 'studentId is required');
  const existing = await db.select().from(schema.batchStudents)
    .where(and(eq(schema.batchStudents.batchId, req.params.id), eq(schema.batchStudents.studentId, studentId)))
    .limit(1);
  if (existing.length) throw new ApiError(409, 'Student already in this batch');
  await db.insert(schema.batchStudents).values({ batchId: req.params.id, studentId });
  res.json({ success: true, message: 'Student added to batch' });
}));

router.delete('/batches/:id/students/:studentId', asyncHandler(async (req, res) => {
  await db.delete(schema.batchStudents)
    .where(and(eq(schema.batchStudents.batchId, req.params.id), eq(schema.batchStudents.studentId, req.params.studentId)));
  res.json({ success: true, message: 'Student removed from batch' });
}));

// ── Materials ──────────────────────────────────────────────────────────────
router.get('/materials', asyncHandler(async (req, res) => {
  const data = await db
    .select({
      id: schema.materials.id, title: schema.materials.title, description: schema.materials.description,
      fileUrl: schema.materials.fileUrl, fileType: schema.materials.fileType, fileName: schema.materials.fileName,
      fileSize: schema.materials.fileSize, visibility: schema.materials.visibility, createdAt: schema.materials.createdAt,
      courseId: schema.materials.courseId, courseName: schema.courses.name,
      uploaderName: schema.users.name,
    })
    .from(schema.materials)
    .leftJoin(schema.courses, eq(schema.materials.courseId, schema.courses.id))
    .leftJoin(schema.users, eq(schema.materials.uploadedBy, schema.users.id))
    .orderBy(desc(schema.materials.createdAt));
  res.json({ success: true, data });
}));

router.post('/materials', asyncHandler(async (req, res) => {
  const { title, description, fileUrl, fileType, fileName, fileSize, courseId, batchId, visibility } = req.body;
  if (!title || !fileUrl || !fileName) throw new ApiError(400, 'title, fileUrl, and fileName are required');
  const [mat] = await db.insert(schema.materials).values({
    title, description, fileUrl, fileType: fileType || 'document', fileName,
    fileSize, courseId, batchId, visibility: visibility !== false,
    uploadedBy: req.user!.id,
  }).returning();
  res.status(201).json({ success: true, data: mat });
}));

router.delete('/materials/:id', asyncHandler(async (req, res) => {
  await db.delete(schema.materials).where(eq(schema.materials.id, req.params.id));
  res.json({ success: true, message: 'Material deleted' });
}));

// ── Live Classes ───────────────────────────────────────────────────────────
router.get('/live-classes', asyncHandler(async (req, res) => {
  const data = await db
    .select({
      id: schema.liveClasses.id, title: schema.liveClasses.title,
      scheduledDate: schema.liveClasses.scheduledDate, scheduledTime: schema.liveClasses.scheduledTime,
      duration: schema.liveClasses.duration, status: schema.liveClasses.status,
      meetingLink: schema.liveClasses.meetingLink, createdAt: schema.liveClasses.createdAt,
      teacherName: schema.users.name,
      batchName: schema.batches.name,
    })
    .from(schema.liveClasses)
    .leftJoin(schema.users, eq(schema.liveClasses.teacherId, schema.users.id))
    .leftJoin(schema.batches, eq(schema.liveClasses.batchId, schema.batches.id))
    .orderBy(desc(schema.liveClasses.scheduledDate));
  res.json({ success: true, data });
}));

// ── Tests ──────────────────────────────────────────────────────────────────
router.get('/tests', asyncHandler(async (req, res) => {
  const data = await db
    .select({
      id: schema.tests.id, title: schema.tests.title, duration: schema.tests.duration,
      totalMarks: schema.tests.totalMarks, status: schema.tests.status,
      startDate: schema.tests.startDate, endDate: schema.tests.endDate, createdAt: schema.tests.createdAt,
      teacherName: schema.users.name, courseName: schema.courses.name,
    })
    .from(schema.tests)
    .leftJoin(schema.users, eq(schema.tests.teacherId, schema.users.id))
    .leftJoin(schema.courses, eq(schema.tests.courseId, schema.courses.id))
    .orderBy(desc(schema.tests.createdAt));
  res.json({ success: true, data });
}));

// ── Fees ───────────────────────────────────────────────────────────────────
router.get('/fees', asyncHandler(async (req, res) => {
  const data = await db
    .select({
      id: schema.fees.id, totalAmount: schema.fees.totalAmount, discount: schema.fees.discount,
      finalAmount: schema.fees.finalAmount, dueDate: schema.fees.dueDate, createdAt: schema.fees.createdAt,
      studentName: schema.users.name, studentEmail: schema.users.email,
      courseName: schema.courses.name,
    })
    .from(schema.fees)
    .leftJoin(schema.users, eq(schema.fees.studentId, schema.users.id))
    .leftJoin(schema.courses, eq(schema.fees.courseId, schema.courses.id))
    .orderBy(desc(schema.fees.createdAt));
  res.json({ success: true, data });
}));

router.post('/fees', asyncHandler(async (req, res) => {
  const { studentId, courseId, totalAmount, discount, dueDate } = req.body;
  if (!studentId || !totalAmount) throw new ApiError(400, 'studentId and totalAmount are required');
  const disc = parseFloat(discount || '0');
  const total = parseFloat(totalAmount);
  const final = total - disc;
  const [fee] = await db.insert(schema.fees).values({
    studentId, courseId, totalAmount: total.toString(), discount: disc.toString(), finalAmount: final.toString(), dueDate,
  }).returning();
  res.status(201).json({ success: true, data: fee });
}));

router.post('/fees/:feeId/payments', asyncHandler(async (req, res) => {
  const { amount, paymentMode, transactionId, receiptNumber, notes } = req.body;
  const [fee] = await db.select().from(schema.fees).where(eq(schema.fees.id, req.params.feeId)).limit(1);
  if (!fee) throw new ApiError(404, 'Fee record not found');
  const [payment] = await db.insert(schema.payments).values({
    feeId: fee.id, studentId: fee.studentId, amount: amount.toString(),
    paymentMode, transactionId, receiptNumber, notes, recordedBy: req.user!.id,
  }).returning();
  res.status(201).json({ success: true, data: payment });
}));

export default router;
