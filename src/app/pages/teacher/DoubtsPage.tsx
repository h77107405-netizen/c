import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { MessageCircle, Search, CheckCircle2, Clock } from 'lucide-react';

const doubts = [
  { id: '1', student: 'Rahul Sharma', batch: 'JEE 2025 – A', subject: 'Mathematics', question: 'How do we decide which method to use — substitution or integration by parts?', postedAt: '2 hours ago', status: 'pending', reply: '' },
  { id: '2', student: 'Priya Singh', batch: 'JEE 2025 – A', subject: 'Mathematics', question: 'Can limits exist even if the function is not defined at that point?', postedAt: '5 hours ago', status: 'pending', reply: '' },
  { id: '3', student: 'Amit Kumar', batch: 'JEE 2025 – B', subject: 'Mathematics', question: 'What is the difference between a sequence and a series? Both look similar.', postedAt: '1 day ago', status: 'pending', reply: '' },
  { id: '4', student: 'Sneha Patel', batch: 'Class 10 – A', subject: 'Mathematics', question: 'In the quadratic formula, when do we get two equal roots vs two different roots?', postedAt: '2 days ago', status: 'replied', reply: 'Great question! When the discriminant (b²–4ac) = 0, you get two equal roots. When it is positive, you get two distinct real roots. When it is negative, the roots are complex.' },
  { id: '5', student: 'Vikram Singh', batch: 'JEE 2025 – A', subject: 'Mathematics', question: 'How to prove sin²x + cos²x = 1 geometrically?', postedAt: '3 days ago', status: 'replied', reply: 'Using the unit circle — any point on the unit circle satisfies x² + y² = 1. Since x = cosθ and y = sinθ on the unit circle, substituting gives sin²θ + cos²θ = 1.' },
];

export const DoubtsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'replied'>('all');
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [localDoubts, setLocalDoubts] = useState(doubts);

  const filtered = localDoubts.filter(d => {
    const matchSearch = d.student.toLowerCase().includes(search.toLowerCase()) ||
      d.question.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  });

  const handleReply = (id: string) => {
    setLocalDoubts(prev => prev.map(d => d.id === id ? { ...d, status: 'replied', reply: replyText[id] || '' } : d));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Doubts</h1>
        <p className="text-muted-foreground mt-2">Answer student questions and doubts from your batches</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Doubts', value: String(localDoubts.length), icon: MessageCircle, color: 'from-blue-600 to-blue-400' },
          { label: 'Pending', value: String(localDoubts.filter(d => d.status === 'pending').length), icon: Clock, color: 'from-orange-600 to-orange-400' },
          { label: 'Replied', value: String(localDoubts.filter(d => d.status === 'replied').length), icon: CheckCircle2, color: 'from-green-600 to-green-400' },
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by student or question..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'replied'] as const).map(f => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(doubt => (
          <Card key={doubt.id} className={`${doubt.status === 'pending' ? 'border-l-4 border-l-orange-400' : 'border-l-4 border-l-green-400'}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-400 flex items-center justify-center text-white font-semibold text-sm">
                    {doubt.student.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{doubt.student}</p>
                    <p className="text-xs text-muted-foreground">{doubt.batch} · {doubt.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{doubt.postedAt}</span>
                  <Badge variant={doubt.status === 'pending' ? 'secondary' : 'default'}>
                    {doubt.status}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm">{doubt.question}</p>
              </div>

              {doubt.status === 'replied' && doubt.reply && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">Your Reply:</p>
                  <p className="text-sm text-green-900">{doubt.reply}</p>
                </div>
              )}

              {doubt.status === 'pending' && (
                <div className="space-y-2">
                  <textarea
                    className="w-full border rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={3}
                    placeholder="Type your reply to this doubt..."
                    value={replyText[doubt.id] || ''}
                    onChange={e => setReplyText(prev => ({ ...prev, [doubt.id]: e.target.value }))}
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-teal-600"
                      onClick={() => handleReply(doubt.id)}
                      disabled={!replyText[doubt.id]?.trim()}
                    >
                      Send Reply
                    </Button>
                  </div>
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
