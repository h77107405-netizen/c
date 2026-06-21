import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Loader2, TrendingUp, Users, ClipboardList, MessageSquare } from 'lucide-react';
import { api } from '../../lib/api';

export const AnalyticsPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.teacher.dashboard().then((r) => { if (r.success) setStats(r.data); }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-muted-foreground mt-2">Teaching performance overview</p>
      </div>
      {loading ? <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Total Students', value: stats?.totalStudents ?? 0, icon: Users, color: 'text-blue-600 bg-blue-100' },
              { name: 'Tests Created', value: stats?.totalTests ?? 0, icon: ClipboardList, color: 'text-purple-600 bg-purple-100' },
              { name: 'Doubts Resolved', value: (stats?.totalDoubts ?? 0) - (stats?.pendingDoubts ?? 0), icon: MessageSquare, color: 'text-green-600 bg-green-100' },
              { name: 'Active Batches', value: stats?.totalBatches ?? 0, icon: TrendingUp, color: 'text-orange-600 bg-orange-100' },
            ].map((s) => (
              <Card key={s.name}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={'p-3 rounded-xl ' + s.color}><s.icon className="h-6 w-6" /></div>
                    <div><p className="text-sm text-muted-foreground">{s.name}</p><h3 className="text-3xl font-bold">{s.value}</h3></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle>Performance Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span className="font-medium">Doubt Resolution Rate</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-100 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: stats?.totalDoubts ? ((stats.totalDoubts - stats.pendingDoubts) / stats.totalDoubts * 100) + '%' : '0%'}} />
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {stats?.totalDoubts ? Math.round((stats.totalDoubts - stats.pendingDoubts) / stats.totalDoubts * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span className="font-medium">Total Live Classes Conducted</span>
                  <span className="font-bold">{stats?.totalLiveClasses ?? 0}</span>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <span className="font-medium">Materials Uploaded</span>
                  <span className="font-bold">{stats?.totalMaterials ?? 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
