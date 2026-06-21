import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { BookOpen, Clock, CheckCircle2, Upload, AlertCircle } from 'lucide-react';

const assignments = [
  { id: '1', title: 'Integration Practice Set – 50 Problems', subject: 'Mathematics', teacher: 'Prof. Arvind Sharma', dueDate: '2024-12-22', submittedAt: null, status: 'pending', description: 'Complete all 50 integration problems from the worksheet provided in class. Show all working steps.', grade: null },
  { id: '2', title: 'Physics – Thermodynamics Problems', subject: 'Physics', teacher: 'Dr. Rajesh Verma', dueDate: '2024-12-20', submittedAt: null, status: 'overdue', description: 'Solve problems 1–15 from Chapter 12 thermodynamics section.', grade: null },
  { id: '3', title: 'Organic Chemistry – Reaction Mechanisms', subject: 'Chemistry', teacher: 'Prof. Seema Gupta', dueDate: '2024-12-18', submittedAt: '2024-12-17', status: 'submitted', description: 'Write detailed reaction mechanisms for 10 organic reactions listed on the worksheet.', grade: 'A+' },
  { id: '4', title: 'Algebra Word Problems – Chapter 3', subject: 'Mathematics', teacher: 'Prof. Arvind Sharma', dueDate: '2024-12-10', submittedAt: '2024-12-09', status: 'graded', description: 'Solve 20 word problems based on algebraic expressions.', grade: 'A' },
  { id: '5', title: 'Physics – Mechanics Numericals', subject: 'Physics', teacher: 'Dr. Rajesh Verma', dueDate: '2024-12-05', submittedAt: '2024-12-04', status: 'graded', description: 'Complete all numerical problems from the mechanics chapter.', grade: 'B+' },
];

const statusConfig: Record<string, { label: string; color: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
  pending: { label: 'Pending', color: 'border-l-orange-400', variant: 'secondary' },
  overdue: { label: 'Overdue', color: 'border-l-red-500', variant: 'destructive' },
  submitted: { label: 'Submitted', color: 'border-l-blue-400', variant: 'default' },
  graded: { label: 'Graded', color: 'border-l-green-500', variant: 'default' },
};

const subjectColor: Record<string, string> = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
};

export const StudentAssignmentsPage: React.FC = () => {
  const [tab, setTab] = useState<'all' | 'pending' | 'graded'>('all');
  const [uploading, setUploading] = useState<string | null>(null);

  const filtered = assignments.filter(a => {
    if (tab === 'pending') return a.status === 'pending' || a.status === 'overdue';
    if (tab === 'graded') return a.status === 'graded' || a.status === 'submitted';
    return true;
  });

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const overdueCount = assignments.filter(a => a.status === 'overdue').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-muted-foreground mt-2">Submit your assignments and track grades</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: String(assignments.length), icon: BookOpen, color: 'from-blue-600 to-blue-400' },
          { label: 'Pending', value: String(pendingCount), icon: Clock, color: 'from-orange-600 to-orange-400' },
          { label: 'Overdue', value: String(overdueCount), icon: AlertCircle, color: 'from-red-600 to-red-400' },
          { label: 'Submitted', value: String(submittedCount), icon: CheckCircle2, color: 'from-green-600 to-green-400' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2">
        {(['all', 'pending', 'graded'] as const).map(t => (
          <Button key={t} variant={tab === t ? 'default' : 'outline'} size="sm" onClick={() => setTab(t)} className="capitalize">
            {t}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(a => {
          const cfg = statusConfig[a.status];
          const daysLeft = Math.ceil((new Date(a.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return (
            <Card key={a.id} className={`border-l-4 ${cfg.color} hover:shadow-md transition-shadow`}>
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColor[a.subject]}`}>{a.subject}</span>
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      {a.grade && (
                        <Badge variant="outline" className="font-bold">{a.grade}</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">By {a.teacher}</p>
                    <p className="text-sm text-muted-foreground mt-2">{a.description}</p>
                  </div>
                  <div className="shrink-0 text-right space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className={`text-sm font-semibold ${a.status === 'overdue' ? 'text-red-600' : daysLeft <= 2 ? 'text-orange-600' : 'text-gray-900'}`}>
                        {new Date(a.dueDate).toLocaleDateString()}
                      </p>
                      {a.status === 'pending' && daysLeft > 0 && (
                        <p className="text-xs text-muted-foreground">{daysLeft} day{daysLeft !== 1 ? 's' : ''} left</p>
                      )}
                    </div>
                    {a.submittedAt && (
                      <div>
                        <p className="text-xs text-muted-foreground">Submitted</p>
                        <p className="text-xs text-green-600">{new Date(a.submittedAt).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {(a.status === 'pending' || a.status === 'overdue') && (
                  <div className="mt-4 pt-4 border-t">
                    <div
                      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
                      onClick={() => setUploading(a.id)}
                    >
                      <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-sm font-medium text-muted-foreground">Click to upload your submission</p>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC, JPG – Max 20 MB</p>
                    </div>
                    {uploading === a.id && (
                      <Button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600" size="sm">
                        Submit Assignment
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
