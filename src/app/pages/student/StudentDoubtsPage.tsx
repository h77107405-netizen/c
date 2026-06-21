import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Loader2, Plus, MessageSquare, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const StudentDoubtsPage: React.FC = () => {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ subject: '', question: '' });

  const load = () => {
    setLoading(true);
    api.student.getDoubts().then((r) => { if (r.success) setDoubts(r.data); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.student.postDoubt(form);
      toast.success('Doubt posted! Your teacher will reply soon.');
      setAddOpen(false);
      setForm({ subject: '', question: '' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Doubts</h1>
          <p className="text-muted-foreground mt-2">Ask questions and get answers from your teacher</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600"><Plus className="h-4 w-4 mr-2" />Post a Doubt</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Post a Doubt</DialogTitle></DialogHeader>
              <form onSubmit={handlePost} className="space-y-4 mt-4">
                <div><Label>Subject *</Label><Input value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} placeholder="e.g. Mathematics" required /></div>
                <div><Label>Your Question *</Label><Textarea value={form.question} onChange={(e) => setForm({...form, question: e.target.value})} placeholder="Describe your doubt in detail..." rows={4} required /></div>
                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Posting...</> : 'Post Doubt'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <div className="space-y-4">
          {doubts.map((d) => (
            <Card key={d.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{d.subject}</span>
                    <Badge variant={d.status === 'open' ? 'secondary' : 'default'}>{d.status === 'open' ? 'Pending Reply' : 'Answered'}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ''}</span>
                </div>
                <p className="text-sm bg-gray-50 p-3 rounded-lg mb-3">{d.question}</p>
                {d.replies && d.replies.map((r: any, i: number) => (
                  <div key={i} className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm">
                    <span className="font-medium text-green-700">Teacher's Answer: </span>{r.reply}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
          {doubts.length === 0 && <Card><CardContent className="text-center py-12 text-muted-foreground">No doubts posted yet. Ask your first question!</CardContent></Card>}
        </div>
      )}
    </div>
  );
};
