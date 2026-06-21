import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import { TrendingUp, Users, ClipboardList, Award } from 'lucide-react';

const batchStats = {
  'JEE 2025 – A': {
    students: 45, avgScore: 74, attendance: 88, testsCompleted: 8,
    toppers: [
      { name: 'Sneha Patel', score: '91%', rank: 1 },
      { name: 'Rahul Sharma', score: '82%', rank: 2 },
      { name: 'Priya Singh', score: '75%', rank: 3 },
    ],
    subjects: [
      { name: 'Calculus', avg: 78 },
      { name: 'Algebra', avg: 72 },
      { name: 'Trigonometry', avg: 68 },
      { name: 'Coordinate Geometry', avg: 80 },
    ],
    scoreDistribution: [
      { range: '90–100', count: 5, color: 'bg-green-500' },
      { range: '80–89', count: 12, color: 'bg-blue-500' },
      { range: '70–79', count: 16, color: 'bg-yellow-500' },
      { range: '60–69', count: 8, color: 'bg-orange-500' },
      { range: 'Below 60', count: 4, color: 'bg-red-500' },
    ],
  },
  'JEE 2025 – B': {
    students: 38, avgScore: 69, attendance: 82, testsCompleted: 7,
    toppers: [
      { name: 'Vikram Singh', score: '79%', rank: 1 },
      { name: 'Meera Sharma', score: '65%', rank: 2 },
    ],
    subjects: [
      { name: 'Calculus', avg: 70 },
      { name: 'Algebra', avg: 65 },
      { name: 'Trigonometry', avg: 72 },
      { name: 'Coordinate Geometry', avg: 69 },
    ],
    scoreDistribution: [
      { range: '90–100', count: 2, color: 'bg-green-500' },
      { range: '80–89', count: 7, color: 'bg-blue-500' },
      { range: '70–79', count: 14, color: 'bg-yellow-500' },
      { range: '60–69', count: 10, color: 'bg-orange-500' },
      { range: 'Below 60', count: 5, color: 'bg-red-500' },
    ],
  },
  'Class 10 – A': {
    students: 35, avgScore: 80, attendance: 91, testsCompleted: 6,
    toppers: [
      { name: 'Ankit Gupta', score: '88%', rank: 1 },
      { name: 'Kavya Reddy', score: '72%', rank: 2 },
    ],
    subjects: [
      { name: 'Algebra', avg: 82 },
      { name: 'Geometry', avg: 76 },
      { name: 'Trigonometry', avg: 84 },
      { name: 'Statistics', avg: 78 },
    ],
    scoreDistribution: [
      { range: '90–100', count: 6, color: 'bg-green-500' },
      { range: '80–89', count: 15, color: 'bg-blue-500' },
      { range: '70–79', count: 9, color: 'bg-yellow-500' },
      { range: '60–69', count: 4, color: 'bg-orange-500' },
      { range: 'Below 60', count: 1, color: 'bg-red-500' },
    ],
  },
};

const needsAttentionStudents = [
  { name: 'Amit Kumar', batch: 'JEE 2025 – B', avgScore: '52%', attendance: '65%', issue: 'Low score + attendance' },
  { name: 'Meera Sharma', batch: 'JEE 2025 – B', avgScore: '65%', attendance: '72%', issue: 'Below class average' },
  { name: 'Kavya Reddy', batch: 'Class 10 – A', avgScore: '72%', attendance: '85%', issue: 'Score dropping trend' },
];

export const AnalyticsPage: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState('JEE 2025 – A');
  const data = batchStats[selectedBatch as keyof typeof batchStats];
  const maxCount = Math.max(...data.scoreDistribution.map(d => d.count));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Analytics</h1>
          <p className="text-muted-foreground mt-2">Track student performance and identify areas for improvement</p>
        </div>
        <Select value={selectedBatch} onValueChange={setSelectedBatch}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(batchStats).map(b => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Students', value: String(data.students), icon: Users, color: 'from-blue-600 to-blue-400' },
          { label: 'Avg. Score', value: `${data.avgScore}%`, icon: TrendingUp, color: 'from-green-600 to-green-400' },
          { label: 'Avg. Attendance', value: `${data.attendance}%`, icon: ClipboardList, color: 'from-purple-600 to-purple-400' },
          { label: 'Tests Done', value: String(data.testsCompleted), icon: Award, color: 'from-orange-600 to-orange-400' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader><CardTitle>Score Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.scoreDistribution.map(d => (
                <div key={d.range} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{d.range}</span>
                    <span className="font-medium">{d.count} students</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4">
                    <div
                      className={`${d.color} h-4 rounded-full transition-all`}
                      style={{ width: `${(d.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card>
          <CardHeader><CardTitle>Subject-wise Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.subjects.map(s => (
                <div key={s.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className={`font-bold ${s.avg >= 75 ? 'text-green-600' : s.avg >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                      {s.avg}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${s.avg >= 75 ? 'bg-green-500' : s.avg >= 60 ? 'bg-orange-500' : 'bg-red-500'}`}
                      style={{ width: `${s.avg}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader><CardTitle>Top Performers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.toppers.map(t => (
                <div key={t.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      t.rank === 1 ? 'bg-yellow-500' : t.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
                    }`}>
                      {t.rank}
                    </div>
                    <span className="font-medium">{t.name}</span>
                  </div>
                  <Badge variant="default">{t.score}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Needs Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="h-2 w-2 bg-red-500 rounded-full" />
              Students Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsAttentionStudents.map((s, i) => (
                <div key={i} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.batch}</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">{s.issue}</Badge>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Score: <span className="text-red-600 font-medium">{s.avgScore}</span></span>
                    <span>Attendance: <span className="text-orange-600 font-medium">{s.attendance}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
