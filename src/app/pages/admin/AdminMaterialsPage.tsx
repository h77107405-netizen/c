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
import { Search, MoreVertical, Download, Trash2, Eye, FileText, Video, Image, File } from 'lucide-react';

const materials = [
  { id: '1', title: 'Calculus – Integration by Parts', subject: 'Mathematics', chapter: 'Chapter 5', type: 'pdf', teacher: 'Prof. Arvind Sharma', batch: 'JEE 2025 – A', size: '2.4 MB', uploadedAt: '2024-12-18', downloads: 42 },
  { id: '2', title: 'Newton\'s Laws – Video Lecture', subject: 'Physics', chapter: 'Chapter 3', type: 'video', teacher: 'Dr. Rajesh Verma', batch: 'JEE 2025 – A', size: '450 MB', uploadedAt: '2024-12-17', downloads: 38 },
  { id: '3', title: 'Organic Chemistry Reactions', subject: 'Chemistry', chapter: 'Chapter 8', type: 'pdf', teacher: 'Prof. Seema Gupta', batch: 'NEET 2025 – A', size: '5.1 MB', uploadedAt: '2024-12-17', downloads: 55 },
  { id: '4', title: 'Periodic Table Reference', subject: 'Chemistry', chapter: 'Chapter 2', type: 'image', teacher: 'Prof. Seema Gupta', batch: 'NEET 2025 – B', size: '1.2 MB', uploadedAt: '2024-12-16', downloads: 90 },
  { id: '5', title: 'Cell Biology Diagrams', subject: 'Biology', chapter: 'Chapter 6', type: 'pdf', teacher: 'Dr. Manish Patel', batch: 'NEET 2025 – A', size: '3.8 MB', uploadedAt: '2024-12-15', downloads: 33 },
  { id: '6', title: 'Algebra Formula Sheet', subject: 'Mathematics', chapter: 'Chapter 1', type: 'pdf', teacher: 'Mr. Deepak Kumar', batch: 'Class 10 – A', size: '1.0 MB', uploadedAt: '2024-12-14', downloads: 68 },
  { id: '7', title: 'Mechanics Problem Set', subject: 'Physics', chapter: 'Chapter 4', type: 'pdf', teacher: 'Dr. Rajesh Verma', batch: 'JEE 2025 – B', size: '0.8 MB', uploadedAt: '2024-12-13', downloads: 27 },
];

const typeIcon: Record<string, React.ElementType> = { pdf: FileText, video: Video, image: Image };
const typeColor: Record<string, string> = { pdf: 'text-red-600', video: 'text-blue-600', image: 'text-green-600' };

export const AdminMaterialsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filtered = materials.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.teacher.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || m.type === typeFilter;
    const matchSubject = subjectFilter === 'all' || m.subject === subjectFilter;
    return matchSearch && matchType && matchSubject;
  });

  const totalSize = '24.8 GB';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
        <p className="text-muted-foreground mt-2">View and manage all uploaded study materials across all batches</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Files', value: '456', color: 'text-gray-900' },
          { label: 'PDFs', value: '280', color: 'text-red-600' },
          { label: 'Videos', value: '124', color: 'text-blue-600' },
          { label: 'Storage Used', value: totalSize, color: 'text-purple-600' },
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
        <CardHeader><CardTitle>All Materials</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by title or teacher..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full md:w-[170px]"><SelectValue placeholder="Subject" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[140px]"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject / Chapter</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(mat => {
                  const Icon = typeIcon[mat.type] || File;
                  return (
                    <TableRow key={mat.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Icon className={`h-5 w-5 ${typeColor[mat.type]}`} />
                          <div>
                            <p className="font-medium text-sm">{mat.title}</p>
                            <Badge variant="outline" className="text-xs mt-0.5">{mat.type.toUpperCase()}</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{mat.subject}</div>
                          <div className="text-muted-foreground">{mat.chapter}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{mat.teacher}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{mat.batch}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{mat.size}</TableCell>
                      <TableCell>
                        <span className="font-medium">{mat.downloads}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(mat.uploadedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />Preview</DropdownMenuItem>
                            <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
