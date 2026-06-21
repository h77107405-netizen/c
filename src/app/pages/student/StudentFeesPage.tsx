import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { DollarSign, Download, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

const feeDetails = {
  course: 'JEE Main & Advanced 2025',
  batch: 'Batch A',
  totalFee: 75000,
  paidAmount: 50000,
  dueAmount: 25000,
  nextDueDate: '2025-02-01',
  status: 'partial',
};

const paymentHistory = [
  { id: 'RCP-001', amount: 25000, date: '2024-06-15', method: 'UPI', status: 'success', description: 'First Installment' },
  { id: 'RCP-002', amount: 15000, date: '2024-09-01', method: 'Net Banking', status: 'success', description: 'Second Installment' },
  { id: 'RCP-003', amount: 10000, date: '2024-11-15', method: 'UPI', status: 'success', description: 'Third Installment' },
];

const installments = [
  { label: 'First Installment', amount: 25000, dueDate: '2024-06-15', status: 'paid' },
  { label: 'Second Installment', amount: 15000, dueDate: '2024-09-01', status: 'paid' },
  { label: 'Third Installment', amount: 10000, dueDate: '2024-11-15', status: 'paid' },
  { label: 'Fourth Installment', amount: 25000, dueDate: '2025-02-01', status: 'pending' },
];

export const StudentFeesPage: React.FC = () => {
  const paidPercent = Math.round((feeDetails.paidAmount / feeDetails.totalFee) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fees & Payments</h1>
        <p className="text-muted-foreground mt-2">Track your fee payment status and download receipts</p>
      </div>

      {/* Fee Overview */}
      <Card className="border-l-4 border-l-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">{feeDetails.course}</h2>
              <p className="text-muted-foreground text-sm">Batch: {feeDetails.batch}</p>
            </div>
            <Badge
              variant={feeDetails.status === 'paid' ? 'default' : feeDetails.status === 'partial' ? 'secondary' : 'destructive'}
              className="text-sm px-4 py-1"
            >
              {feeDetails.status === 'partial' ? 'Partially Paid' : feeDetails.status}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Fee</p>
              <p className="text-2xl font-bold text-gray-900">₹{feeDetails.totalFee.toLocaleString()}</p>
            </div>
            <div className="text-center bg-green-50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{feeDetails.paidAmount.toLocaleString()}</p>
            </div>
            <div className="text-center bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Balance Due</p>
              <p className="text-2xl font-bold text-orange-600">₹{feeDetails.dueAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Progress</span>
              <span className="font-medium">{paidPercent}% paid</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: `${paidPercent}%` }} />
            </div>
          </div>

          {feeDetails.dueAmount > 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">Payment Due</p>
                <p className="text-xs text-orange-700 mt-0.5">
                  ₹{feeDetails.dueAmount.toLocaleString()} due by {new Date(feeDetails.nextDueDate).toLocaleDateString()}. Contact the admin for payment options.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Installment Schedule */}
      <Card>
        <CardHeader><CardTitle>Installment Schedule</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {installments.map((inst, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {inst.status === 'paid'
                    ? <CheckCircle2 className="h-5 w-5 text-green-600" />
                    : <Clock className="h-5 w-5 text-orange-500" />}
                  <div>
                    <p className="font-medium text-sm">{inst.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {inst.status === 'paid' ? 'Paid on' : 'Due by'} {new Date(inst.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold">₹{inst.amount.toLocaleString()}</p>
                  <Badge variant={inst.status === 'paid' ? 'default' : 'secondary'}>
                    {inst.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Download All Receipts
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{payment.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.method} · {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground font-mono">{payment.id}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
