import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  AlertTriangle, 
  Phone, 
  ArrowRight,
  CloudRain,
  Mountain,
  Flame,
  Waves,
  Users,
  Shield,
  Activity,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Globe from '@/components/Globe';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';

const disasterTypes = [
  { icon: CloudRain, label: 'Floods', color: 'bg-blue-500' },
  { icon: Mountain, label: 'Landslides', color: 'bg-amber-600' },
  { icon: Waves, label: 'Tsunami', color: 'bg-cyan-500' },
  { icon: Flame, label: 'Fire', color: 'bg-orange' },
];

const features = [
  {
    icon: MapPin,
    title: 'Real-Time Tracking',
    description: 'Monitor disasters across Sri Lanka with live GPS-based mapping and instant alerts.',
    color: 'primary',
  },
  {
    icon: Activity,
    title: 'AI Predictions',
    description: 'Advanced machine learning models predict floods, landslides, and weather patterns.',
    color: 'gold',
  },
  {
    icon: Users,
    title: 'Citizen Reports',
    description: 'Enable citizens to report incidents with photos, GPS location, and descriptions.',
    color: 'green',
  },
  {
    icon: Shield,
    title: 'Resource Management',
    description: 'Coordinate shelters, medical aid, food supplies, and rescue teams efficiently.',
    color: 'orange',
  },
];

const recentAlerts = [
  { type: 'Flood Warning', location: 'Ratnapura District', severity: 'high', time: '2 hours ago' },
  { type: 'Landslide Risk', location: 'Nuwara Eliya', severity: 'medium', time: '5 hours ago' },
  { type: 'Heavy Rainfall', location: 'Western Province', severity: 'low', time: '8 hours ago' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="info" className="gap-2">
                <Activity className="w-3 h-3" />
                Live Monitoring Active
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Smart Disaster
                <span className="block gradient-text-maroon">Management</span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl font-bold text-muted-foreground mt-2">
                  for Sri Lanka
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Protecting lives with AI-powered prediction, real-time monitoring, 
                and coordinated disaster response across the nation.
              </p>
            </div>

            {/* Disaster Type Pills */}
            <div className="flex flex-wrap gap-3">
              {disasterTypes.map((type) => (
                <div
                  key={type.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium"
                >
                  <div className={`w-2 h-2 rounded-full ${type.color}`} />
                  {type.label}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/map">
                <Button variant="hero" size="xl" className="gap-2">
                  <MapPin className="w-5 h-5" />
                  View Live Map
                </Button>
              </Link>
              <Link to="/report">
                <Button variant="heroOutline" size="xl" className="gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Report Incident
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">1.2K+</p>
                <p className="text-sm text-muted-foreground">Active Reports</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">25</p>
                <p className="text-sm text-muted-foreground">Districts Covered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Response Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
            <Globe className="w-full aspect-square max-w-[600px] mx-auto" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
            />
          </div>
        </motion.div>
      </section>

      {/* Alert Banner */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-primary-foreground">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <p className="text-sm font-medium">
              Active Weather Alert: Heavy rainfall expected in Western & Southern provinces
            </p>
            <Link to="/map" className="text-sm underline hover:no-underline">
              View Details →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">Core Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Comprehensive Disaster Response
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our integrated platform combines real-time data, AI predictions, and community engagement 
              to protect lives and coordinate emergency response.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full p-6 hover-lift group">
                    <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 text-${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Active Alerts"
              value={23}
              subtitle="Across 8 districts"
              icon={AlertTriangle}
              color="orange"
            />
            <StatsCard
              title="Citizens Reporting"
              value="12.5K"
              subtitle="Monthly active users"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              color="green"
            />
            <StatsCard
              title="Resources Deployed"
              value={156}
              subtitle="Teams & vehicles"
              icon={Shield}
              color="primary"
            />
            <StatsCard
              title="Response Time"
              value="18 min"
              subtitle="Average time"
              icon={Clock}
              trend={{ value: 8, isPositive: true }}
              color="gold"
            />
          </div>
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Recent Alerts</h2>
              <p className="text-muted-foreground">Latest disaster warnings and updates</p>
            </div>
            <Link to="/map">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <Badge
                      variant={
                        alert.severity === 'high'
                          ? 'danger'
                          : alert.severity === 'medium'
                          ? 'warning'
                          : 'secondary'
                      }
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{alert.type}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {alert.location}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card variant="elevated" className="p-8 sm:p-12 bg-gradient-to-br from-primary/5 via-card to-accent/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Need Emergency Assistance?
                </h2>
                <p className="text-muted-foreground max-w-lg">
                  If you're experiencing a disaster or emergency situation, contact our 24/7 
                  helpline immediately or use our quick report feature.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/emergency">
                  <Button variant="hero" size="xl" className="gap-2">
                    <Phone className="w-5 h-5" />
                    Emergency Contacts
                  </Button>
                </Link>
                <Link to="/report">
                  <Button variant="gold" size="xl" className="gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Quick Report
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
