import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { TrendingUp, Award, Download } from 'lucide-react';

const results = [
  { id: '1', test: 'JEE Mock Test 1', subject: 'All Subjects', date: '2024-12-01', score: 234, total: 300, percentage: 78, grade: 'A', rank: 5, remarks: 'Excellent performance. Focus on Chemistry for further improvement.' },
  { id: '2', test: 'Mathematics – Unit Test 3', subject: 'Mathematics', date: '2024-12-10', score: 92, total: 100, percentage: 92, grade: 'A+', rank: 2, remarks: 'Outstanding. Best in class in Calculus section.' },
  { id: '3', test: 'Physics – Chapter Test 2', subject: 'Physics', date: '2024-12-05', score: 62, total: 80, percentage: 77.5, grade: 'B+', rank: 12, remarks: 'Good. Improve on Thermodynamics chapter.' },
  { id: '4', test: 'Chemistry Quiz 2', subject: 'Chemistry', date: '2024-12-15', score: 42, total: 50, percentage: 84, grade: 'A', rank: 4, remarks: 'Very good. Electrochemistry needs attention.' },
  { id: '5', test: 'Mathematics – Unit Test 2', subject: 'Mathematics', date: '2024-11-20', score: 78, total: 100, percentage: 78, grade: 'B+', rank: 8, remarks: 'Good attempt. Algebra section needs more practice.' },
  { id: '6', test: 'Physics – Chapter Test 1', subject: 'Physics', date: '2024-11-10', score: 55, total: 80, percentage: 68.75, grade: 'B', rank: 18, remarks: 'Mechanics concepts need revision.' },
];

const gradeColor: Record<string, string> = {
  'A+': 'text-emerald-600 bg-emerald-50',
  'A': 'text-green-600 bg-green-50',
  'B+': 'text-blue-600 bg-blue-50',
  'B': 'text-indigo-600 bg-indigo-50',
  'C': 'text-orange-600 bg-orange-50',
};

const subjectFilter_list = ['All', 'Mathematics', 'Physics', 'Chemistry', 'All Subjects'];

export const ResultsPage: React.FC = () => {
  const [subjectFilter, setSubjectFilter] = useState('All');

  const filtered = results.filter(r => subjectFilter === 'All' || r.subject === subjectFilter);

  const avgPercentage = Math.round(results.reduce((s, r) => s + r.percentage, 0) / results.length);
  const bestGrade = results.reduce((best, r) => r.percentage > best.percentage ? r : best, results[0]);
  const avgRank = Math.round(results.reduce((s, r) => s + r.rank, 0) / results.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Results</h1>
        <p className="text-muted-foreground mt-2">Review your test scores, grades and performance analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Overall Average', value: `${avgPercentage}%`, icon: TrendingUp, color: 'from-blue-600 to-blue-400', sub: 'Across all tests' },
          { label: 'Best Score', value: `${bestGrade.percentage}%`, icon: Award, color: 'from-yellow-500 to-amber-400', sub: bestGrade.test },
          { label: 'Avg. Class Rank', value: `#${avgRank}`, icon: Award, color: 'from-purple-600 to-purple-400', sub: 'Out of 45 students' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{s.value}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.sub}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {subjectFilter_list.map(s => (
          <Button
            key={s}
            variant={subjectFilter === s ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSubjectFilter(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(result => (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{result.test}</h3>
                  <p className="text-sm text-muted-foreground">{result.subject} · {new Date(result.date).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{result.percentage.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">{result.score}/{result.total}</p>
                  </div>
                  <div className={`text-center px-4 py-2 rounded-xl font-bold text-xl ${gradeColor[result.grade] || 'text-gray-600 bg-gray-50'}`}>
                    {result.grade}
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">#{result.rank}</p>
                    <p className="text-xs text-muted-foreground">Rank</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${result.percentage >= 90 ? 'bg-emerald-500' : result.percentage >= 75 ? 'bg-green-500' : result.percentage >= 60 ? 'bg-blue-500' : 'bg-orange-500'}`}
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-muted-foreground font-medium mb-1">Teacher's Remarks:</p>
                <p className="text-sm">{result.remarks}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
