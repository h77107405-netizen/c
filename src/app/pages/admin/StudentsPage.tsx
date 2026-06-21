import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Plus, Search, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: 'Student@123', parentName: '', parentPhone: '' });

  const load = () => {
    setLoading(true);
    api.admin.getStudents().then((r) => { if (r.success) setStudents(r.data); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.createStudent(form);
      toast.success('Student added successfully');
      setAddOpen(false);
      setForm({ name: '', email: '', phone: '', password: 'Student@123', parentName: '', parentPhone: '' });
      load();
    } catch (err: any) {
      toast.error(err.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete student ${name}?`)) return;
    try {
      await api.admin.deleteStudent(id);
      toast.success('Student deleted');
      load();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleStatusToggle = async (id: string, current: string) => {
    const newStatus = current === 'active' ? 'inactive' : 'active';
    try {
      await api.admin.updateStudent(id, { status: newStatus });
      toast.success('Status updated');
      load();
    } catch (err: any) { toast.error(err.message); }
  };

  const filtered = students.filter((s) =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.phone?.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-muted-foreground mt-2">Manage all students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Full Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required /></div>
                  <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required /></div>
                  <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required /></div>
                  <div><Label>Password *</Label><Input value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required /></div>
                  <div><Label>Parent Name</Label><Input value={form.parentName} onChange={(e) => setForm({...form, parentName: e.target.value})} /></div>
                  <div><Label>Parent Phone</Label><Input value={form.parentPhone} onChange={(e) => setForm({...form, parentPhone: e.target.value})} /></div>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</> : 'Add Student'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Students</p><h3 className="text-3xl font-bold mt-2">{students.length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Active</p><h3 className="text-3xl font-bold mt-2 text-green-600">{students.filter(s => s.status === 'active').length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Inactive</p><h3 className="text-3xl font-bold mt-2 text-gray-500">{students.filter(s => s.status !== 'active').length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">New This Month</p><h3 className="text-3xl font-bold mt-2 text-blue-600">{students.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length}</h3></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All Students</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, email, phone..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Contact</TableHead>
                    <TableHead>Parent</TableHead><TableHead>Status</TableHead>
                    <TableHead>Enrolled</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell><div className="text-sm"><div>{s.email}</div><div className="text-muted-foreground">{s.phone}</div></div></TableCell>
                      <TableCell><div className="text-sm"><div>{s.parentName || '—'}</div><div className="text-muted-foreground">{s.parentPhone || ''}</div></div></TableCell>
                      <TableCell>
                        <Badge variant={s.status === 'active' ? 'default' : 'secondary'} className="cursor-pointer" onClick={() => handleStatusToggle(s.id, s.status)}>
                          {s.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{s.enrollmentDate ? new Date(s.enrollmentDate).toLocaleDateString() : '—'}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(s.id, s.name)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No students found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
