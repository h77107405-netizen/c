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
import { BookOpen, Plus, Eye, Trash2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const assignments = [
  { id: '1', title: 'Integration Practice Set – 50 Problems', batch: 'JEE 2025 – A', subject: 'Mathematics', dueDate: '2024-12-22', submissions: 38, total: 45, status: 'active', description: 'Complete all 50 integration problems from the worksheet provided in class.' },
  { id: '2', title: 'Algebra Word Problems – Chapter 3', batch: 'JEE 2025 – B', subject: 'Mathematics', dueDate: '2024-12-20', submissions: 36, total: 38, status: 'active', description: 'Solve 20 word problems based on algebraic expressions and equations.' },
  { id: '3', title: 'Class 10 – Geometry Construction', batch: 'Class 10 – A', subject: 'Mathematics', dueDate: '2024-12-18', submissions: 35, total: 35, status: 'completed', description: 'Draw geometric constructions for all 10 given figures using compass and ruler.' },
  { id: '4', title: 'Trigonometry Assignment', batch: 'Class 10 – A', subject: 'Mathematics', dueDate: '2024-12-28', submissions: 0, total: 35, status: 'upcoming', description: 'Solve identity proofs and application-based problems from Chapter 8.' },
];

export const AssignmentsPage: React.FC = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState<typeof assignments[0] | null>(null);
  const [form, setForm] = useState({ title: '', batch: '', subject: '', dueDate: '', description: '' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-muted-foreground mt-2">Create and track assignments for your students</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-teal-600 to-cyan-600">
              <Plus className="h-4 w-4 mr-2" /> Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Assignment</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Assignment Title</Label>
                <Input placeholder="e.g. Integration Practice Set" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
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
                  <Label>Due Date</Label>
                  <Input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description / Instructions</Label>
                <textarea
                  className="w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Describe the assignment, instructions, and resources..."
                  value={form.description}
                  onChange={e => setForm({...form, description: e.target.value})}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-teal-600 to-cyan-600" onClick={() => setAddOpen(false)}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', value: String(assignments.length), icon: BookOpen, color: 'from-teal-600 to-teal-400' },
          { label: 'Active', value: String(assignments.filter(a => a.status === 'active').length), icon: Clock, color: 'from-orange-600 to-orange-400' },
          { label: 'Completed', value: String(assignments.filter(a => a.status === 'completed').length), icon: CheckCircle2, color: 'from-green-600 to-green-400' },
          { label: 'Pending Submissions', value: String(assignments.filter(a => a.status === 'active').reduce((s, a) => s + (a.total - a.submissions), 0)), icon: AlertCircle, color: 'from-red-600 to-red-400' },
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
        {assignments.map(a => (
          <Card key={a.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-2">
                  <h3 className="font-semibold text-sm leading-snug">{a.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.batch} · {a.subject}</p>
                </div>
                <Badge variant={a.status === 'completed' ? 'default' : a.status === 'active' ? 'secondary' : 'outline'}>
                  {a.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{a.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Submissions</span>
                  <span className="font-medium">{a.submissions}/{a.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full"
                    style={{ width: `${(a.submissions / a.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(a.dueDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setViewOpen(a)}
                >
                  <Eye className="h-3 w-3 mr-1" /> View Submissions
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!viewOpen} onOpenChange={() => setViewOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewOpen?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Batch</span>
              <span className="font-medium">{viewOpen?.batch}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Submissions</span>
              <span className="font-medium">{viewOpen?.submissions}/{viewOpen?.total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Due Date</span>
              <span className="font-medium">{viewOpen && new Date(viewOpen.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">{viewOpen?.description}</p>
            </div>
            <div className="pt-2 border-t text-center text-sm text-muted-foreground py-4">
              Detailed submission list available in full backend integration.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
