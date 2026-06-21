import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import { Video, Plus, Calendar, Clock, Users, Link2, CheckCircle2 } from 'lucide-react';

const classes = [
  { id: '1', subject: 'Mathematics – Calculus', topic: 'Integration by Parts', batch: 'JEE 2025 – A', date: 'Today', time: '9:00 AM', duration: '90 min', students: 45, meetingLink: 'https://meet.google.com/abc-def-ghi', status: 'live' },
  { id: '2', subject: 'Mathematics – Algebra', topic: 'Complex Numbers', batch: 'JEE 2025 – B', date: 'Today', time: '11:30 AM', duration: '90 min', students: 38, meetingLink: 'https://meet.google.com/xyz-uvw-rst', status: 'upcoming' },
  { id: '3', subject: 'Mathematics – Trigonometry', topic: 'Inverse Functions', batch: 'Class 10 – A', date: 'Today', time: '2:00 PM', duration: '60 min', students: 35, meetingLink: 'https://meet.google.com/pqr-mno-lkj', status: 'upcoming' },
  { id: '4', subject: 'Mathematics – Calculus', topic: 'Differential Equations', batch: 'JEE 2025 – A', date: 'Tomorrow', time: '9:00 AM', duration: '90 min', students: 45, meetingLink: '', status: 'scheduled' },
  { id: '5', subject: 'Mathematics – Statistics', topic: 'Probability Basics', batch: 'Class 10 – A', date: 'Dec 22', time: '2:00 PM', duration: '60 min', students: 35, meetingLink: '', status: 'scheduled' },
  { id: '6', subject: 'Mathematics – Vectors', topic: 'Cross Product Applications', batch: 'JEE 2025 – B', date: 'Dec 19', time: '9:00 AM', duration: '90 min', students: 38, meetingLink: 'https://meet.google.com/vec-tor-123', status: 'completed' },
];

const statusColor: Record<string, string> = {
  live: 'destructive',
  upcoming: 'secondary',
  scheduled: 'outline',
  completed: 'default',
};

export const LiveClassesPage: React.FC = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ subject: '', topic: '', batch: '', date: '', time: '', duration: '', link: '' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Classes</h1>
          <p className="text-muted-foreground mt-2">Schedule and manage your live class sessions</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Plus className="h-4 w-4 mr-2" /> Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Schedule New Live Class</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Subject & Topic</Label>
                <Input placeholder="e.g. Mathematics – Integration" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Topic Details</Label>
                <Input placeholder="e.g. Integration by Parts" value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Batch</Label>
                  <Select value={form.batch} onValueChange={v => setForm({...form, batch: v})}>
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee-a">JEE 2025 – A</SelectItem>
                      <SelectItem value="jee-b">JEE 2025 – B</SelectItem>
                      <SelectItem value="cl10-a">Class 10 – A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Select value={form.duration} onValueChange={v => setForm({...form, duration: v})}>
                    <SelectTrigger><SelectValue placeholder="Duration" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60 min</SelectItem>
                      <SelectItem value="90">90 min</SelectItem>
                      <SelectItem value="120">120 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Meeting Link (optional)</Label>
                <Input placeholder="https://meet.google.com/..." value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600" onClick={() => setAddOpen(false)}>Schedule Class</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: String(classes.length), color: 'text-gray-900' },
          { label: 'Live Now', value: String(classes.filter(c => c.status === 'live').length), color: 'text-red-600' },
          { label: 'Upcoming Today', value: String(classes.filter(c => c.status === 'upcoming').length), color: 'text-blue-600' },
          { label: 'Completed', value: String(classes.filter(c => c.status === 'completed').length), color: 'text-green-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <h3 className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {classes.map(cls => (
          <Card key={cls.id} className={`hover:shadow-md transition-shadow ${cls.status === 'live' ? 'border-red-300 bg-red-50/30' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${cls.status === 'live' ? 'bg-red-100' : 'bg-blue-100'}`}>
                    <Video className={`h-4 w-4 ${cls.status === 'live' ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{cls.subject}</p>
                    <p className="text-xs text-muted-foreground">{cls.topic}</p>
                  </div>
                </div>
                <Badge variant={statusColor[cls.status] as 'default' | 'secondary' | 'outline' | 'destructive'}>
                  {cls.status === 'live' && <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 animate-pulse inline-block" />}
                  {cls.status}
                </Badge>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{cls.batch} — {cls.students} students</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{cls.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{cls.time} — {cls.duration}</span>
                </div>
              </div>

              {cls.status === 'live' ? (
                <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                  <Video className="h-3 w-3 mr-1" /> Start / Join Now
                </Button>
              ) : cls.status === 'upcoming' ? (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Link2 className="h-3 w-3 mr-1" /> Add Link
                  </Button>
                  <Button className="flex-1" size="sm">Join</Button>
                </div>
              ) : cls.status === 'completed' ? (
                <Button variant="outline" className="w-full" size="sm">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-green-600" /> View Recording
                </Button>
              ) : (
                <Button variant="outline" className="w-full" size="sm">
                  <Link2 className="h-3 w-3 mr-1" /> Add Meeting Link
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
