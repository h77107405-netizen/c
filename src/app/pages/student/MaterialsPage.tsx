import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { FileText, Download, Eye, Search, Filter, BookOpen, Video, Image as ImageIcon } from 'lucide-react';

// Mock data
const materials = [
  {
    id: '1',
    title: 'Calculus - Chapter 5: Integration',
    subject: 'Mathematics',
    chapter: 'Chapter 5',
    type: 'pdf',
    uploadedBy: 'Prof. Sharma',
    uploadedDate: '2024-06-18',
    size: '2.4 MB',
    downloads: 45,
    isNew: true,
  },
  {
    id: '2',
    title: 'Physics Formula Sheet - Mechanics',
    subject: 'Physics',
    chapter: 'Mechanics',
    type: 'pdf',
    uploadedBy: 'Dr. Verma',
    uploadedDate: '2024-06-19',
    size: '1.8 MB',
    downloads: 62,
    isNew: true,
  },
  {
    id: '3',
    title: 'Organic Chemistry Practice Problems',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    type: 'pdf',
    uploadedBy: 'Prof. Gupta',
    uploadedDate: '2024-06-17',
    size: '3.2 MB',
    downloads: 38,
    isNew: false,
  },
  {
    id: '4',
    title: 'Algebra - Quadratic Equations Notes',
    subject: 'Mathematics',
    chapter: 'Chapter 3',
    type: 'pdf',
    uploadedBy: 'Prof. Sharma',
    uploadedDate: '2024-06-15',
    size: '1.5 MB',
    downloads: 71,
    isNew: false,
  },
  {
    id: '5',
    title: 'Wave Motion - Lecture Recording',
    subject: 'Physics',
    chapter: 'Waves',
    type: 'video',
    uploadedBy: 'Dr. Verma',
    uploadedDate: '2024-06-16',
    size: '124 MB',
    downloads: 29,
    isNew: false,
  },
  {
    id: '6',
    title: 'Chemical Bonding Diagrams',
    subject: 'Chemistry',
    chapter: 'Chemical Bonding',
    type: 'image',
    uploadedBy: 'Prof. Gupta',
    uploadedDate: '2024-06-14',
    size: '890 KB',
    downloads: 54,
    isNew: false,
  },
];

const subjects = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry'];

export const MaterialsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All Subjects' || material.subject === subjectFilter;
    const matchesType = typeFilter === 'all' || material.type === typeFilter;
    return matchesSearch && matchesSubject && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-600" />;
      case 'video':
        return <Video className="h-6 w-6 text-purple-600" />;
      case 'image':
        return <ImageIcon className="h-6 w-6 text-blue-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
        <p className="text-muted-foreground mt-2">Access all your course materials and resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Materials</p>
                <h3 className="text-3xl font-bold mt-2">156</h3>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">PDFs</p>
                <h3 className="text-3xl font-bold mt-2">124</h3>
              </div>
              <FileText className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Videos</p>
                <h3 className="text-3xl font-bold mt-2">18</h3>
              </div>
              <Video className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New This Week</p>
                <h3 className="text-3xl font-bold mt-2 text-green-600">8</h3>
              </div>
              <Badge className="text-xs">New</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={typeFilter} onValueChange={setTypeFilter} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="pdf">PDFs</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="image">Images</TabsTrigger>
            </TabsList>

            <TabsContent value={typeFilter} className="space-y-4">
              {filteredMaterials.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No materials found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.map((material) => (
                    <Card key={material.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-3 bg-gray-100 rounded-lg">
                            {getFileIcon(material.type)}
                          </div>
                          {material.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>

                        <h4 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">
                          {material.title}
                        </h4>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="text-blue-600">{material.subject}</span>
                            <span>{material.size}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <p>{material.chapter}</p>
                            <p>By {material.uploadedBy}</p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{new Date(material.uploadedDate).toLocaleDateString()}</span>
                            <span>{material.downloads} downloads</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-600 to-pink-600">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
