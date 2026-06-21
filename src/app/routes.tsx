import { createBrowserRouter, Navigate } from 'react-router';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { TeacherLayout } from './components/layout/TeacherLayout';
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentsPage } from './pages/admin/StudentsPage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MaterialsPage } from './pages/student/MaterialsPage';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
    if (user.role === 'student') return <Navigate to="/student" replace />;
  }

  return <>{children}</>;
};

// Root redirect based on authentication
const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  // Redirect to appropriate dashboard based on role
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
  if (user.role === 'student') return <Navigate to="/student" replace />;

  return <Navigate to="/" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  // Admin Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'students',
        element: <StudentsPage />,
      },
      {
        path: 'teachers',
        element: <div className="p-8 text-center text-muted-foreground">Teachers Management - Coming Soon</div>,
      },
      {
        path: 'courses',
        element: <div className="p-8 text-center text-muted-foreground">Courses Management - Coming Soon</div>,
      },
      {
        path: 'batches',
        element: <div className="p-8 text-center text-muted-foreground">Batches Management - Coming Soon</div>,
      },
      {
        path: 'materials',
        element: <div className="p-8 text-center text-muted-foreground">Materials Management - Coming Soon</div>,
      },
      {
        path: 'tests',
        element: <div className="p-8 text-center text-muted-foreground">Tests Management - Coming Soon</div>,
      },
      {
        path: 'fees',
        element: <div className="p-8 text-center text-muted-foreground">Fees Management - Coming Soon</div>,
      },
      {
        path: 'settings',
        element: <div className="p-8 text-center text-muted-foreground">Settings - Coming Soon</div>,
      },
    ],
  },
  // Teacher Routes
  {
    path: '/teacher',
    element: (
      <ProtectedRoute allowedRoles={['teacher']}>
        <TeacherLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TeacherDashboard />,
      },
      {
        path: 'batches',
        element: <div className="p-8 text-center text-muted-foreground">My Batches - Coming Soon</div>,
      },
      {
        path: 'materials',
        element: <div className="p-8 text-center text-muted-foreground">Materials Management - Coming Soon</div>,
      },
      {
        path: 'classes',
        element: <div className="p-8 text-center text-muted-foreground">Live Classes - Coming Soon</div>,
      },
      {
        path: 'tests',
        element: <div className="p-8 text-center text-muted-foreground">Tests Management - Coming Soon</div>,
      },
      {
        path: 'assignments',
        element: <div className="p-8 text-center text-muted-foreground">Assignments - Coming Soon</div>,
      },
      {
        path: 'doubts',
        element: <div className="p-8 text-center text-muted-foreground">Student Doubts - Coming Soon</div>,
      },
      {
        path: 'analytics',
        element: <div className="p-8 text-center text-muted-foreground">Student Analytics - Coming Soon</div>,
      },
    ],
  },
  // Student Routes
  {
    path: '/student',
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <StudentDashboard />,
      },
      {
        path: 'courses',
        element: <div className="p-8 text-center text-muted-foreground">My Courses - Coming Soon</div>,
      },
      {
        path: 'materials',
        element: <MaterialsPage />,
      },
      {
        path: 'classes',
        element: <div className="p-8 text-center text-muted-foreground">Live Classes - Coming Soon</div>,
      },
      {
        path: 'tests',
        element: <div className="p-8 text-center text-muted-foreground">Tests - Coming Soon</div>,
      },
      {
        path: 'results',
        element: <div className="p-8 text-center text-muted-foreground">My Results - Coming Soon</div>,
      },
      {
        path: 'assignments',
        element: <div className="p-8 text-center text-muted-foreground">Assignments - Coming Soon</div>,
      },
      {
        path: 'doubts',
        element: <div className="p-8 text-center text-muted-foreground">Ask Doubt - Coming Soon</div>,
      },
      {
        path: 'fees',
        element: <div className="p-8 text-center text-muted-foreground">Fees & Receipts - Coming Soon</div>,
      },
    ],
  },
  // 404 Route
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-muted-foreground mt-4">Page not found</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    ),
  },
]);