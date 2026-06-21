import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../../components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../../components/ui/table';
import { Users, Calendar, Search, BookOpen, TrendingUp, Eye } from 'lucide-react';

const myBatches = [
  {
    id: '1', name: 'JEE 2025 – Batch A', course: 'JEE Main & Advanced 2025', subject: 'Mathematics',
    students: 45, schedule: 'Mon, Wed, Fri — 9:00 AM', room: 'Room 101', avgScore: '78%',
    completionPct: 65, nextClass: 'Today, 9:00 AM', status: 'active',
    studentList: [
      { name: 'Rahul Sharma', email: 'rahul@example.com', avgScore: '82%', attendance: '92%' },
      { name: 'Priya Singh', email: 'priya@example.com', avgScore: '75%', attendance: '88%' },
      { name: 'Amit Kumar', email: 'amit@example.com', avgScore: '68%', attendance: '76%' },
      { name: 'Sneha Patel', email: 'sneha@example.com', avgScore: '91%', attendance: '95%' },
    ],
  },
  {
    id: '2', name: 'JEE 2025 – Batch B', course: 'JEE Main & Advanced 2025', subject: 'Mathematics',
    students: 38, schedule: 'Tue, Thu, Sat — 9:00 AM', room: 'Room 102', avgScore: '72%',
    completionPct: 60, nextClass: 'Tomorrow, 9:00 AM', status: 'active',
    studentList: [
      { name: 'Vikram Singh', email: 'vikram@example.com', avgScore: '79%', attendance: '90%' },
      { name: 'Meera Sharma', email: 'meera@example.com', avgScore: '65%', attendance: '82%' },
    ],
  },
  {
    id: '3', name: 'Class 10 – Batch A', course: 'Class 10 Board Excellence', subject: 'Mathematics',
    students: 35, schedule: 'Mon to Fri — 2:00 PM', room: 'Room 301', avgScore: '80%',
    completionPct: 80, nextClass: 'Today, 2:00 PM', status: 'active',
    studentList: [
      { name: 'Ankit Gupta', email: 'ankit@example.com', avgScore: '88%', attendance: '96%' },
      { name: 'Kavya Reddy', email: 'kavya@example.com', avgScore: '72%', attendance: '85%' },
    ],
  },
];

export const MyBatchesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<typeof myBatches[0] | null>(null);

  const filtered = myBatches.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Batches</h1>
        <p className="text-muted-foreground mt-2">Manage your assigned batches and student progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Batches', value: String(myBatches.length), icon: BookOpen, color: 'from-blue-600 to-blue-400' },
          { label: 'Total Students', value: String(myBatches.reduce((s, b) => s + b.students, 0)), icon: Users, color: 'from-green-600 to-green-400' },
          { label: 'Avg. Class Score', value: '76%', icon: TrendingUp, color: 'from-purple-600 to-purple-400' },
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

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search batches..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(batch => (
          <Card key={batch.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{batch.name}</CardTitle>
                <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}>{batch.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{batch.course}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{batch.students} students</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{batch.room}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Course Completion</span>
                  <span className="font-medium">{batch.completionPct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${batch.completionPct}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-green-600">{batch.avgScore}</p>
                  <p className="text-xs text-muted-foreground">Avg. Score</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="font-bold text-blue-600 text-xs">{batch.nextClass}</p>
                  <p className="text-xs text-muted-foreground">Next Class</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground bg-gray-50 rounded-lg px-3 py-2">
                📅 {batch.schedule}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedBatch(batch)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Students
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student List Dialog */}
      <Dialog open={!!selectedBatch} onOpenChange={() => setSelectedBatch(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBatch?.name} – Students</DialogTitle>
          </DialogHeader>
          <div className="border rounded-lg overflow-hidden mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Avg. Score</TableHead>
                  <TableHead>Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedBatch?.studentList.map((s, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{s.email}</TableCell>
                    <TableCell>
                      <Badge variant={parseFloat(s.avgScore) >= 75 ? 'default' : 'secondary'}>{s.avgScore}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={parseFloat(s.attendance) >= 85 ? 'default' : 'destructive'}>{s.attendance}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
