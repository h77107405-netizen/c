import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, UsersRound, GraduationCap, Calendar, DollarSign, FileText, ClipboardList, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '1,234', change: '+12%', icon: Users, color: 'from-blue-600 to-blue-400' },
  { name: 'Total Teachers', value: '48', change: '+3%', icon: UsersRound, color: 'from-green-600 to-green-400' },
  { name: 'Active Courses', value: '24', change: '+2', icon: GraduationCap, color: 'from-purple-600 to-purple-400' },
  { name: 'Active Batches', value: '42', change: '+5', icon: Calendar, color: 'from-orange-600 to-orange-400' },
  { name: 'Pending Fees', value: '₹2.4L', change: '-8%', icon: DollarSign, color: 'from-red-600 to-red-400' },
  { name: 'Study Materials', value: '456', change: '+28', icon: FileText, color: 'from-teal-600 to-teal-400' },
  { name: 'Tests Created', value: '89', change: '+12', icon: ClipboardList, color: 'from-indigo-600 to-indigo-400' },
  { name: 'Revenue (Month)', value: '₹12.5L', change: '+15%', icon: TrendingUp, color: 'from-pink-600 to-pink-400' },
];

const recentActivities = [
  { action: 'New student registered', user: 'Rahul Sharma', time: '5 minutes ago' },
  { action: 'Test created', user: 'Prof. Gupta', time: '1 hour ago' },
  { action: 'Payment received', user: 'Priya Singh', time: '2 hours ago' },
  { action: 'Material uploaded', user: 'Dr. Verma', time: '3 hours ago' },
  { action: 'New batch created', user: 'Admin', time: '5 hours ago' },
];

const upcomingClasses = [
  { subject: 'Mathematics', teacher: 'Prof. Sharma', batch: 'JEE 2025 - Batch A', time: 'Today, 10:00 AM' },
  { subject: 'Physics', teacher: 'Dr. Verma', batch: 'NEET 2025 - Batch B', time: 'Today, 2:00 PM' },
  { subject: 'Chemistry', teacher: 'Prof. Gupta', batch: 'JEE 2025 - Batch C', time: 'Tomorrow, 9:00 AM' },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
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
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Live Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{classItem.subject}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                  <p className="text-sm text-muted-foreground">{classItem.batch}</p>
                  <p className="text-xs text-blue-600 mt-2">{classItem.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
