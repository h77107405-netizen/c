import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Plus, Trash2, Loader2, RefreshCw, GraduationCap } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', classLevel: '', duration: '', fee: '' });

  const load = () => {
    setLoading(true);
    api.admin.getCourses().then((r) => { if (r.success) setCourses(r.data); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.createCourse(form);
      toast.success('Course created');
      setAddOpen(false);
      setForm({ name: '', description: '', classLevel: '', duration: '', fee: '' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete course "${name}"?`)) return;
    try { await api.admin.deleteCourse(id); toast.success('Course deleted'); load(); }
    catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-muted-foreground mt-2">Manage all courses offered by the institute</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600"><Plus className="h-4 w-4 mr-2" /> Add Course</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Course</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div><Label>Course Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required /></div>
                <div><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Class Level</Label><Input placeholder="e.g. Class 11-12" value={form.classLevel} onChange={(e) => setForm({...form, classLevel: e.target.value})} /></div>
                  <div><Label>Duration (months)</Label><Input type="number" value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} /></div>
                  <div className="col-span-2"><Label>Fee (₹) *</Label><Input type="number" value={form.fee} onChange={(e) => setForm({...form, fee: e.target.value})} required /></div>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : 'Create Course'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Courses</p><h3 className="text-3xl font-bold mt-2">{courses.length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Active</p><h3 className="text-3xl font-bold mt-2 text-green-600">{courses.filter(c => c.status === 'active').length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Revenue Potential</p><h3 className="text-3xl font-bold mt-2 text-blue-600">₹{courses.reduce((s, c) => s + Number(c.fee || 0), 0).toLocaleString('en-IN')}</h3></CardContent></Card>
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c) => (
            <Card key={c.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg"><GraduationCap className="h-6 w-6 text-purple-600" /></div>
                  <div className="flex items-center gap-2">
                    <Badge variant={c.status === 'active' ? 'default' : 'secondary'}>{c.status}</Badge>
                    <Button variant="ghost" size="icon" className="text-red-600 h-7 w-7" onClick={() => handleDelete(c.id, c.name)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{c.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{c.classLevel || 'All levels'} • {c.duration ? `${c.duration} months` : ''}</span>
                  <span className="font-bold text-green-600">₹{Number(c.fee).toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {courses.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">No courses yet. Add your first course!</div>
          )}
        </div>
      )}
    </div>
  );
};
