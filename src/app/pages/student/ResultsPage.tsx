import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Loader2 } from 'lucide-react';
import { api } from '../../lib/api';

export const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.student.getResults().then((r) => { if (r.success) setResults(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const avg = results.length ? Math.round(results.reduce((s, r) => s + (Number(r.marksObtained) / Number(r.totalMarks)) * 100, 0) / results.length) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Results</h1>
        <p className="text-muted-foreground mt-2">Your test performance history</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Tests Attempted</p><h3 className="text-3xl font-bold mt-2">{results.length}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Average Score</p><h3 className="text-3xl font-bold mt-2 text-blue-600">{avg}%</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Best Score</p><h3 className="text-3xl font-bold mt-2 text-green-600">{results.length ? Math.max(...results.map(r => Math.round((Number(r.marksObtained) / Number(r.totalMarks)) * 100))) : 0}%</h3></CardContent></Card>
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Test</TableHead><TableHead>Marks</TableHead><TableHead>Percentage</TableHead><TableHead>Grade</TableHead><TableHead>Date</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => {
                const pct = Math.round((Number(r.marksObtained) / Number(r.totalMarks)) * 100);
                const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.testTitle || 'Test'}</TableCell>
                    <TableCell>{r.marksObtained}/{r.totalMarks}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: pct + '%'}} /></div>
                        <span className="text-sm">{pct}%</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant={pct >= 70 ? 'default' : 'secondary'}>{grade}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—'}</TableCell>
                  </TableRow>
                );
              })}
              {results.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No results yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
