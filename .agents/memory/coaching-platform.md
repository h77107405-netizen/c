---
name: Coaching Platform Architecture
description: Key decisions, API shapes, and deployment facts for the Coaching Management Platform SaaS.
---

## Runtime
- Frontend: Vite + React on port 5000 (`npm run dev:frontend`)
- Backend: Express + tsx watch on port 3001 (`npm run dev:backend`)
- Both started together via `concurrently` from root `npm run dev`
- Vite proxies `/api/*` → `http://localhost:3001` (vite.config.ts)

## Auth
- JWT tokens stored in `localStorage` under key `token`
- Login: `POST /api/auth/login` → `{ success, token, user }`
- JWT_SECRET stored in Replit Secrets (never hardcode in production)
- Demo credentials: admin@demo.com/Admin@123, teacher@demo.com/Teacher@123, student@demo.com/Student@123
- Seed: `POST /api/seed/demo` (also wired as button on login page)

## Critical API shape mismatches (fixed)
- Teacher dashboard returns `myBatches`, `materialsUploaded`, `testsCreated`, `pendingDoubts`, `upcomingClasses[]` — NOT generic totalX fields
- `/teacher/analytics` returns real data: totalStudents, totalBatches, totalTests, totalMaterials, totalLiveClasses, resolvedDoubts, pendingDoubts, batches[], testResultSummary[]
- Student dashboard returns `recentResults[]`, `upcomingClasses[]`, `recentMaterials[]`, `feeStatus` — NOT counts
- Materials backend stores as `fileUrl`/`fileType`/`fileName` — frontend forms submit `url`/`type` — display layer must handle both

## Router paths (react-router v7)
- Teacher live classes: `/teacher/classes` (NOT `/teacher/live-classes`)
- Student live classes: `/student/classes` (NOT `/student/live-classes`)
- Router: `src/app/routes.tsx` — all 3 portals fully wired

## DB
- Drizzle ORM schema at `apps/backend/src/db/schema.ts`
- Run `npm run db:push` to push schema changes
- `drizzle.config.ts` at root reads `DATABASE_URL` env var
- `settings` table: key (PK), value, updatedAt — used by admin settings

## File Uploads
- Backend: `POST /api/upload` (multer, 50MB limit) → saves to `uploads/` dir → returns `{ fileUrl: '/api/uploads/filename', fileName, fileSize, mimeType }`
- Files served as static via `app.use('/api/uploads', express.static(...))`  in server.ts
- Frontend: `api.uploadFile(file)` in api.ts — does FormData POST, returns upload info
- Both AdminMaterialsPage and TeacherMaterialsPage have "Upload File" / "Paste URL" tabs

## Notifications
- Schema: `notifications` table — receiverId, senderId, type, title, message, link, isRead, createdAt
- Routes at `/api/notifications`: GET (all for user), GET /unread-count, PATCH /:id/read, PATCH /read-all, POST /send
- Frontend: `NotificationBell` component polls unread count every 30s, dropdown panel for all 3 portals
- Admin/Teacher can call `api.notifications.send({ receiverIds, title, message, type, link })`

## Test System (fully implemented)
- Teacher: create test → add MCQ questions via question builder → publish
- Questions: questionText, options (JSONB string array), correctAnswer (label "A"/"B"/"C"/"D"), marks
- Auto-scoring on submit; result returned immediately with marksObtained, totalMarks, percentage, passed
- Backend routes: `GET/POST /api/teacher/tests/:id/questions`, `GET /api/student/tests/:testId/questions`, `POST /api/student/tests/:testId/submit`

## Admin Settings
- Persisted to `settings` table as key-value pairs
- Backend: `GET /api/admin/settings` → `{ data: Record<string,string> }`, `PUT /api/admin/settings` → upsert all keys
- Frontend: loads on mount, each section (institute, notifications, fees) saves independently

## What's Still Missing / Next to Build
1. Send Notification UI (admin can broadcast to all students/teachers from admin panel)
2. Student results analytics page (charts showing score history over time)
3. Assignment submission review (teacher sees student submissions)
4. Fee reminder auto-trigger when due date approaches
