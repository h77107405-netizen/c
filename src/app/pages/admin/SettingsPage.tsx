import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Building2, Bell, Shield, DollarSign, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [instituteName, setInstituteName] = useState('Excellence Coaching Institute');
  const [email, setEmail] = useState('admin@excellence.edu.in');
  const [phone, setPhone] = useState('9876500000');
  const [address, setAddress] = useState('123, Coaching Hub, Sector 18, Noida, UP – 201301');
  const [notifications, setNotifications] = useState({ feeReminder: true, classAlert: true, testResult: true, announcement: false });
  const [feeInstallments, setFeeInstallments] = useState(true);
  const [lateFeeEnabled, setLateFeeEnabled] = useState(true);
  const [lateFeePercent, setLateFeePercent] = useState('2');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-muted-foreground mt-2">Configure institute information and platform preferences</p>
      </div>

      {/* Institute Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Institute Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institute Name</Label>
              <Input value={instituteName} onChange={e => setInstituteName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Contact Phone</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input placeholder="https://www.yourcoaching.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Input value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="h-4 w-4 mr-2" /> Save Institute Info
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'feeReminder', label: 'Fee Due Reminders', desc: 'Send automatic reminders to students with pending fees' },
            { key: 'classAlert', label: 'Class Schedule Alerts', desc: 'Notify students and teachers before a class starts' },
            { key: 'testResult', label: 'Test Result Notifications', desc: 'Notify students when their test results are published' },
            { key: 'announcement', label: 'General Announcements', desc: 'Push announcements to all users when posted' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={val => setNotifications(prev => ({ ...prev, [item.key]: val }))}
              />
            </div>
          ))}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-orange-600 to-amber-500">
              <Save className="h-4 w-4 mr-2" /> Save Notifications
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fee Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Fee Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Allow Fee Installments</p>
              <p className="text-sm text-muted-foreground">Let students pay course fees in multiple installments</p>
            </div>
            <Switch checked={feeInstallments} onCheckedChange={setFeeInstallments} />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Late Fee Penalty</p>
              <p className="text-sm text-muted-foreground">Apply a percentage penalty on overdue fee payments</p>
            </div>
            <Switch checked={lateFeeEnabled} onCheckedChange={setLateFeeEnabled} />
          </div>
          {lateFeeEnabled && (
            <div className="space-y-2 max-w-xs">
              <Label>Late Fee Percentage (%)</Label>
              <Input type="number" value={lateFeePercent} onChange={e => setLateFeePercent(e.target.value)} min="0" max="20" />
            </div>
          )}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-green-600 to-teal-600">
              <Save className="h-4 w-4 mr-2" /> Save Fee Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Admin Password</p>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
              <Save className="h-4 w-4 mr-2" /> Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
