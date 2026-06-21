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
import { Plus, Search, MoreVertical, Edit, Trash2, UserCheck, UserX, Eye, UsersRound } from 'lucide-react';

const teachers = [
  { id: '1', name: 'Prof. Arvind Sharma', email: 'arvind@coaching.com', phone: '9876500001', subject: 'Mathematics', batches: ['JEE 2025 - A', 'JEE 2025 - B'], status: 'active', experience: '8 years', joinedDate: '2020-06-15' },
  { id: '2', name: 'Dr. Rajesh Verma', email: 'rajesh@coaching.com', phone: '9876500002', subject: 'Physics', batches: ['JEE 2025 - A', 'NEET 2025 - B'], status: 'active', experience: '12 years', joinedDate: '2018-03-20' },
  { id: '3', name: 'Prof. Seema Gupta', email: 'seema@coaching.com', phone: '9876500003', subject: 'Chemistry', batches: ['NEET 2025 - A'], status: 'active', experience: '6 years', joinedDate: '2021-01-10' },
  { id: '4', name: 'Dr. Manish Patel', email: 'manish@coaching.com', phone: '9876500004', subject: 'Biology', batches: ['NEET 2025 - B', 'NEET 2025 - C'], status: 'active', experience: '10 years', joinedDate: '2019-08-05' },
  { id: '5', name: 'Prof. Anita Joshi', email: 'anita@coaching.com', phone: '9876500005', subject: 'English', batches: ['Class 10 - A'], status: 'inactive', experience: '5 years', joinedDate: '2022-02-14' },
  { id: '6', name: 'Mr. Deepak Kumar', email: 'deepak@coaching.com', phone: '9876500006', subject: 'Mathematics', batches: ['Class 10 - A', 'Class 10 - B'], status: 'active', experience: '4 years', joinedDate: '2023-01-20' },
];

export const TeachersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', experience: '' });

  const filtered = teachers.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSubject = subjectFilter === 'all' || t.subject === subjectFilter;
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchSubject && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-muted-foreground mt-2">Manage all teachers, their subjects and assigned batches</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-teal-600">
              <Plus className="h-4 w-4 mr-2" /> Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Prof. Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="email@coaching.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="10-digit phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="e.g. Mathematics" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Experience</Label>
                  <Input placeholder="e.g. 5 years" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600" onClick={() => setAddOpen(false)}>Add Teacher</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers', value: '48', color: 'text-gray-900' },
          { label: 'Active', value: '44', color: 'text-green-600' },
          { label: 'On Leave', value: '3', color: 'text-orange-600' },
          { label: 'New This Month', value: '2', color: 'text-blue-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
              <h3 className={`text-3xl font-bold mt-2 ${s.color}`}>{s.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or email..." className="pl-10" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Batches</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(teacher => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-teal-400 flex items-center justify-center text-white font-semibold text-sm">
                          {teacher.name.charAt(0)}
                        </div>
                        <span>{teacher.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{teacher.email}</div>
                        <div className="text-muted-foreground">{teacher.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{teacher.subject}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.batches.map(b => (
                          <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{teacher.experience}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === 'active' ? 'default' : 'secondary'}>
                        {teacher.status}
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
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Profile</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem><UsersRound className="mr-2 h-4 w-4" />Assign Batch</DropdownMenuItem>
                          <DropdownMenuItem>
                            {teacher.status === 'active'
                              ? <><UserX className="mr-2 h-4 w-4" />Deactivate</>
                              : <><UserCheck className="mr-2 h-4 w-4" />Activate</>}
                          </DropdownMenuItem>
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
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No teachers found matching your criteria</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
