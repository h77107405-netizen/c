import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import { MessageCircle, Plus, CheckCircle2, Clock } from 'lucide-react';

const myDoubts = [
  { id: '1', subject: 'Mathematics', question: 'How do we decide which method to use — substitution or integration by parts?', postedAt: '2 hours ago', status: 'pending', reply: '', teacher: 'Prof. Arvind Sharma' },
  { id: '2', subject: 'Physics', question: 'What is the physical significance of the work-energy theorem?', postedAt: '1 day ago', status: 'replied', reply: 'The work-energy theorem states that the net work done on an object equals the change in its kinetic energy. Physically, it means any net force doing work will directly change the motion/speed of the object. It bridges force (dynamics) with energy (kinematics) in a clean relationship.', teacher: 'Dr. Rajesh Verma' },
  { id: '3', subject: 'Chemistry', question: 'Why do electronegativity values increase across a period and decrease down a group?', postedAt: '3 days ago', status: 'replied', reply: 'Across a period, nuclear charge increases while shielding stays similar, pulling electrons more strongly. Down a group, additional electron shells increase shielding and the atomic radius, so the nucleus attracts bonding electrons less effectively.', teacher: 'Prof. Seema Gupta' },
  { id: '4', subject: 'Mathematics', question: 'What is the intuition behind L\'Hôpital\'s rule and when exactly should I apply it?', postedAt: '5 days ago', status: 'pending', reply: '', teacher: 'Prof. Arvind Sharma' },
];

const subjectColor: Record<string, string> = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
};

export const StudentDoubtsPage: React.FC = () => {
  const [askOpen, setAskOpen] = useState(false);
  const [form, setForm] = useState({ subject: '', question: '' });
  const [filter, setFilter] = useState<'all' | 'pending' | 'replied'>('all');

  const filtered = myDoubts.filter(d => filter === 'all' || d.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ask a Doubt</h1>
          <p className="text-muted-foreground mt-2">Post your doubts and get answers from your teachers</p>
        </div>
        <Dialog open={askOpen} onOpenChange={setAskOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4 mr-2" /> Ask Doubt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Ask a New Doubt</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={form.subject} onValueChange={v => setForm({...form, subject: v})}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Your Question</Label>
                <textarea
                  className="w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Type your doubt clearly. Include context if possible (e.g., chapter, topic, what you already tried)..."
                  value={form.question}
                  onChange={e => setForm({...form, question: e.target.value})}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAskOpen(false)}>Cancel</Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={!form.subject || !form.question.trim()}
                  onClick={() => setAskOpen(false)}
                >
                  Submit Doubt
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Asked', value: String(myDoubts.length), icon: MessageCircle, color: 'from-blue-600 to-blue-400' },
          { label: 'Pending Reply', value: String(myDoubts.filter(d => d.status === 'pending').length), icon: Clock, color: 'from-orange-600 to-orange-400' },
          { label: 'Answered', value: String(myDoubts.filter(d => d.status === 'replied').length), icon: CheckCircle2, color: 'from-green-600 to-green-400' },
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

      <div className="flex gap-2">
        {(['all', 'pending', 'replied'] as const).map(f => (
          <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)} className="capitalize">{f}</Button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(doubt => (
          <Card key={doubt.id} className={`${doubt.status === 'pending' ? 'border-l-4 border-l-orange-400' : 'border-l-4 border-l-green-400'}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColor[doubt.subject]}`}>{doubt.subject}</span>
                  <Badge variant={doubt.status === 'pending' ? 'secondary' : 'default'}>{doubt.status}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{doubt.postedAt}</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-muted-foreground mb-1">Your Question:</p>
                <p className="text-sm">{doubt.question}</p>
              </div>

              {doubt.status === 'replied' && doubt.reply && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {doubt.teacher} replied:
                  </p>
                  <p className="text-sm text-green-900">{doubt.reply}</p>
                </div>
              )}

              {doubt.status === 'pending' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-xs text-orange-700 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Waiting for reply from {doubt.teacher}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No doubts found</div>
        )}
      </div>
    </div>
  );
};
