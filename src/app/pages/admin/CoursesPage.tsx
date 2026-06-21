import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Plus, Search, Edit, Trash2, BookOpen, Users, ClipboardList, GraduationCap } from 'lucide-react';

const courses = [
  { id: '1', name: 'JEE Main & Advanced 2025', code: 'JEE-2025', subjects: ['Mathematics', 'Physics', 'Chemistry'], duration: '12 months', totalBatches: 4, totalStudents: 480, fee: '₹75,000', status: 'active', description: 'Comprehensive preparation for JEE Main and Advanced examinations.' },
  { id: '2', name: 'NEET 2025 Preparation', code: 'NEET-2025', subjects: ['Biology', 'Physics', 'Chemistry'], duration: '12 months', totalBatches: 3, totalStudents: 360, fee: '₹70,000', status: 'active', description: 'Complete NEET preparation covering all medical entrance topics.' },
  { id: '3', name: 'Class 10 Board Excellence', code: 'CL10-2025', subjects: ['Mathematics', 'Science', 'English', 'Social Science'], duration: '8 months', totalBatches: 5, totalStudents: 250, fee: '₹35,000', status: 'active', description: 'Board exam preparation for Class 10 students.' },
  { id: '4', name: 'Class 12 Board Prep', code: 'CL12-2025', subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'], duration: '8 months', totalBatches: 3, totalStudents: 180, fee: '₹40,000', status: 'active', description: 'Board exam preparation for Class 12 Science stream.' },
  { id: '5', name: 'Foundation Course (Class 8-9)', code: 'FND-2025', subjects: ['Mathematics', 'Science', 'Mental Ability'], duration: '10 months', totalBatches: 2, totalStudents: 120, fee: '₹30,000', status: 'active', description: 'Foundation building for future competitive exam aspirants.' },
  { id: '6', name: 'JEE Crash Course 2025', code: 'JEE-CC-25', subjects: ['Mathematics', 'Physics', 'Chemistry'], duration: '3 months', totalBatches: 1, totalStudents: 45, fee: '₹25,000', status: 'inactive', description: 'Intensive 3-month crash course for JEE aspirants.' },
];

const subjectColors: Record<string, string> = {
  Mathematics: 'bg-blue-100 text-blue-700',
  Physics: 'bg-purple-100 text-purple-700',
  Chemistry: 'bg-green-100 text-green-700',
  Biology: 'bg-red-100 text-red-700',
  English: 'bg-yellow-100 text-yellow-700',
  Science: 'bg-teal-100 text-teal-700',
  'Social Science': 'bg-orange-100 text-orange-700',
  'Mental Ability': 'bg-pink-100 text-pink-700',
};

export const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', duration: '', fee: '', description: '' });

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-muted-foreground mt-2">Create and manage all courses offered by the institute</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
              <Plus className="h-4 w-4 mr-2" /> Create Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Course Name</Label>
                  <Input placeholder="e.g. JEE Main & Advanced 2026" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Course Code</Label>
                  <Input placeholder="e.g. JEE-2026" value={form.code} onChange={e => setForm({...form, code: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input placeholder="e.g. 12 months" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Course Fee</Label>
                  <Input placeholder="e.g. ₹75,000" value={form.fee} onChange={e => setForm({...form, fee: e.target.value})} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Description</Label>
                  <Input placeholder="Brief description of the course" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600" onClick={() => setAddOpen(false)}>Create Course</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: '6', icon: GraduationCap, color: 'from-purple-600 to-purple-400' },
          { label: 'Active Courses', value: '5', icon: BookOpen, color: 'from-green-600 to-green-400' },
          { label: 'Total Batches', value: '18', icon: Users, color: 'from-blue-600 to-blue-400' },
          { label: 'Total Students', value: '1,435', icon: ClipboardList, color: 'from-orange-600 to-orange-400' },
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

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search courses by name or code..." className="pl-10 max-w-md" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(course => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 font-mono text-xs">{course.code}</Badge>
                  <CardTitle className="text-lg leading-snug">{course.name}</CardTitle>
                </div>
                <Badge variant={course.status === 'active' ? 'default' : 'secondary'} className="ml-2 shrink-0">
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{course.description}</p>

              <div className="flex flex-wrap gap-1">
                {course.subjects.map(subj => (
                  <span key={subj} className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColors[subj] || 'bg-gray-100 text-gray-700'}`}>
                    {subj}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-lg font-bold text-blue-600">{course.totalBatches}</p>
                  <p className="text-xs text-muted-foreground">Batches</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-lg font-bold text-green-600">{course.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs font-bold text-purple-600">{course.duration}</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-lg font-bold text-gray-900">{course.fee}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Edit className="h-3 w-3 mr-1" />Edit</Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700"><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
