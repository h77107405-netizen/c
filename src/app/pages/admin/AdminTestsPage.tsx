import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Loader2, RefreshCw, ClipboardList } from 'lucide-react';
import { api } from '../../lib/api';

export const AdminTestsPage: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.admin.getTests().then((r) => { if (r.success) setTests(r.data); }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tests Overview</h1>
          <p className="text-muted-foreground mt-2">View all tests across all batches</p>
        </div>
        <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Tests</p><h3 className="text-3xl font-bold mt-2">{tests.length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Published</p><h3 className="text-3xl font-bold mt-2 text-green-600">{tests.filter(t => t.status === 'published').length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Draft</p><h3 className="text-3xl font-bold mt-2 text-yellow-600">{tests.filter(t => t.status === 'draft').length}</h3></CardContent></Card>
      </div>

      {loading ? (
        <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <Card>
          <CardHeader><CardTitle>All Tests</CardTitle></CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Title</TableHead><TableHead>Batch</TableHead><TableHead>Total Marks</TableHead><TableHead>Duration</TableHead><TableHead>Scheduled</TableHead><TableHead>Status</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {tests.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.title}</TableCell>
                      <TableCell>{t.batchName || '—'}</TableCell>
                      <TableCell>{t.totalMarks}</TableCell>
                      <TableCell>{t.duration ? t.duration + ' min' : '—'}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.scheduledAt ? new Date(t.scheduledAt).toLocaleString() : '—'}</TableCell>
                      <TableCell><Badge variant={t.status === 'published' ? 'default' : 'secondary'}>{t.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                  {tests.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No tests created yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
