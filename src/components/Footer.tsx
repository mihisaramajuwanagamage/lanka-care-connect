import { Link } from 'react-router-dom';
import { AlertTriangle, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg text-foreground">SafeLanka</span>
                <span className="text-xs text-muted-foreground block">Disaster Management</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Protecting Sri Lanka through intelligent disaster management, real-time monitoring, and community coordination.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/map" className="text-muted-foreground hover:text-primary transition-colors">Live Map</Link></li>
              <li><Link to="/report" className="text-muted-foreground hover:text-primary transition-colors">Report Incident</Link></li>
              <li><Link to="/predictions" className="text-muted-foreground hover:text-primary transition-colors">AI Predictions</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors">Resource Management</Link></li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Emergency Contacts</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Police: <span className="text-foreground font-medium">119</span></li>
              <li className="text-muted-foreground">Ambulance: <span className="text-foreground font-medium">110</span></li>
              <li className="text-muted-foreground">Fire: <span className="text-foreground font-medium">111</span></li>
              <li className="text-muted-foreground">DMC Hotline: <span className="text-foreground font-medium">117</span></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 SafeLanka. All rights reserved.</p>
          <p>Ministry of Disaster Management, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
