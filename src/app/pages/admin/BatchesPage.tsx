import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Trash2, Loader2, RefreshCw, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const BatchesPage: React.FC = () => {
  const [batches, setBatches] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', courseId: '', timing: '', startDate: '', endDate: '', description: '' });

  const load = () => {
    setLoading(true);
    Promise.all([api.admin.getBatches(), api.admin.getCourses()]).then(([b, c]) => {
      if (b.success) setBatches(b.data);
      if (c.success) setCourses(c.data);
    }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.createBatch(form);
      toast.success('Batch created');
      setAddOpen(false);
      setForm({ name: '', courseId: '', timing: '', startDate: '', endDate: '', description: '' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete batch "${name}"?`)) return;
    try { await api.admin.deleteBatch(id); toast.success('Batch deleted'); load(); }
    catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
          <p className="text-muted-foreground mt-2">Manage all study batches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600"><Plus className="h-4 w-4 mr-2" /> Add Batch</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create New Batch</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div><Label>Batch Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required /></div>
                <div>
                  <Label>Course *</Label>
                  <Select value={form.courseId} onValueChange={(v) => setForm({...form, courseId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Timing</Label><Input placeholder="e.g. Mon/Wed/Fri 10:00 AM" value={form.timing} onChange={(e) => setForm({...form, timing: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Start Date</Label><Input type="date" value={form.startDate} onChange={(e) => setForm({...form, startDate: e.target.value})} /></div>
                  <div><Label>End Date</Label><Input type="date" value={form.endDate} onChange={(e) => setForm({...form, endDate: e.target.value})} /></div>
                </div>
                <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
                <Button type="submit" className="w-full" disabled={saving || !form.courseId}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : 'Create Batch'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Name</TableHead><TableHead>Course</TableHead><TableHead>Timing</TableHead>
                <TableHead>Students</TableHead><TableHead>Status</TableHead>
                <TableHead>Duration</TableHead><TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.courseName || '—'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.timing || '—'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{b.studentCount ?? 0}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={b.status === 'active' ? 'default' : 'secondary'}>{b.status}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {b.startDate ? new Date(b.startDate).toLocaleDateString() : '—'} → {b.endDate ? new Date(b.endDate).toLocaleDateString() : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(b.id, b.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {batches.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No batches yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
