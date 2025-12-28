import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Shield, Ambulance, Flame, Building } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const emergencyContacts = [
  { name: 'Police Emergency', number: '119', icon: Shield, color: 'bg-primary' },
  { name: 'Ambulance / Suwa Seriya', number: '1990', icon: Ambulance, color: 'bg-green' },
  { name: 'Fire & Rescue', number: '111', icon: Flame, color: 'bg-orange' },
  { name: 'Disaster Management Center', number: '117', icon: AlertTriangle, color: 'bg-accent' },
  { name: 'National Hospital Colombo', number: '011-2691111', icon: Building, color: 'bg-blue-500' },
  { name: 'Meteorology Department', number: '011-2694104', icon: Building, color: 'bg-cyan-500' },
];

const Emergency = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="danger" className="mb-4">
              <Phone className="w-3 h-3 mr-1" />
              24/7 Available
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Emergency Contacts</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Save these numbers. In an emergency, every second counts.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-2xl ${contact.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{contact.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">{contact.number}</p>
                      <Button variant="outline" className="w-full gap-2" asChild>
                        <a href={`tel:${contact.number.replace(/-/g, '')}`}>
                          <Phone className="w-4 h-4" /> Call Now
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Emergency;
