import { motion } from 'framer-motion';
import { Package, Users, Truck, Home, PlusCircle, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/StatsCard';

const resources = [
  { id: 1, type: 'Food Supplies', available: 2500, unit: 'packages', location: 'Colombo Warehouse', status: 'available' },
  { id: 2, type: 'Medical Kits', available: 450, unit: 'kits', location: 'Central Hospital', status: 'low' },
  { id: 3, type: 'Tents', available: 180, unit: 'units', location: 'Ratnapura Camp', status: 'available' },
  { id: 4, type: 'Water Bottles', available: 5000, unit: 'liters', location: 'Multiple Locations', status: 'available' },
];

const teams = [
  { name: 'Rescue Team Alpha', members: 12, status: 'deployed', location: 'Ratnapura' },
  { name: 'Medical Unit 3', members: 8, status: 'standby', location: 'Colombo' },
  { name: 'Search & Rescue B', members: 15, status: 'deployed', location: 'Nuwara Eliya' },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="success" className="mb-4">
              <Package className="w-3 h-3 mr-1" />
              Resource Management
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Emergency Resources</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real-time tracking of supplies, shelters, and rescue teams across Sri Lanka.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard title="Total Shelters" value={42} subtitle="Active across 15 districts" icon={Home} color="green" />
            <StatsCard title="Rescue Teams" value={28} subtitle="156 personnel deployed" icon={Users} color="primary" />
            <StatsCard title="Vehicles" value={85} subtitle="On standby" icon={Truck} color="gold" />
            <StatsCard title="Supply Centers" value={12} subtitle="Fully stocked" icon={Package} color="orange" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Resources List */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Available Supplies</span>
                  <Button variant="outline" size="sm"><PlusCircle className="w-4 h-4 mr-1" /> Add</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resources.map(r => (
                  <div key={r.id} className="p-4 rounded-lg border border-border flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{r.type}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {r.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{r.available.toLocaleString()} {r.unit}</p>
                      <Badge variant={r.status === 'available' ? 'success' : 'warning'}>{r.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Teams */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-green" /> Rescue Teams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teams.map(t => (
                  <div key={t.name} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <Badge variant={t.status === 'deployed' ? 'danger' : 'secondary'}>{t.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{t.members} members • {t.location}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
