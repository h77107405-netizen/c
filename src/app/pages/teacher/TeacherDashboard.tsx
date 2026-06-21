import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Calendar, FileText, ClipboardList, MessageCircle, Users, Video, Upload, Plus } from 'lucide-react';

const stats = [
  { name: 'My Batches', value: '5', icon: Users, color: 'from-blue-600 to-blue-400' },
  { name: 'Materials Uploaded', value: '42', icon: FileText, color: 'from-green-600 to-green-400' },
  { name: 'Tests Created', value: '18', icon: ClipboardList, color: 'from-purple-600 to-purple-400' },
  { name: 'Pending Doubts', value: '7', icon: MessageCircle, color: 'from-orange-600 to-orange-400' },
];

const upcomingClasses = [
  { subject: 'Mathematics - Calculus', batch: 'JEE 2025 - Batch A', time: 'Today, 10:00 AM', meetingLink: '#' },
  { subject: 'Physics - Mechanics', batch: 'JEE 2025 - Batch A', time: 'Today, 2:00 PM', meetingLink: '#' },
  { subject: 'Mathematics - Algebra', batch: 'JEE 2025 - Batch B', time: 'Tomorrow, 9:00 AM', meetingLink: '#' },
];

const recentTests = [
  { name: 'Calculus - Unit Test 1', batch: 'JEE Batch A', submissions: 28, total: 30, date: '2 days ago' },
  { name: 'Mechanics Quiz', batch: 'JEE Batch B', submissions: 25, total: 32, date: '3 days ago' },
  { name: 'Algebra Test', batch: 'JEE Batch C', submissions: 20, total: 28, date: '5 days ago' },
];

const pendingDoubts = [
  { student: 'Rahul Sharma', subject: 'Mathematics', question: 'How to solve integration by parts?', time: '2 hours ago' },
  { student: 'Priya Singh', subject: 'Physics', question: "What's Newton's third law application?", time: '5 hours ago' },
  { student: 'Amit Kumar', subject: 'Mathematics', question: 'Trigonometry identity doubt', time: '1 day ago' },
];

export const TeacherDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your classes and student progress</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-green-600 to-teal-600">
            <Upload className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Test
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
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
            <CardTitle>Today's Classes</CardTitle>
            <Video className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{classItem.subject}</h4>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{classItem.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{classItem.batch}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Doubts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Doubts</CardTitle>
            <MessageCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingDoubts.map((doubt, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{doubt.student}</h4>
                      <p className="text-xs text-blue-600">{doubt.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{doubt.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{doubt.question}</p>
                  <Button size="sm" variant="link" className="mt-2 p-0 h-auto">
                    Reply →
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTests.map((test, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold">{test.name}</h4>
                  <p className="text-sm text-muted-foreground">{test.batch}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {test.submissions}/{test.total} submitted
                  </p>
                  <p className="text-xs text-muted-foreground">{test.date}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-4">
                  View Results
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
