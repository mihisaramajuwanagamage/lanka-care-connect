import { motion } from 'framer-motion';
import { 
  Brain,
  TrendingUp,
  AlertTriangle,
  CloudRain,
  Mountain,
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  MapPin,
  Activity,
  BarChart3
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock prediction data
const floodPredictionData = [
  { day: 'Mon', risk: 25, rainfall: 45 },
  { day: 'Tue', risk: 35, rainfall: 78 },
  { day: 'Wed', risk: 55, rainfall: 95 },
  { day: 'Thu', risk: 75, rainfall: 120 },
  { day: 'Fri', risk: 65, rainfall: 85 },
  { day: 'Sat', risk: 45, rainfall: 55 },
  { day: 'Sun', risk: 30, rainfall: 35 },
];

const landslideRiskAreas = [
  { area: 'Nuwara Eliya', risk: 85, trend: 'increasing' },
  { area: 'Ratnapura', risk: 72, trend: 'stable' },
  { area: 'Badulla', risk: 68, trend: 'increasing' },
  { area: 'Kandy', risk: 45, trend: 'decreasing' },
  { area: 'Kegalle', risk: 58, trend: 'stable' },
];

const aiInsights = [
  {
    type: 'warning',
    title: 'High Flood Risk Alert',
    description: 'Based on current rainfall patterns and soil saturation levels, there is a 75% probability of flooding in Ratnapura district within the next 48 hours.',
    confidence: 92,
    icon: CloudRain,
  },
  {
    type: 'info',
    title: 'Landslide Probability Increasing',
    description: 'Continuous rainfall in the hill country has increased landslide risk. Nuwara Eliya and Badulla districts are most vulnerable.',
    confidence: 88,
    icon: Mountain,
  },
  {
    type: 'success',
    title: 'Improving Conditions',
    description: 'Weather models predict a gradual decrease in rainfall from Saturday, reducing flood risk in the Western Province.',
    confidence: 85,
    icon: TrendingUp,
  },
];

const AIPredictions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="info" className="mb-4">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered Analysis
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Disaster Predictions & Insights
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Advanced machine learning models analyze weather patterns, historical data, and 
              environmental factors to predict potential disasters.
            </p>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Current AI Insights
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Card
                      variant="elevated"
                      className={`h-full hover-lift ${
                        insight.type === 'warning'
                          ? 'border-l-4 border-l-orange'
                          : insight.type === 'info'
                          ? 'border-l-4 border-l-primary'
                          : 'border-l-4 border-l-green'
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            insight.type === 'warning'
                              ? 'bg-orange/10'
                              : insight.type === 'info'
                              ? 'bg-primary/10'
                              : 'bg-green/10'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              insight.type === 'warning'
                                ? 'text-orange'
                                : insight.type === 'info'
                                ? 'text-primary'
                                : 'text-green'
                            }`} />
                          </div>
                          <Badge variant="secondary">{insight.confidence}% confidence</Badge>
                        </div>
                        <CardTitle className="text-base mt-3">{insight.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Flood Risk Prediction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudRain className="w-5 h-5 text-primary" />
                    7-Day Flood Risk Forecast
                  </CardTitle>
                  <CardDescription>
                    Predicted flood risk and expected rainfall
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={floodPredictionData}>
                        <defs>
                          <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(346, 74%, 32%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(346, 74%, 32%)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="day" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.5rem',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="risk"
                          stroke="hsl(346, 74%, 32%)"
                          fill="url(#riskGradient)"
                          name="Risk %"
                        />
                        <Area
                          type="monotone"
                          dataKey="rainfall"
                          stroke="hsl(217, 91%, 60%)"
                          fill="url(#rainfallGradient)"
                          name="Rainfall (mm)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Flood Risk %</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Rainfall (mm)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Landslide Risk by Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-accent" />
                    Landslide Risk by District
                  </CardTitle>
                  <CardDescription>
                    Current risk levels based on soil and weather analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {landslideRiskAreas.map((area, index) => (
                      <div key={area.area} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{area.area}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${
                              area.risk >= 70 ? 'text-orange' : area.risk >= 50 ? 'text-accent' : 'text-green'
                            }`}>
                              {area.risk}%
                            </span>
                            <Badge
                              variant={
                                area.trend === 'increasing'
                                  ? 'danger'
                                  : area.trend === 'stable'
                                  ? 'secondary'
                                  : 'success'
                              }
                              className="text-xs"
                            >
                              {area.trend}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${area.risk}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                            className={`h-full rounded-full ${
                              area.risk >= 70 ? 'bg-orange' : area.risk >= 50 ? 'bg-accent' : 'bg-green'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Weather Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary" />
              Environmental Factors
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="glass" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                    <Thermometer className="w-6 h-6 text-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="text-2xl font-bold text-foreground">28°C</p>
                  </div>
                </div>
              </Card>
              <Card variant="glass" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                    <p className="text-2xl font-bold text-foreground">82%</p>
                  </div>
                </div>
              </Card>
              <Card variant="glass" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-green" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                    <p className="text-2xl font-bold text-foreground">18 km/h</p>
                  </div>
                </div>
              </Card>
              <Card variant="glass" className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CloudRain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rainfall Today</p>
                    <p className="text-2xl font-bold text-foreground">45 mm</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* AI Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card variant="elevated" className="bg-gradient-to-br from-primary/5 via-card to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">AI Analysis Summary</h3>
                    <p className="text-muted-foreground">
                      Our LSTM-based prediction models have analyzed the current weather patterns, 
                      historical disaster data, and environmental factors. The southwestern monsoon 
                      is bringing heavy rainfall to the Western and Southern provinces, increasing 
                      flood risk. Hill country districts are experiencing soil saturation levels 
                      above normal thresholds, elevating landslide probability. We recommend 
                      precautionary measures in high-risk areas.
                    </p>
                    <Button variant="outline" className="mt-4 gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Detailed Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AIPredictions;
