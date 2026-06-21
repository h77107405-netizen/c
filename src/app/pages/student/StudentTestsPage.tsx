import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ClipboardList, Clock, CheckCircle2, PlayCircle, Lock } from 'lucide-react';

const tests = [
  { id: '1', name: 'Mathematics – Unit Test 4', subject: 'Mathematics', totalMarks: 100, duration: '90 min', questions: 25, scheduledDate: '2024-12-25', status: 'upcoming', score: null, grade: null },
  { id: '2', name: 'Physics – Chapter Test 3', subject: 'Physics', totalMarks: 80, duration: '60 min', questions: 20, scheduledDate: '2024-12-20', status: 'available', score: null, grade: null },
  { id: '3', name: 'Chemistry Quiz 2', subject: 'Chemistry', totalMarks: 50, duration: '40 min', questions: 15, scheduledDate: '2024-12-15', status: 'completed', score: 42, grade: 'A' },
  { id: '4', name: 'Mathematics – Unit Test 3', subject: 'Mathematics', totalMarks: 100, duration: '90 min', questions: 25, scheduledDate: '2024-12-10', status: 'completed', score: 92, grade: 'A+' },
  { id: '5', name: 'Physics – Chapter Test 2', subject: 'Physics', totalMarks: 80, duration: '60 min', questions: 20, scheduledDate: '2024-12-05', status: 'completed', score: 62, grade: 'B' },
  { id: '6', name: 'JEE Mock Test 1', subject: 'All Subjects', totalMarks: 300, duration: '180 min', questions: 90, scheduledDate: '2024-12-01', status: 'completed', score: 234, grade: 'A' },
];

const subjectColor: Record<string, string> = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
  'All Subjects': 'bg-orange-100 text-orange-700',
};

export const StudentTestsPage: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'available' | 'completed'>('all');

  const filtered = tests.filter(t => {
    if (tab === 'available') return t.status === 'available' || t.status === 'upcoming';
    if (tab === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tests</h1>
        <p className="text-muted-foreground mt-2">Attempt available tests and view your results</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tests', value: String(tests.length), color: 'text-gray-900' },
          { label: 'Available Now', value: String(tests.filter(t => t.status === 'available').length), color: 'text-blue-600' },
          { label: 'Upcoming', value: String(tests.filter(t => t.status === 'upcoming').length), color: 'text-orange-600' },
          { label: 'Completed', value: String(tests.filter(t => t.status === 'completed').length), color: 'text-green-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <h3 className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(['all', 'available', 'completed'] as const).map(t => (
          <Button
            key={t}
            variant={tab === t ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTab(t)}
            className="capitalize"
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(test => (
          <Card key={test.id} className={`hover:shadow-md transition-shadow ${test.status === 'available' ? 'border-blue-300' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColor[test.subject] || 'bg-gray-100 text-gray-700'}`}>
                    {test.subject}
                  </span>
                  <h3 className="font-semibold mt-2 leading-snug">{test.name}</h3>
                </div>
                {test.status === 'available' && <Badge variant="secondary">Available</Badge>}
                {test.status === 'upcoming' && <Badge variant="outline">Upcoming</Badge>}
                {test.status === 'completed' && (
                  <Badge variant={test.grade?.startsWith('A') ? 'default' : 'secondary'} className="text-lg px-3">
                    {test.grade}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-sm">{test.totalMarks}</p>
                  <p className="text-xs text-muted-foreground">Marks</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-sm">{test.questions}</p>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-xs">{test.duration}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>

              {test.status === 'completed' && test.score !== null && (
                <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      Score: {test.score}/{test.totalMarks} ({Math.round((test.score / test.totalMarks) * 100)}%)
                    </p>
                    <p className="text-xs text-green-600">Completed on {new Date(test.scheduledDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {test.status === 'upcoming' && (
                <div className="flex items-center gap-3 mb-4 p-3 bg-orange-50 rounded-lg">
                  <Lock className="h-5 w-5 text-orange-500" />
                  <p className="text-sm text-orange-700">
                    Opens on {new Date(test.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {test.status === 'available' ? (
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600" size="sm">
                  <PlayCircle className="h-4 w-4 mr-1" /> Start Test
                </Button>
              ) : test.status === 'completed' ? (
                <Button variant="outline" className="w-full" size="sm">
                  <ClipboardList className="h-4 w-4 mr-1" /> View Result
                </Button>
              ) : (
                <Button variant="outline" className="w-full" size="sm" disabled>
                  <Clock className="h-4 w-4 mr-1" /> Not Available Yet
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
