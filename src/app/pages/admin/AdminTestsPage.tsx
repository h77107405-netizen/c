import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../../components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Search, MoreVertical, Eye, Trash2, ClipboardList, CheckCircle2, Clock, Users } from 'lucide-react';

const tests = [
  { id: '1', name: 'Mathematics – Unit Test 3', batch: 'JEE 2025 – A', subject: 'Mathematics', teacher: 'Prof. Arvind Sharma', totalMarks: 100, duration: '90 min', submissions: 43, total: 45, scheduledDate: '2024-12-20', status: 'completed' },
  { id: '2', name: 'Physics – Chapter Test 2', batch: 'JEE 2025 – A', subject: 'Physics', teacher: 'Dr. Rajesh Verma', totalMarks: 80, duration: '60 min', submissions: 38, total: 45, scheduledDate: '2024-12-22', status: 'upcoming' },
  { id: '3', name: 'NEET Mock Test 5', batch: 'NEET 2025 – A', subject: 'All Subjects', teacher: 'Prof. Seema Gupta', totalMarks: 720, duration: '180 min', submissions: 40, total: 42, scheduledDate: '2024-12-18', status: 'completed' },
  { id: '4', name: 'Chemistry – Organic Quiz', batch: 'NEET 2025 – B', subject: 'Chemistry', teacher: 'Prof. Seema Gupta', totalMarks: 50, duration: '40 min', submissions: 0, total: 40, scheduledDate: '2024-12-25', status: 'scheduled' },
  { id: '5', name: 'Class 10 – Science Mid-Term', batch: 'Class 10 – A', subject: 'Science', teacher: 'Mr. Deepak Kumar', totalMarks: 100, duration: '120 min', submissions: 35, total: 35, scheduledDate: '2024-12-10', status: 'completed' },
  { id: '6', name: 'JEE Full Mock Test 2', batch: 'JEE 2025 – B', subject: 'All Subjects', teacher: 'Dr. Rajesh Verma', totalMarks: 300, duration: '180 min', submissions: 0, total: 38, scheduledDate: '2024-12-28', status: 'scheduled' },
];

const statusVariant: Record<string, string> = {
  completed: 'default',
  upcoming: 'secondary',
  scheduled: 'outline',
  live: 'destructive',
};

export const AdminTestsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');

  const filtered = tests.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.teacher.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchBatch = batchFilter === 'all' || t.batch.includes(batchFilter);
    return matchSearch && matchStatus && matchBatch;
  });

  const completedCount = tests.filter(t => t.status === 'completed').length;
  const scheduledCount = tests.filter(t => t.status === 'scheduled' || t.status === 'upcoming').length;
  const totalSubmissions = tests.reduce((s, t) => s + t.submissions, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tests Management</h1>
        <p className="text-muted-foreground mt-2">Overview of all tests created across all batches</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tests', value: String(tests.length), icon: ClipboardList, color: 'from-blue-600 to-blue-400' },
          { label: 'Completed', value: String(completedCount), icon: CheckCircle2, color: 'from-green-600 to-green-400' },
          { label: 'Upcoming / Scheduled', value: String(scheduledCount), icon: Clock, color: 'from-orange-600 to-orange-400' },
          { label: 'Total Submissions', value: String(totalSubmissions), icon: Users, color: 'from-purple-600 to-purple-400' },
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

      <Card>
        <CardHeader><CardTitle>All Tests</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by test name or teacher..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={batchFilter} onValueChange={setBatchFilter}>
              <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by batch" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="JEE 2025">JEE 2025</SelectItem>
                <SelectItem value="NEET 2025">NEET 2025</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Batch / Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(test => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{test.batch}</div>
                        <div className="text-muted-foreground">{test.subject}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{test.teacher}</TableCell>
                    <TableCell>{test.totalMarks}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{test.duration}</TableCell>
                    <TableCell>
                      <span className="font-medium">{test.submissions}</span>
                      <span className="text-muted-foreground">/{test.total}</span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(test.scheduledDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[test.status] as 'default' | 'secondary' | 'outline' | 'destructive'}>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Results</DropdownMenuItem>
                          <DropdownMenuItem><ClipboardList className="mr-2 h-4 w-4" />View Questions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
