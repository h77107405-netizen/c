import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../../components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '../../components/ui/dialog';
import { Upload, Search, Trash2, Download, FileText, Video, Image, File } from 'lucide-react';

const myMaterials = [
  { id: '1', title: 'Calculus – Integration by Parts Notes', batch: 'JEE 2025 – A', subject: 'Mathematics', chapter: 'Chapter 5', type: 'pdf', size: '2.4 MB', date: '2024-12-18', downloads: 42 },
  { id: '2', title: 'Algebra Formula Sheet', batch: 'JEE 2025 – B', subject: 'Mathematics', chapter: 'Chapter 1', type: 'pdf', size: '1.0 MB', date: '2024-12-16', downloads: 38 },
  { id: '3', title: 'Limits & Continuity – Video Lecture', batch: 'JEE 2025 – A', subject: 'Mathematics', chapter: 'Chapter 4', type: 'video', size: '320 MB', date: '2024-12-14', downloads: 30 },
  { id: '4', title: 'Trigonometry Practice Sheet', batch: 'Class 10 – A', subject: 'Mathematics', chapter: 'Chapter 8', type: 'pdf', size: '0.8 MB', date: '2024-12-12', downloads: 55 },
  { id: '5', title: 'Coordinate Geometry Diagrams', batch: 'Class 10 – A', subject: 'Mathematics', chapter: 'Chapter 7', type: 'image', size: '1.5 MB', date: '2024-12-10', downloads: 28 },
];

const typeIcon: Record<string, React.ElementType> = { pdf: FileText, video: Video, image: Image };
const typeColor: Record<string, string> = { pdf: 'text-red-600', video: 'text-blue-600', image: 'text-green-600' };

export const TeacherMaterialsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: '', batch: '', subject: '', chapter: '' });

  const filtered = myMaterials.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchBatch = batchFilter === 'all' || m.batch === batchFilter;
    return matchSearch && matchBatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-muted-foreground mt-2">Upload and manage study materials for your batches</p>
        </div>
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-teal-600">
              <Upload className="h-4 w-4 mr-2" /> Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Study Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="e.g. Calculus – Integration Notes" value={uploadForm.title} onChange={e => setUploadForm({...uploadForm, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Batch</Label>
                  <Select value={uploadForm.batch} onValueChange={v => setUploadForm({...uploadForm, batch: v})}>
                    <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee-a">JEE 2025 – A</SelectItem>
                      <SelectItem value="jee-b">JEE 2025 – B</SelectItem>
                      <SelectItem value="cl10-a">Class 10 – A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="e.g. Mathematics" value={uploadForm.subject} onChange={e => setUploadForm({...uploadForm, subject: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Chapter</Label>
                  <Input placeholder="e.g. Chapter 5" value={uploadForm.chapter} onChange={e => setUploadForm({...uploadForm, chapter: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>File Type</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground cursor-pointer hover:border-blue-400 hover:text-blue-600 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to select file or drag & drop</p>
                  <p className="text-xs mt-1">PDF, MP4, JPG, PNG – Max 500 MB</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600" onClick={() => setUploadOpen(false)}>Upload</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Uploads', value: String(myMaterials.length), color: 'text-gray-900' },
          { label: 'PDFs', value: String(myMaterials.filter(m => m.type === 'pdf').length), color: 'text-red-600' },
          { label: 'Videos', value: String(myMaterials.filter(m => m.type === 'video').length), color: 'text-blue-600' },
          { label: 'Total Downloads', value: String(myMaterials.reduce((s, m) => s + m.downloads, 0)), color: 'text-green-600' },
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
        <CardHeader><CardTitle>My Uploaded Materials</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search materials..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={batchFilter} onValueChange={setBatchFilter}>
              <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Filter by batch" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="JEE 2025 – A">JEE 2025 – A</SelectItem>
                <SelectItem value="JEE 2025 – B">JEE 2025 – B</SelectItem>
                <SelectItem value="Class 10 – A">Class 10 – A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Chapter</TableHead>
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
                      <TableCell className="text-sm text-muted-foreground">{mat.batch}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{mat.chapter}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{mat.size}</TableCell>
                      <TableCell><span className="font-medium">{mat.downloads}</span></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{new Date(mat.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>
                        </div>
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
