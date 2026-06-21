import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar, FileText, ClipboardList, Video, BookOpen, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const todayTasks = [
  { type: 'class', title: 'Mathematics - Calculus', time: '10:00 AM', status: 'upcoming', icon: Video },
  { type: 'test', title: 'Physics Unit Test', time: '2:00 PM', status: 'pending', icon: ClipboardList },
  { type: 'assignment', title: 'Chemistry Assignment', time: 'Due: 6:00 PM', status: 'pending', icon: BookOpen },
];

const upcomingClasses = [
  { subject: 'Mathematics', topic: 'Calculus - Integration', teacher: 'Prof. Sharma', time: 'Today, 10:00 AM', status: 'live' },
  { subject: 'Physics', topic: 'Mechanics - Motion', teacher: 'Dr. Verma', time: 'Today, 2:00 PM', status: 'upcoming' },
  { subject: 'Chemistry', topic: 'Organic Chemistry', teacher: 'Prof. Gupta', time: 'Tomorrow, 9:00 AM', status: 'scheduled' },
];

const recentMaterials = [
  { title: 'Calculus - Chapter 5 Notes', subject: 'Mathematics', uploadedBy: 'Prof. Sharma', date: '2 hours ago', isNew: true },
  { title: 'Physics Formula Sheet', subject: 'Physics', uploadedBy: 'Dr. Verma', date: '1 day ago', isNew: true },
  { title: 'Organic Chemistry Practice', subject: 'Chemistry', uploadedBy: 'Prof. Gupta', date: '2 days ago', isNew: false },
];

const stats = [
  { name: 'Tests Completed', value: '24', change: '+4 this week', icon: CheckCircle2, color: 'from-green-600 to-green-400' },
  { name: 'Avg. Score', value: '85%', change: '+5% improved', icon: TrendingUp, color: 'from-blue-600 to-blue-400' },
  { name: 'Materials', value: '156', change: '8 new today', icon: FileText, color: 'from-purple-600 to-purple-400' },
  { name: 'Pending Work', value: '3', change: '2 assignments', icon: Clock, color: 'from-orange-600 to-orange-400' },
];

const recentResults = [
  { test: 'Mathematics - Unit Test 3', score: '92/100', percentage: '92%', date: '3 days ago', grade: 'A+' },
  { test: 'Physics - Chapter Test', score: '78/100', percentage: '78%', date: '5 days ago', grade: 'B+' },
  { test: 'Chemistry Quiz', score: '85/100', percentage: '85%', date: '1 week ago', grade: 'A' },
];

export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your learning progress today.</p>
      </div>

      {/* Today's Tasks */}
      <Card className="border-l-4 border-l-orange-600">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            What You Need to Do Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todayTasks.map((task, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <task.icon className="h-5 w-5 text-orange-600" />
                  <Badge variant={task.status === 'upcoming' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                <p className="text-xs text-muted-foreground">{task.time}</p>
                <Button size="sm" className="w-full mt-3">
                  {task.type === 'class' ? 'Join Class' : task.type === 'test' ? 'Start Test' : 'Submit'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Live Classes</CardTitle>
            <Video className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{classItem.subject}</h4>
                      <p className="text-xs text-muted-foreground">{classItem.topic}</p>
                    </div>
                    {classItem.status === 'live' && (
                      <Badge className="bg-red-600">
                        <div className="h-2 w-2 bg-white rounded-full mr-1 animate-pulse" />
                        Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{classItem.teacher}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600">{classItem.time}</span>
                    <Button size="sm" variant={classItem.status === 'live' ? 'default' : 'outline'}>
                      {classItem.status === 'live' ? 'Join Now' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Materials */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Latest Study Materials</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMaterials.map((material, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{material.title}</h4>
                        {material.isNew && (
                          <Badge variant="secondary" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-blue-600 mt-1">{material.subject}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">By {material.uploadedBy}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{material.date}</span>
                    <Button size="sm" variant="link" className="p-0 h-auto">
                      Download →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold">{result.test}</h4>
                  <p className="text-sm text-muted-foreground">{result.date}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-2xl font-bold text-blue-600">{result.percentage}</p>
                  <p className="text-xs text-muted-foreground">{result.score}</p>
                </div>
                <div className="text-center px-4">
                  <Badge variant={result.grade.startsWith('A') ? 'default' : 'secondary'} className="text-lg">
                    {result.grade}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
