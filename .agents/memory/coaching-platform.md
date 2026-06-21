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

## Test System (fully implemented)
- Teacher: create test (title, batch, marks, duration) → add MCQ questions via question builder dialog → publish
- Questions stored in `questions` table: questionText, options (JSONB string array), correctAnswer (label "A"/"B"/"C"/"D"), marks
- Backend routes: `GET/POST /api/teacher/tests/:id/questions`
- Student: lists published tests → "Start Test" opens full-screen modal with countdown timer, question nav, MCQ options, confirm-submit
- Auto-scoring: backend iterates MCQ questions, matches selectedAnswer label to correctAnswer, tallies marks
- Backend routes: `GET /api/student/tests/:testId/questions`, `POST /api/student/tests/:testId/submit`
- Result returned immediately: `{ marksObtained, totalMarks, percentage, passed }`
- api.ts: `teacher.getTestQuestions`, `teacher.saveTestQuestions`, `student.getTestQuestions`, `student.submitTest`

## What's Still Missing / Next to Build
1. Admin batch UI: assign teachers/students to batches (backend supports it, UI does not)
2. Teacher analytics: wire real data (currently placeholder charts)
3. Notification system: schema exists, no sending logic
4. Cloudinary file uploads for materials (currently URL-only input)
5. Admin settings persistence (UI-only, no DB)

**Why:** Future sessions won't have to re-discover these mismatches or wonder about the concurrently setup or test flow.
