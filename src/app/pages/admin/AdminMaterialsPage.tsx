import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Trash2, Loader2, RefreshCw, FileText, Video, Image, File } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

const typeIcon = (t: string = '') => ({ pdf: FileText, video: Video, image: Image })[t.toLowerCase()] || File;
const typeBadge = (t: string = '') => ({ pdf: 'bg-red-100 text-red-700', video: 'bg-blue-100 text-blue-700', image: 'bg-green-100 text-green-700' })[t.toLowerCase()] || 'bg-gray-100 text-gray-700';

export const AdminMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: 'pdf', url: '', batchId: '' });

  const load = () => {
    setLoading(true);
    Promise.all([api.admin.getMaterials(), api.admin.getBatches()]).then(([m, b]) => {
      if (m.success) setMaterials(m.data);
      if (b.success) setBatches(b.data);
    }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.createMaterial(form);
      toast.success('Material added');
      setAddOpen(false);
      setForm({ title: '', description: '', type: 'pdf', url: '', batchId: '' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this material?')) return;
    try { await api.admin.deleteMaterial(id); toast.success('Deleted'); load(); }
    catch (err: any) { toast.error(err.message); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-muted-foreground mt-2">Manage all study materials</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600"><Plus className="h-4 w-4 mr-2" /> Add Material</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Study Material</DialogTitle></DialogHeader>
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
                    <Label>Batch</Label>
                    <Select value={form.batchId} onValueChange={(v) => setForm({...form, batchId: v})}>
                      <SelectTrigger><SelectValue placeholder="All batches" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Batches</SelectItem>
                        {batches.map((b) => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label>URL / Link *</Label><Input type="url" value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="https://..." required /></div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Adding...</> : 'Add Material'}
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
            const Icon = typeIcon(m.type);
            return (
              <Card key={m.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={'p-2 rounded-lg ' + typeBadge(m.type)}><Icon className="h-5 w-5" /></div>
                    <Button variant="ghost" size="icon" className="text-red-600 h-7 w-7" onClick={() => handleDelete(m.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-1">{m.title}</h3>
                  {m.description && <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{m.description}</p>}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">{m.type.toUpperCase()}</Badge>
                    {(m.fileUrl || m.url) && <a href={m.fileUrl || m.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">View</a>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {materials.length === 0 && <div className="col-span-3 text-center py-12 text-muted-foreground">No materials yet. Add your first material!</div>}
        </div>
      )}
    </div>
  );
};
