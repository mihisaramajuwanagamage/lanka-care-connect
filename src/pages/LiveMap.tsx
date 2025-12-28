import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  AlertTriangle, 
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Filter,
  Layers,
  RefreshCw,
  Home as Shelter
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for disasters
const mockDisasters = [
  { id: 1, type: 'flood', severity: 'high', location: 'Ratnapura', lat: 6.6828, lng: 80.4031, reports: 45 },
  { id: 2, type: 'landslide', severity: 'medium', location: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891, reports: 12 },
  { id: 3, type: 'fire', severity: 'low', location: 'Colombo', lat: 6.9271, lng: 79.8612, reports: 5 },
  { id: 4, type: 'flood', severity: 'medium', location: 'Galle', lat: 6.0535, lng: 80.2210, reports: 23 },
  { id: 5, type: 'cyclone', severity: 'high', location: 'Jaffna', lat: 9.6615, lng: 80.0255, reports: 67 },
];

const mockWeather = {
  temperature: 28,
  humidity: 78,
  windSpeed: 15,
  rainfall: 12.5,
  condition: 'Partly Cloudy',
};

const shelters = [
  { id: 1, name: 'Central School Shelter', capacity: 200, current: 45, location: 'Colombo' },
  { id: 2, name: 'Town Hall Complex', capacity: 150, current: 89, location: 'Ratnapura' },
  { id: 3, name: 'Community Center', capacity: 100, current: 23, location: 'Galle' },
];

const LiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedDisaster, setSelectedDisaster] = useState<typeof mockDisasters[0] | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);

  const toggleFilter = (filter: string) => {
    if (filter === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.includes(filter)
        ? activeFilters.filter(f => f !== filter && f !== 'all')
        : [...activeFilters.filter(f => f !== 'all'), filter];
      setActiveFilters(newFilters.length === 0 ? ['all'] : newFilters);
    }
  };

  const filteredDisasters = activeFilters.includes('all')
    ? mockDisasters
    : mockDisasters.filter(d => activeFilters.includes(d.type));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-card border-r border-border p-4 overflow-y-auto hidden lg:block"
        >
          {/* Weather Card */}
          <Card variant="glass" className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-primary" />
                Current Weather
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Thermometer className="w-4 h-4" /> Temperature
                </span>
                <span className="font-semibold">{mockWeather.temperature}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Droplets className="w-4 h-4" /> Humidity
                </span>
                <span className="font-semibold">{mockWeather.humidity}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Wind className="w-4 h-4" /> Wind Speed
                </span>
                <span className="font-semibold">{mockWeather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <CloudRain className="w-4 h-4" /> Rainfall
                </span>
                <span className="font-semibold">{mockWeather.rainfall} mm</span>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card variant="glass" className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['all', 'flood', 'landslide', 'fire', 'cyclone'].map(filter => (
                  <Badge
                    key={filter}
                    variant={activeFilters.includes(filter) ? 'default' : 'outline'}
                    className="cursor-pointer capitalize"
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Disasters */}
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange" />
                Active Incidents ({filteredDisasters.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredDisasters.map(disaster => (
                <div
                  key={disaster.id}
                  onClick={() => setSelectedDisaster(disaster)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedDisaster?.id === disaster.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-foreground capitalize">{disaster.type}</span>
                    <Badge
                      variant={
                        disaster.severity === 'high'
                          ? 'danger'
                          : disaster.severity === 'medium'
                          ? 'warning'
                          : 'secondary'
                      }
                    >
                      {disaster.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {disaster.location}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {disaster.reports} reports
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.aside>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Map Placeholder - In production, integrate Mapbox here */}
          <div 
            ref={mapContainer}
            className="w-full h-full bg-gradient-to-br from-secondary via-background to-secondary/50 relative"
          >
            {/* Sri Lanka Map Outline */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-96">
                <svg viewBox="0 0 100 150" className="w-full h-full opacity-20">
                  <path
                    d="M50 10 C30 20, 20 40, 25 70 C30 100, 40 130, 50 140 C60 130, 70 100, 75 70 C80 40, 70 20, 50 10"
                    fill="currentColor"
                    className="text-primary"
                  />
                </svg>
                
                {/* Disaster Markers */}
                {filteredDisasters.map((disaster, index) => (
                  <motion.div
                    key={disaster.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`absolute cursor-pointer ${
                      disaster.severity === 'high' ? 'animate-pulse' : ''
                    }`}
                    style={{
                      left: `${20 + (disaster.lng - 79.5) * 30}%`,
                      top: `${100 - (disaster.lat - 5.9) * 15}%`,
                    }}
                    onClick={() => setSelectedDisaster(disaster)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                        disaster.severity === 'high'
                          ? 'bg-orange'
                          : disaster.severity === 'medium'
                          ? 'bg-accent'
                          : 'bg-green'
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3 text-primary-foreground" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Hint */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card variant="glass" className="p-4">
                <p className="text-sm text-muted-foreground text-center">
                  🗺️ Interactive Mapbox map will be integrated here with real-time disaster tracking
                </p>
              </Card>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button variant="glass" size="icon" className="shadow-lg">
              <Layers className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="icon" className="shadow-lg">
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>

          {/* Selected Disaster Popup */}
          {selectedDisaster && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-20 left-4 right-4 lg:left-auto lg:right-4 lg:w-80"
            >
              <Card variant="glass" className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground capitalize">{selectedDisaster.type}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedDisaster.location}
                    </p>
                  </div>
                  <Badge
                    variant={
                      selectedDisaster.severity === 'high'
                        ? 'danger'
                        : selectedDisaster.severity === 'medium'
                        ? 'warning'
                        : 'secondary'
                    }
                  >
                    {selectedDisaster.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Reports</span>
                    <p className="font-semibold">{selectedDisaster.reports}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status</span>
                    <p className="font-semibold text-orange">Active</p>
                  </div>
                </div>
                <Button variant="default" size="sm" className="w-full mt-3">
                  View Details
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Shelters Panel (Mobile) */}
          <div className="absolute top-4 left-4 lg:hidden">
            <Card variant="glass" className="p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Shelter className="w-4 h-4 text-green" />
                {shelters.length} Shelters Available
              </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - Shelters (Desktop) */}
        <motion.aside
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-72 bg-card border-l border-border p-4 overflow-y-auto hidden xl:block"
        >
          <Card variant="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shelter className="w-5 h-5 text-green" />
                Shelters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {shelters.map(shelter => (
                <div key={shelter.id} className="p-3 rounded-lg border border-border">
                  <h4 className="font-semibold text-sm text-foreground">{shelter.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{shelter.location}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{shelter.current}/{shelter.capacity}</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        shelter.current / shelter.capacity > 0.8
                          ? 'bg-orange'
                          : 'bg-green'
                      }`}
                      style={{ width: `${(shelter.current / shelter.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </div>
  );
};

export default LiveMap;
