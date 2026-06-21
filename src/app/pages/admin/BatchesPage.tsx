import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../../components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Plus, Search, MoreVertical, Edit, Trash2, Users, Eye, Calendar } from 'lucide-react';

const batches = [
  { id: '1', name: 'JEE 2025 - Batch A', course: 'JEE Main & Advanced 2025', teacher: 'Prof. Arvind Sharma', students: 45, capacity: 50, schedule: 'Mon, Wed, Fri — 9:00 AM', startDate: '2024-06-01', endDate: '2025-05-31', status: 'active', room: 'Room 101' },
  { id: '2', name: 'JEE 2025 - Batch B', course: 'JEE Main & Advanced 2025', teacher: 'Dr. Rajesh Verma', students: 38, capacity: 50, schedule: 'Tue, Thu, Sat — 9:00 AM', startDate: '2024-06-01', endDate: '2025-05-31', status: 'active', room: 'Room 102' },
  { id: '3', name: 'NEET 2025 - Batch A', course: 'NEET 2025 Preparation', teacher: 'Prof. Seema Gupta', students: 42, capacity: 45, schedule: 'Mon, Wed, Fri — 11:00 AM', startDate: '2024-07-01', endDate: '2025-05-31', status: 'active', room: 'Room 201' },
  { id: '4', name: 'NEET 2025 - Batch B', course: 'NEET 2025 Preparation', teacher: 'Dr. Manish Patel', students: 40, capacity: 45, schedule: 'Tue, Thu, Sat — 11:00 AM', startDate: '2024-07-01', endDate: '2025-05-31', status: 'active', room: 'Room 202' },
  { id: '5', name: 'Class 10 - Batch A', course: 'Class 10 Board Excellence', teacher: 'Mr. Deepak Kumar', students: 35, capacity: 40, schedule: 'Mon to Fri — 2:00 PM', startDate: '2024-04-01', endDate: '2025-03-31', status: 'active', room: 'Room 301' },
  { id: '6', name: 'Class 10 - Batch B', course: 'Class 10 Board Excellence', teacher: 'Prof. Anita Joshi', students: 28, capacity: 40, schedule: 'Mon to Fri — 4:00 PM', startDate: '2024-04-01', endDate: '2025-03-31', status: 'active', room: 'Room 302' },
  { id: '7', name: 'JEE Crash - Batch A', course: 'JEE Crash Course 2025', teacher: 'Prof. Arvind Sharma', students: 22, capacity: 30, schedule: 'Daily — 8:00 AM', startDate: '2025-02-01', endDate: '2025-04-30', status: 'upcoming', room: 'Room 103' },
];

export const BatchesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);

  const filtered = batches.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCourse = courseFilter === 'all' || b.course.includes(courseFilter);
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchCourse && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
          <p className="text-muted-foreground mt-2">Manage all batches, schedules, and student allocations</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-600 to-amber-500">
              <Plus className="h-4 w-4 mr-2" /> Create Batch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Batch Name</Label>
                  <Input placeholder="e.g. JEE 2026 - Batch A" />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee">JEE 2025</SelectItem>
                      <SelectItem value="neet">NEET 2025</SelectItem>
                      <SelectItem value="cl10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Teacher</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Assign teacher" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t1">Prof. Arvind Sharma</SelectItem>
                      <SelectItem value="t2">Dr. Rajesh Verma</SelectItem>
                      <SelectItem value="t3">Prof. Seema Gupta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input placeholder="e.g. 45" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Room</Label>
                  <Input placeholder="e.g. Room 101" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Schedule</Label>
                  <Input placeholder="e.g. Mon, Wed, Fri — 9:00 AM" />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-orange-600 to-amber-500" onClick={() => setAddOpen(false)}>Create Batch</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Batches', value: '18', color: 'text-gray-900' },
          { label: 'Active Batches', value: '16', color: 'text-green-600' },
          { label: 'Upcoming', value: '2', color: 'text-blue-600' },
          { label: 'Total Seats Filled', value: '250/360', color: 'text-orange-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <h3 className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>All Batches</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by batch name or teacher..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(batch => (
                  <TableRow key={batch.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{batch.name}</p>
                        <p className="text-xs text-muted-foreground">{batch.room}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{batch.course}</span>
                    </TableCell>
                    <TableCell>{batch.teacher}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{batch.students}</span>
                        <span className="text-muted-foreground text-sm">/ {batch.capacity}</span>
                      </div>
                      <div className="mt-1 w-24 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(batch.students / batch.capacity) * 100}%` }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{batch.schedule}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={batch.status === 'active' ? 'default' : batch.status === 'upcoming' ? 'secondary' : 'outline'}>
                        {batch.status}
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
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Students</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit Batch</DropdownMenuItem>
                          <DropdownMenuItem><Users className="mr-2 h-4 w-4" />Manage Students</DropdownMenuItem>
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
