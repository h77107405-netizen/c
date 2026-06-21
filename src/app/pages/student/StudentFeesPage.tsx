import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Loader2, IndianRupee } from 'lucide-react';
import { api } from '../../lib/api';

export const StudentFeesPage: React.FC = () => {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.student.getFees().then((r) => { if (r.success) setFees(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const totalDue = fees.filter(f => f.status !== 'paid').reduce((s, f) => s + (Number(f.amount) - Number(f.paidAmount || 0)), 0);
  const totalPaid = fees.reduce((s, f) => s + Number(f.paidAmount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Fees</h1>
        <p className="text-muted-foreground mt-2">Track your fee payments</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-3"><div className="p-3 bg-green-100 rounded-xl"><IndianRupee className="h-5 w-5 text-green-600" /></div><div><p className="text-sm text-muted-foreground">Total Paid</p><h3 className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString('en-IN')}</h3></div></div></CardContent></Card>
        <Card className={totalDue > 0 ? 'border-red-200' : ''}><CardContent className="p-6"><div className="flex items-center gap-3"><div className="p-3 bg-red-100 rounded-xl"><IndianRupee className="h-5 w-5 text-red-600" /></div><div><p className="text-sm text-muted-foreground">Amount Due</p><h3 className={'text-2xl font-bold ' + (totalDue > 0 ? 'text-red-600' : 'text-green-600')}>₹{totalDue.toLocaleString('en-IN')}</h3></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3"><div className="p-3 bg-blue-100 rounded-xl"><IndianRupee className="h-5 w-5 text-blue-600" /></div><div><p className="text-sm text-muted-foreground">Total Records</p><h3 className="text-2xl font-bold">{fees.length}</h3></div></div></CardContent></Card>
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Description</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Paid</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.description || 'Fee'}</TableCell>
                  <TableCell className="capitalize">{f.feeType}</TableCell>
                  <TableCell>₹{Number(f.amount).toLocaleString('en-IN')}</TableCell>
                  <TableCell>₹{Number(f.paidAmount || 0).toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '—'}</TableCell>
                  <TableCell><Badge variant={f.status === 'paid' ? 'default' : f.status === 'overdue' ? 'destructive' : 'secondary'}>{f.status}</Badge></TableCell>
                </TableRow>
              ))}
              {fees.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No fee records found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
