import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Loader2, RefreshCw, FileText, Video, Image, File } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

const typeIcon = (t: string) => ({ pdf: FileText, video: Video, image: Image })[t] || File;

export const TeacherMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: 'pdf', url: '', batchId: '' });

  const load = () => {
    setLoading(true);
    Promise.all([api.teacher.getMaterials(), api.teacher.getBatches()]).then(([m, b]) => {
      if (m.success) setMaterials(m.data);
      if (b.success) setBatches(b.data);
    }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.teacher.uploadMaterial(form);
      toast.success('Material uploaded');
      setAddOpen(false);
      setForm({ title: '', description: '', type: 'pdf', url: '', batchId: '' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-muted-foreground mt-2">Upload and manage study materials for your students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600"><Plus className="h-4 w-4 mr-2" /> Upload Material</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Upload Study Material</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 mt-4">
                <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required /></div>
                <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({...form, type: v})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Batch *</Label>
                    <Select value={form.batchId} onValueChange={(v) => setForm({...form, batchId: v})}>
                      <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                      <SelectContent>{batches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>URL / Link *</Label><Input type="url" value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="https://..." required /></div>
                <Button type="submit" className="w-full" disabled={saving || !form.batchId}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</> : 'Upload Material'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((m) => {
            const Icon = typeIcon(m.fileType || m.type);
            return (
              <Card key={m.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><Icon className="h-5 w-5 text-blue-600" /></div>
                    <Badge variant="outline">{m.type.toUpperCase()}</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{m.title}</h3>
                  {m.description && <p className="text-sm text-muted-foreground mb-2">{m.description}</p>}
                  {(m.fileUrl || m.url) && <a href={m.fileUrl || m.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Open Material</a>}
                </CardContent>
              </Card>
            );
          })}
          {materials.length === 0 && <div className="col-span-3 text-center py-12 text-muted-foreground">No materials uploaded yet</div>}
        </div>
      )}
    </div>
  );
};
