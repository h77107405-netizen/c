import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import { ClipboardList, Plus, Eye, Trash2, CheckCircle2, Clock, Users } from 'lucide-react';

const myTests = [
  { id: '1', name: 'Calculus – Unit Test 3', batch: 'JEE 2025 – A', subject: 'Mathematics', totalMarks: 100, duration: '90 min', questions: 25, submissions: 43, total: 45, scheduledDate: '2024-12-20', avgScore: '74%', status: 'completed' },
  { id: '2', name: 'Algebra Quiz 2', batch: 'JEE 2025 – B', subject: 'Mathematics', totalMarks: 50, duration: '45 min', questions: 15, submissions: 0, total: 38, scheduledDate: '2024-12-25', avgScore: '—', status: 'scheduled' },
  { id: '3', name: 'Class 10 – Mid-Term Math', batch: 'Class 10 – A', subject: 'Mathematics', totalMarks: 100, duration: '120 min', questions: 30, submissions: 35, total: 35, scheduledDate: '2024-12-10', avgScore: '80%', status: 'completed' },
  { id: '4', name: 'Trigonometry Test', batch: 'Class 10 – A', subject: 'Mathematics', totalMarks: 60, duration: '60 min', questions: 20, submissions: 0, total: 35, scheduledDate: '2024-12-28', avgScore: '—', status: 'upcoming' },
];

export const TeacherTestsPage: React.FC = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', batch: '', subject: '', marks: '', duration: '', date: '' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tests Management</h1>
          <p className="text-muted-foreground mt-2">Create and manage tests for your batches</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
              <Plus className="h-4 w-4 mr-2" /> Create Test
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Test</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Test Name</Label>
                <Input placeholder="e.g. Calculus – Unit Test 4" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Batch</Label>
                  <Select value={form.batch} onValueChange={v => setForm({...form, batch: v})}>
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee-a">JEE 2025 – A</SelectItem>
                      <SelectItem value="jee-b">JEE 2025 – B</SelectItem>
                      <SelectItem value="cl10-a">Class 10 – A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="Mathematics" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Total Marks</Label>
                  <Input type="number" placeholder="100" value={form.marks} onChange={e => setForm({...form, marks: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={form.duration} onValueChange={v => setForm({...form, duration: v})}>
                    <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                      <SelectItem value="90">90 min</SelectItem>
                      <SelectItem value="120">120 min</SelectItem>
                      <SelectItem value="180">180 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Scheduled Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600" onClick={() => setAddOpen(false)}>Create Test</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tests', value: String(myTests.length), icon: ClipboardList, color: 'from-purple-600 to-purple-400' },
          { label: 'Completed', value: String(myTests.filter(t => t.status === 'completed').length), icon: CheckCircle2, color: 'from-green-600 to-green-400' },
          { label: 'Upcoming', value: String(myTests.filter(t => t.status !== 'completed').length), icon: Clock, color: 'from-orange-600 to-orange-400' },
          { label: 'Total Submissions', value: String(myTests.reduce((s, t) => s + t.submissions, 0)), icon: Users, color: 'from-blue-600 to-blue-400' },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myTests.map(test => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{test.name}</h3>
                  <p className="text-sm text-muted-foreground">{test.batch}</p>
                </div>
                <Badge variant={test.status === 'completed' ? 'default' : test.status === 'upcoming' ? 'secondary' : 'outline'}>
                  {test.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold">{test.totalMarks}</p>
                  <p className="text-xs text-muted-foreground">Marks</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold">{test.questions}</p>
                  <p className="text-xs text-muted-foreground">Questions</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-sm">{test.duration}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-muted-foreground">
                  Submissions: <span className="font-medium text-gray-900">{test.submissions}/{test.total}</span>
                </span>
                {test.status === 'completed' && (
                  <span className="text-muted-foreground">
                    Avg: <span className="font-medium text-green-600">{test.avgScore}</span>
                  </span>
                )}
                <span className="text-muted-foreground text-xs">
                  {new Date(test.scheduledDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  {test.status === 'completed' ? 'View Results' : 'Preview'}
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
