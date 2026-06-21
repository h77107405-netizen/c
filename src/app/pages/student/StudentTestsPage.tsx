import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Loader2, ClipboardList } from 'lucide-react';
import { api } from '../../lib/api';

export const StudentTestsPage: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.student.getTests().then((r) => { if (r.success) setTests(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tests & Assessments</h1>
        <p className="text-muted-foreground mt-2">View all tests scheduled for your batches</p>
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Test Title</TableHead><TableHead>Total Marks</TableHead><TableHead>Duration</TableHead><TableHead>Scheduled</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell>{t.totalMarks}</TableCell>
                  <TableCell>{t.duration ? t.duration + ' min' : '—'}</TableCell>
                  <TableCell className="text-sm">{t.scheduledAt ? new Date(t.scheduledAt).toLocaleString() : '—'}</TableCell>
                  <TableCell><Badge variant={t.status === 'published' ? 'default' : 'secondary'}>{t.status}</Badge></TableCell>
                </TableRow>
              ))}
              {tests.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No tests scheduled yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
