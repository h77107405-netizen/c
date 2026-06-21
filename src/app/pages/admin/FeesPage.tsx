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
import { Search, MoreVertical, Download, Eye, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const feeRecords = [
  { id: '1', student: 'Rahul Sharma', course: 'JEE 2025', batch: 'Batch A', totalFee: 75000, paidAmount: 75000, dueAmount: 0, lastPayment: '2024-06-15', status: 'paid', nextDue: null },
  { id: '2', student: 'Priya Singh', course: 'NEET 2025', batch: 'Batch B', totalFee: 70000, paidAmount: 35000, dueAmount: 35000, lastPayment: '2024-08-01', status: 'partial', nextDue: '2025-01-15' },
  { id: '3', student: 'Amit Kumar', course: 'Class 10', batch: 'Batch A', totalFee: 35000, paidAmount: 0, dueAmount: 35000, lastPayment: null, status: 'pending', nextDue: '2024-12-31' },
  { id: '4', student: 'Sneha Patel', course: 'JEE 2025', batch: 'Batch A', totalFee: 75000, paidAmount: 25000, dueAmount: 50000, lastPayment: '2024-07-20', status: 'overdue', nextDue: '2024-10-01' },
  { id: '5', student: 'Vikram Singh', course: 'NEET 2025', batch: 'Batch A', totalFee: 70000, paidAmount: 70000, dueAmount: 0, lastPayment: '2024-07-01', status: 'paid', nextDue: null },
  { id: '6', student: 'Meera Sharma', course: 'JEE 2025', batch: 'Batch B', totalFee: 75000, paidAmount: 37500, dueAmount: 37500, lastPayment: '2024-09-10', status: 'partial', nextDue: '2025-02-01' },
  { id: '7', student: 'Ankit Gupta', course: 'Class 10', batch: 'Batch B', totalFee: 35000, paidAmount: 35000, dueAmount: 0, lastPayment: '2024-05-15', status: 'paid', nextDue: null },
  { id: '8', student: 'Kavya Reddy', course: 'NEET 2025', batch: 'Batch C', totalFee: 70000, paidAmount: 10000, dueAmount: 60000, lastPayment: '2024-06-01', status: 'overdue', nextDue: '2024-09-01' },
];

const statusColors: Record<string, string> = {
  paid: 'default',
  partial: 'secondary',
  pending: 'outline',
  overdue: 'destructive',
};

export const FeesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  const filtered = feeRecords.filter(f => {
    const matchSearch = f.student.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchCourse = courseFilter === 'all' || f.course.includes(courseFilter);
    return matchSearch && matchStatus && matchCourse;
  });

  const totalCollected = feeRecords.reduce((sum, r) => sum + r.paidAmount, 0);
  const totalPending = feeRecords.reduce((sum, r) => sum + r.dueAmount, 0);
  const overdueCount = feeRecords.filter(r => r.status === 'overdue').length;
  const paidCount = feeRecords.filter(r => r.status === 'paid').length;

  const fmt = (n: number) => `₹${(n / 1000).toFixed(0)}K`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-muted-foreground mt-2">Track student fee payments, dues, and collection reports</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" /> Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Collected', value: fmt(totalCollected), icon: TrendingUp, color: 'from-green-600 to-green-400', sub: 'This session' },
          { label: 'Total Pending', value: fmt(totalPending), icon: DollarSign, color: 'from-orange-600 to-orange-400', sub: 'Across all students' },
          { label: 'Overdue Students', value: String(overdueCount), icon: AlertCircle, color: 'from-red-600 to-red-400', sub: 'Need follow-up' },
          { label: 'Fully Paid', value: String(paidCount), icon: CheckCircle2, color: 'from-blue-600 to-blue-400', sub: 'Students cleared' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
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
        <CardHeader><CardTitle>Fee Records</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by student name..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="JEE">JEE 2025</SelectItem>
                <SelectItem value="NEET">NEET 2025</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Fee Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course / Batch</TableHead>
                  <TableHead>Total Fee</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(record => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.student}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{record.course}</div>
                        <div className="text-muted-foreground">{record.batch}</div>
                      </div>
                    </TableCell>
                    <TableCell>₹{record.totalFee.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600 font-medium">₹{record.paidAmount.toLocaleString()}</TableCell>
                    <TableCell className={record.dueAmount > 0 ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                      {record.dueAmount > 0 ? `₹${record.dueAmount.toLocaleString()}` : '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.lastPayment ? new Date(record.lastPayment).toLocaleDateString() : 'Not paid'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[record.status] as 'default' | 'secondary' | 'outline' | 'destructive'}>
                        {record.status}
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
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                          <DropdownMenuItem><DollarSign className="mr-2 h-4 w-4" />Record Payment</DropdownMenuItem>
                          <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download Receipt</DropdownMenuItem>
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
