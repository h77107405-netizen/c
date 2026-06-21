import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Plus, Loader2, RefreshCw, IndianRupee, CheckCircle } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const FeesPage: React.FC = () => {
  const [fees, setFees] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [payOpen, setPayOpen] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ studentId: '', amount: '', dueDate: '', description: '', feeType: 'tuition' });
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('cash');

  const load = () => {
    setLoading(true);
    Promise.all([api.admin.getFees(), api.admin.getStudents()]).then(([f, s]) => {
      if (f.success) setFees(f.data);
      if (s.success) setStudents(s.data);
    }).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleAddFee = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.createFee(form);
      toast.success('Fee record created');
      setAddOpen(false);
      setForm({ studentId: '', amount: '', dueDate: '', description: '', feeType: 'tuition' });
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const handleRecordPayment = async (feeId: string) => {
    setSaving(true);
    try {
      await api.admin.recordPayment(feeId, { amount: payAmount, paymentMethod: payMethod });
      toast.success('Payment recorded');
      setPayOpen(null);
      setPayAmount('');
      load();
    } catch (err: any) { toast.error(err.message); } finally { setSaving(false); }
  };

  const totalOutstanding = fees.filter(f => f.status !== 'paid').reduce((s, f) => s + (Number(f.amount) - Number(f.paidAmount || 0)), 0);
  const totalCollected = fees.reduce((s, f) => s + Number(f.paidAmount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fees Management</h1>
          <p className="text-muted-foreground mt-2">Track fees and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /></Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600"><Plus className="h-4 w-4 mr-2" /> Add Fee</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Fee Record</DialogTitle></DialogHeader>
              <form onSubmit={handleAddFee} className="space-y-4 mt-4">
                <div>
                  <Label>Student *</Label>
                  <Select value={form.studentId} onValueChange={(v) => setForm({...form, studentId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                    <SelectContent>{students.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Amount (₹) *</Label><Input type="number" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} required /></div>
                  <div><Label>Due Date *</Label><Input type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate: e.target.value})} required /></div>
                  <div>
                    <Label>Fee Type</Label>
                    <Select value={form.feeType} onValueChange={(v) => setForm({...form, feeType: v})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuition">Tuition</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} /></div>
                </div>
                <Button type="submit" className="w-full" disabled={saving || !form.studentId}>
                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : 'Create Fee Record'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-3"><div className="p-3 bg-green-100 rounded-xl"><IndianRupee className="h-6 w-6 text-green-600" /></div><div><p className="text-sm text-muted-foreground">Total Collected</p><h3 className="text-2xl font-bold text-green-600">₹{totalCollected.toLocaleString('en-IN')}</h3></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3"><div className="p-3 bg-red-100 rounded-xl"><IndianRupee className="h-6 w-6 text-red-600" /></div><div><p className="text-sm text-muted-foreground">Outstanding</p><h3 className="text-2xl font-bold text-red-600">₹{totalOutstanding.toLocaleString('en-IN')}</h3></div></div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-3"><div className="p-3 bg-blue-100 rounded-xl"><IndianRupee className="h-6 w-6 text-blue-600" /></div><div><p className="text-sm text-muted-foreground">Total Records</p><h3 className="text-2xl font-bold">{fees.length}</h3></div></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Fee Records</CardTitle></CardHeader>
        <CardContent>
          {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></div> : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Student</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Paid</TableHead><TableHead>Due Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell className="font-medium">{f.studentName || '—'}</TableCell>
                      <TableCell className="capitalize">{f.feeType}</TableCell>
                      <TableCell>₹{Number(f.amount).toLocaleString('en-IN')}</TableCell>
                      <TableCell>₹{Number(f.paidAmount || 0).toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '—'}</TableCell>
                      <TableCell>
                        <Badge variant={f.status === 'paid' ? 'default' : f.status === 'overdue' ? 'destructive' : 'secondary'}>
                          {f.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {f.status !== 'paid' && (
                          <Dialog open={payOpen === f.id} onOpenChange={(o) => setPayOpen(o ? f.id : null)}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-green-600"><CheckCircle className="h-3 w-3 mr-1" />Record Payment</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader><DialogTitle>Record Payment for {f.studentName}</DialogTitle></DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div><Label>Amount (₹)</Label><Input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder={String(Number(f.amount) - Number(f.paidAmount || 0))} /></div>
                                <div>
                                  <Label>Payment Method</Label>
                                  <Select value={payMethod} onValueChange={setPayMethod}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="cash">Cash</SelectItem>
                                      <SelectItem value="online">Online Transfer</SelectItem>
                                      <SelectItem value="upi">UPI</SelectItem>
                                      <SelectItem value="cheque">Cheque</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button className="w-full" disabled={saving} onClick={() => handleRecordPayment(f.id)}>
                                  {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Recording...</> : 'Record Payment'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {fees.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No fee records yet</TableCell></TableRow>}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
