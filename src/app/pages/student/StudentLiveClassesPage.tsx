import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Video, Calendar, Clock, User } from 'lucide-react';

const classes = [
  { id: '1', subject: 'Mathematics', topic: 'Calculus – Integration by Parts', teacher: 'Prof. Arvind Sharma', date: 'Today', time: '9:00 AM', duration: '90 min', status: 'live', meetingLink: '#' },
  { id: '2', subject: 'Physics', topic: 'Thermodynamics – First Law', teacher: 'Dr. Rajesh Verma', date: 'Today', time: '2:00 PM', duration: '90 min', status: 'upcoming', meetingLink: '#' },
  { id: '3', subject: 'Chemistry', topic: 'Electrochemistry – Electrolysis', teacher: 'Prof. Seema Gupta', date: 'Tomorrow', time: '10:00 AM', duration: '90 min', status: 'scheduled', meetingLink: '' },
  { id: '4', subject: 'Mathematics', topic: 'Trigonometry – Inverse Functions', teacher: 'Prof. Arvind Sharma', date: 'Dec 21', time: '9:00 AM', duration: '90 min', status: 'scheduled', meetingLink: '' },
  { id: '5', subject: 'Physics', topic: 'Optics – Refraction', teacher: 'Dr. Rajesh Verma', date: 'Dec 22', time: '2:00 PM', duration: '90 min', status: 'scheduled', meetingLink: '' },
  { id: '6', subject: 'Chemistry', topic: 'Organic – Reaction Mechanisms', teacher: 'Prof. Seema Gupta', date: 'Dec 18', time: '10:00 AM', duration: '90 min', status: 'completed', meetingLink: '' },
  { id: '7', subject: 'Mathematics', topic: 'Complex Numbers', teacher: 'Prof. Arvind Sharma', date: 'Dec 17', time: '9:00 AM', duration: '90 min', status: 'completed', meetingLink: '' },
];

const subjectColor: Record<string, string> = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
};

export const StudentLiveClassesPage: React.FC = () => {
  const live = classes.filter(c => c.status === 'live');
  const upcoming = classes.filter(c => c.status === 'upcoming');
  const scheduled = classes.filter(c => c.status === 'scheduled');
  const completed = classes.filter(c => c.status === 'completed');

  const ClassCard = ({ cls }: { cls: typeof classes[0] }) => (
    <Card className={`hover:shadow-md transition-shadow ${cls.status === 'live' ? 'border-red-300 bg-red-50/40' : ''}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${cls.status === 'live' ? 'bg-red-100' : 'bg-blue-50'}`}>
              <Video className={`h-4 w-4 ${cls.status === 'live' ? 'text-red-600' : 'text-blue-600'}`} />
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColor[cls.subject]}`}>
              {cls.subject}
            </span>
          </div>
          {cls.status === 'live' && (
            <Badge className="bg-red-600 animate-pulse">
              <span className="h-1.5 w-1.5 bg-white rounded-full mr-1 inline-block" />
              Live Now
            </Badge>
          )}
          {cls.status === 'completed' && <Badge variant="default">Completed</Badge>}
          {cls.status === 'upcoming' && <Badge variant="secondary">Starting Soon</Badge>}
        </div>
        <h3 className="font-semibold text-sm mb-1">{cls.topic}</h3>
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" /><span>{cls.teacher}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" /><span>{cls.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /><span>{cls.time} · {cls.duration}</span>
          </div>
        </div>
        {cls.status === 'live' ? (
          <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
            <Video className="h-3 w-3 mr-1" /> Join Now
          </Button>
        ) : cls.status === 'completed' ? (
          <Button variant="outline" className="w-full" size="sm">View Recording</Button>
        ) : (
          <Button variant="outline" className="w-full" size="sm" disabled={!cls.meetingLink}>
            {cls.meetingLink ? 'Join When Live' : 'Link Not Yet Available'}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Classes</h1>
        <p className="text-muted-foreground mt-2">Join your live classes and watch recordings</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Live Now', value: String(live.length), color: 'text-red-600' },
          { label: 'Upcoming Today', value: String(upcoming.length), color: 'text-blue-600' },
          { label: 'Scheduled', value: String(scheduled.length), color: 'text-orange-600' },
          { label: 'Completed', value: String(completed.length), color: 'text-green-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <h3 className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {live.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
            <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse" /> Live Right Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {live.map(c => <ClassCard key={c.id} cls={c} />)}
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Upcoming Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcoming.map(c => <ClassCard key={c.id} cls={c} />)}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3">Scheduled Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {scheduled.map(c => <ClassCard key={c.id} cls={c} />)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-3 text-muted-foreground">Past Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {completed.map(c => <ClassCard key={c.id} cls={c} />)}
        </div>
      </div>
    </div>
  );
};
