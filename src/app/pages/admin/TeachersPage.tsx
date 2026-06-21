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

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: 'Teacher@123', qualification: '', experience: '', specialization: '' });

  const load = () => {
    setLoading(true);
    api.admin.getTeachers().then((r) => { if (r.success) setTeachers(r.data); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.createTeacher(form);
      toast.success('Teacher added successfully');
      setAddOpen(false);
      setForm({ name: '', email: '', phone: '', password: 'Teacher@123', qualification: '', experience: '', specialization: '' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete teacher ${name}?`)) return;
    try { await api.admin.deleteTeacher(id); toast.success('Teacher deleted'); load(); }
    catch (err: any) { toast.error(err.message); }
  };

  const filtered = teachers.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) || t.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-muted-foreground mt-2">Manage all teachers and their assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600"><Plus className="h-4 w-4 mr-2" /> Add Teacher</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New Teacher</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Full Name *</Label><Input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required /></div>
                  <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required /></div>
                  <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required /></div>
                  <div><Label>Password *</Label><Input value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required /></div>
                  <div><Label>Qualification</Label><Input value={form.qualification} onChange={(e) => setForm({...form, qualification: e.target.value})} /></div>
                  <div><Label>Experience (years)</Label><Input type="number" value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} /></div>
                  <div className="col-span-2"><Label>Specialization</Label><Input value={form.specialization} onChange={(e) => setForm({...form, specialization: e.target.value})} /></div>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</> : 'Add Teacher'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Teachers</p><h3 className="text-3xl font-bold mt-2">{teachers.length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Active</p><h3 className="text-3xl font-bold mt-2 text-green-600">{teachers.filter(t => t.status === 'active').length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Inactive</p><h3 className="text-3xl font-bold mt-2 text-gray-500">{teachers.filter(t => t.status !== 'active').length}</h3></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>All Teachers</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search teachers..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                    <TableHead>Specialization</TableHead><TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.name}</TableCell>
                      <TableCell><div className="text-sm"><div>{t.email}</div><div className="text-muted-foreground">{t.phone}</div></div></TableCell>
                      <TableCell>{t.specialization || '—'}</TableCell>
                      <TableCell>{t.experience ? `${t.experience} yrs` : '—'}</TableCell>
                      <TableCell><Badge variant={t.status === 'active' ? 'default' : 'secondary'}>{t.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(t.id, t.name)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No teachers found</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
