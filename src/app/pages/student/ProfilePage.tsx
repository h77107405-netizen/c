import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../contexts/AuthContext';
import { User, Phone, Mail, MapPin, GraduationCap, Save, Camera, Shield } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('123, Sector 15, Noida, UP – 201301');
  const [parentPhone, setParentPhone] = useState('9876543200');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const studentInfo = {
    name: user?.name || 'Rahul Sharma',
    email: user?.email || 'rahul@example.com',
    rollNo: 'JEE25-A-042',
    course: 'JEE Main & Advanced 2025',
    batch: 'Batch A',
    joinedDate: '2024-06-01',
    accountStatus: 'active',
    feeStatus: 'partial',
    parentName: 'Suresh Sharma',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-muted-foreground mt-2">View your profile information and update contact details</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {studentInfo.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                <Camera className="h-3 w-3 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{studentInfo.name}</h2>
              <p className="text-muted-foreground">{studentInfo.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3 justify-center md:justify-start">
                <Badge variant="default">{studentInfo.accountStatus}</Badge>
                <Badge variant="outline" className="font-mono">{studentInfo.rollNo}</Badge>
                <Badge variant={studentInfo.feeStatus === 'paid' ? 'default' : 'secondary'}>
                  Fee: {studentInfo.feeStatus}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Info (Read-Only) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Course', value: studentInfo.course },
              { label: 'Batch', value: studentInfo.batch },
              { label: 'Roll Number', value: studentInfo.rollNo },
              { label: 'Joined Date', value: new Date(studentInfo.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) },
            ].map(item => (
              <div key={item.label} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded-lg">
            📌 Academic details can only be updated by the admin. Contact your institute for changes.
          </p>
        </CardContent>
      </Card>

      {/* Contact Info (Editable) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> Email Address
              </Label>
              <Input value={studentInfo.email} disabled className="bg-gray-50" />
              <p className="text-xs text-muted-foreground">Email cannot be changed. Contact admin.</p>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> Your Phone Number
              </Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="10-digit phone number" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> Parent/Guardian Name
              </Label>
              <Input value={studentInfo.parentName} disabled className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> Parent Phone Number
              </Label>
              <Input value={parentPhone} onChange={e => setParentPhone(e.target.value)} placeholder="Parent's phone number" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Address
              </Label>
              <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Your full address" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-green-600 to-teal-600">
              <Save className="h-4 w-4 mr-2" /> Save Contact Info
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="Confirm new password" />
            </div>
          </div>
          {newPwd && confirmPwd && newPwd !== confirmPwd && (
            <p className="text-sm text-red-600">Passwords do not match.</p>
          )}
          <div className="flex justify-end">
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
              disabled={!currentPwd || !newPwd || newPwd !== confirmPwd}
            >
              <Shield className="h-4 w-4 mr-2" /> Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
