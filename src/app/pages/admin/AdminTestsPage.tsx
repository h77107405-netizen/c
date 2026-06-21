import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Loader2, RefreshCw, ClipboardList, Search, X } from 'lucide-react';
import { api } from '../../lib/api';
import { TablePagination } from '../../components/shared/TablePagination';

const DEFAULT_LIMIT = 20;

export const AdminTestsPage: React.FC = () => {
  const [tests, setTests] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: DEFAULT_LIMIT, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const searchDebounce = useRef<ReturnType<typeof setTimeout>>();

  const load = useCallback((p = page, s = search, st = statusFilter) => {
    setLoading(true);
    api.admin.getTests({ page: p, limit: DEFAULT_LIMIT, search: s || undefined, status: st || undefined })
      .then((r) => {
        if (r.success) {
          setTests(r.data);
          setPagination(r.pagination);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, search, statusFilter]);

  useEffect(() => { load(); }, [page, statusFilter]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      setPage(1);
      load(1, val, statusFilter);
    }, 400);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val === 'all' ? '' : val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tests Overview</h1>
          <p className="text-muted-foreground mt-2">View all tests across all batches · {pagination.total} total</p>
        </div>
        <Button variant="outline" onClick={() => load()}><RefreshCw className="h-4 w-4" /></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Tests</p><h3 className="text-3xl font-bold mt-2">{pagination.total}</h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Published</p><h3 className="text-3xl font-bold mt-2 text-green-600">{tests.filter(t => t.status === 'published').length} <span className="text-sm font-normal text-muted-foreground">this page</span></h3></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Draft</p><h3 className="text-3xl font-bold mt-2 text-yellow-600">{tests.filter(t => t.status === 'draft').length} <span className="text-sm font-normal text-muted-foreground">this page</span></h3></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              All Tests
            </CardTitle>
            <div className="flex gap-3 flex-wrap">
              <Select value={statusFilter || 'all'} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tests..."
                  className="pl-9 pr-8 w-52"
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                {search && (
                  <button onClick={() => { setSearch(''); setPage(1); load(1, '', statusFilter); }} className="absolute right-2 top-2.5 text-muted-foreground hover:text-gray-900">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tests.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.title}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{t.teacherName || '—'}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{t.courseName || '—'}</TableCell>
                        <TableCell>{t.totalMarks}</TableCell>
                        <TableCell>{t.duration ? `${t.duration} min` : '—'}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {t.startDate ? new Date(t.startDate).toLocaleDateString() : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={t.status === 'published' ? 'default' : t.status === 'closed' ? 'destructive' : 'secondary'}>
                            {t.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {tests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          {search || statusFilter ? 'No tests match your filters' : 'No tests created yet'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                pagination={pagination}
                onPageChange={(p) => { setPage(p); load(p, search, statusFilter); }}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
