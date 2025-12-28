import { motion } from 'framer-motion';
import { LayoutDashboard, AlertTriangle, Users, Activity, TrendingUp, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const activityData = [
  { time: '00:00', reports: 12 }, { time: '04:00', reports: 8 }, { time: '08:00', reports: 25 },
  { time: '12:00', reports: 45 }, { time: '16:00', reports: 38 }, { time: '20:00', reports: 22 },
];

const recentReports = [
  { id: 1, type: 'Flood', location: 'Ratnapura', time: '10 min ago', status: 'verified' },
  { id: 2, type: 'Landslide', location: 'Nuwara Eliya', time: '25 min ago', status: 'pending' },
  { id: 3, type: 'Road Block', location: 'Kandy', time: '1 hour ago', status: 'resolved' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-primary" /> Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Real-time disaster monitoring and management</p>
          </motion.div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard title="Active Alerts" value={23} icon={AlertTriangle} color="orange" trend={{ value: 15, isPositive: false }} />
            <StatsCard title="Reports Today" value={156} icon={Activity} color="primary" trend={{ value: 8, isPositive: true }} />
            <StatsCard title="Active Users" value="2.4K" icon={Users} color="green" />
            <StatsCard title="Avg Response" value="18 min" icon={Clock} color="gold" trend={{ value: 12, isPositive: true }} />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activity Chart */}
            <Card variant="elevated" className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Report Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData}>
                      <defs>
                        <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(346, 74%, 32%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(346, 74%, 32%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="time" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
                      <Area type="monotone" dataKey="reports" stroke="hsl(346, 74%, 32%)" fill="url(#colorReports)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-orange" /> Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentReports.map(r => (
                  <div key={r.id} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{r.type}</span>
                      <Badge variant={r.status === 'verified' ? 'success' : r.status === 'pending' ? 'warning' : 'secondary'}>
                        {r.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.location} • {r.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
