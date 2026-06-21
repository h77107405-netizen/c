import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Plus, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const AssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', batchId: '', description: '', dueDate: '', maxMarks: '100' });

  const load = () => {
    setLoading(true);
    Promise.all([api.teacher.getAssignments(), api.teacher.getBatches()]).then(([a, b]) => {
      if (a.success) setAssignments(a.data);
      if (b.success) setBatches(b.data);
    }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.teacher.createAssignment(form);
      toast.success('Assignment created');
      setAddOpen(false);
      setForm({ title: '', batchId: '', description: '', dueDate: '', maxMarks: '100' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-muted-foreground mt-2">Manage assignments for your students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-600 to-yellow-600"><Plus className="h-4 w-4 mr-2" /> Create Assignment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Assignment</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required /></div>
                <div>
                  <Label>Batch *</Label>
                  <Select value={form.batchId} onValueChange={(v) => setForm({...form, batchId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>{batches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Due Date *</Label><Input type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} required /></div>
                  <div><Label>Max Marks</Label><Input type="number" value={form.maxMarks} onChange={(e) => setForm({...form, maxMarks: e.target.value})} /></div>
                </div>
                <Button type="submit" className="w-full" disabled={saving || !form.batchId}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : 'Create Assignment'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Title</TableHead><TableHead>Batch</TableHead><TableHead>Max Marks</TableHead><TableHead>Due Date</TableHead><TableHead>Submissions</TableHead><TableHead>Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell>{a.batchName || '—'}</TableCell>
                    <TableCell>{a.maxMarks}</TableCell>
                    <TableCell className="text-sm">{a.dueDate ? new Date(a.dueDate).toLocaleDateString() : '—'}</TableCell>
                    <TableCell>{a.submissionCount ?? 0}</TableCell>
                    <TableCell><Badge variant={a.status === 'active' ? 'default' : 'secondary'}>{a.status}</Badge></TableCell>
                  </TableRow>
                ))}
                {assignments.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No assignments yet</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
