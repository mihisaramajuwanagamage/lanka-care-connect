import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Camera, 
  Upload, 
  AlertTriangle,
  CloudRain,
  Mountain,
  Flame,
  Car,
  Stethoscope,
  CheckCircle,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const incidentTypes = [
  { id: 'flood', label: 'Flood', icon: CloudRain, color: 'bg-blue-500' },
  { id: 'landslide', label: 'Landslide', icon: Mountain, color: 'bg-amber-600' },
  { id: 'fire', label: 'Fire', icon: Flame, color: 'bg-orange' },
  { id: 'roadblock', label: 'Road Block', icon: Car, color: 'bg-gray-500' },
  { id: 'medical', label: 'Medical Emergency', icon: Stethoscope, color: 'bg-red-500' },
  { id: 'other', label: 'Other', icon: AlertTriangle, color: 'bg-primary' },
];

const ReportIncident = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsGettingLocation(false);
          toast({
            title: "Location captured",
            description: "Your GPS coordinates have been recorded.",
          });
        },
        (error) => {
          console.error(error);
          setIsGettingLocation(false);
          toast({
            title: "Location error",
            description: "Could not get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsGettingLocation(false);
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      toast({
        title: "Select incident type",
        description: "Please select the type of incident you're reporting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Report submitted",
      description: "Thank you for your report. Emergency services have been notified.",
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-12 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Report Submitted Successfully</h1>
            <p className="text-muted-foreground mb-8">
              Your incident report has been received. Our emergency response team has been notified 
              and will take appropriate action.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Reference Number</p>
              <p className="text-2xl font-bold text-primary">SL-2024-{Math.floor(Math.random() * 10000)}</p>
            </div>
            <div className="mt-8 space-y-3">
              <Button
                variant="default"
                className="w-full"
                onClick={() => {
                  setIsSuccess(false);
                  setSelectedType(null);
                  setDescription('');
                  setLocation('');
                  setPhoto(null);
                  setPhotoPreview(null);
                  setGpsLocation(null);
                }}
              >
                Submit Another Report
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/map">View Live Map</a>
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <Badge variant="warning" className="mb-4">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Report an Emergency
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Citizen Incident Report
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Help us respond faster by reporting disasters and emergencies in your area. 
              Your report can save lives.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Incident Type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="elevated" className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">1. Select Incident Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {incidentTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = selectedType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              isSelected
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center mb-2`}>
                              <Icon className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="font-medium text-sm text-foreground">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated" className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">2. Location Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="location">Location Description</Label>
                      <Input
                        id="location"
                        placeholder="e.g., Near Colombo Fort Railway Station"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={getLocation}
                        disabled={isGettingLocation}
                      >
                        {isGettingLocation ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        {isGettingLocation ? 'Getting Location...' : 'Use GPS Location'}
                      </Button>
                      
                      {gpsLocation && (
                        <div className="text-sm text-muted-foreground">
                          <span className="text-green">✓</span> GPS: {gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">3. Describe the Situation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Please describe what you're seeing. Include details like severity, affected area, number of people affected, etc."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Photo Upload */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="elevated" className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">4. Upload Photo (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {photoPreview ? (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPhoto(null);
                            setPhotoPreview(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Camera className="w-10 h-10 text-muted-foreground mb-3" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                      </label>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Report
                    </>
                  )}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  By submitting, you confirm that this is a genuine emergency report.
                  False reports may be subject to legal action.
                </p>
              </motion.div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReportIncident;
