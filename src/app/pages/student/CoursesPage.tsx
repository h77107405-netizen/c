import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { BookOpen, Users, Calendar, CheckCircle2, Clock } from 'lucide-react';

const enrolledCourses = [
  {
    id: '1',
    name: 'JEE Main & Advanced 2025',
    code: 'JEE-2025',
    batch: 'Batch A',
    teacher: 'Prof. Arvind Sharma',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    completionPct: 65,
    totalClasses: 240,
    attendedClasses: 156,
    status: 'active',
    nextClass: 'Today, 9:00 AM',
    description: 'Comprehensive preparation for JEE Main and Advanced examinations.',
  },
];

const chapters = [
  { subject: 'Mathematics', name: 'Calculus – Integration', status: 'completed', classes: 12 },
  { subject: 'Mathematics', name: 'Algebra – Complex Numbers', status: 'completed', classes: 10 },
  { subject: 'Mathematics', name: 'Trigonometry', status: 'in_progress', classes: 8 },
  { subject: 'Mathematics', name: 'Coordinate Geometry', status: 'upcoming', classes: 10 },
  { subject: 'Physics', name: 'Mechanics – Laws of Motion', status: 'completed', classes: 14 },
  { subject: 'Physics', name: 'Thermodynamics', status: 'in_progress', classes: 10 },
  { subject: 'Physics', name: 'Optics', status: 'upcoming', classes: 12 },
  { subject: 'Chemistry', name: 'Organic Chemistry – Basics', status: 'completed', classes: 16 },
  { subject: 'Chemistry', name: 'Electrochemistry', status: 'in_progress', classes: 8 },
  { subject: 'Chemistry', name: 'Coordination Compounds', status: 'upcoming', classes: 10 },
];

const statusIcon: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
  in_progress: <Clock className="h-4 w-4 text-blue-600" />,
  upcoming: <Clock className="h-4 w-4 text-gray-400" />,
};

const statusLabel: Record<string, string> = {
  completed: 'Completed',
  in_progress: 'In Progress',
  upcoming: 'Upcoming',
};

export const CoursesPage: React.FC = () => {
  const course = enrolledCourses[0];
  const bySubject = chapters.reduce((acc, ch) => {
    if (!acc[ch.subject]) acc[ch.subject] = [];
    acc[ch.subject].push(ch);
    return acc;
  }, {} as Record<string, typeof chapters>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-muted-foreground mt-2">Track your enrolled courses and chapter-wise progress</p>
      </div>

      {/* Course Card */}
      <Card className="border-l-4 border-l-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono">{course.code}</Badge>
                <Badge variant="default">{course.status}</Badge>
              </div>
              <h2 className="text-xl font-bold">{course.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{course.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {course.subjects.map(s => (
                  <span key={s} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{s}</span>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-right space-y-1">
              <p className="text-sm text-muted-foreground">Batch: <span className="font-medium text-gray-900">{course.batch}</span></p>
              <p className="text-sm text-muted-foreground">Teacher: <span className="font-medium text-gray-900">{course.teacher}</span></p>
              <p className="text-sm text-blue-600 font-medium">Next: {course.nextClass}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-600">{course.completionPct}%</p>
              <p className="text-xs text-muted-foreground">Course Completed</p>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-600">{course.attendedClasses}</p>
              <p className="text-xs text-muted-foreground">Classes Attended</p>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-3">
              <p className="text-2xl font-bold text-gray-700">{Math.round((course.attendedClasses / course.totalClasses) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{course.completionPct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${course.completionPct}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapter-wise Progress */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Chapter-wise Progress</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(bySubject).map(([subject, chs]) => (
            <Card key={subject}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chs.map(ch => (
                    <div key={ch.name} className={`flex items-start gap-3 p-3 rounded-lg ${ch.status === 'in_progress' ? 'bg-blue-50 border border-blue-200' : ch.status === 'completed' ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className="mt-0.5">{statusIcon[ch.status]}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-tight">{ch.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{ch.classes} classes</span>
                          <span className={`text-xs font-medium ${ch.status === 'completed' ? 'text-green-600' : ch.status === 'in_progress' ? 'text-blue-600' : 'text-gray-400'}`}>
                            {statusLabel[ch.status]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
