import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'gold' | 'green' | 'orange';
}

const colorClasses = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    icon: 'bg-primary text-primary-foreground',
  },
  gold: {
    bg: 'bg-accent/10',
    text: 'text-accent',
    icon: 'bg-accent text-accent-foreground',
  },
  green: {
    bg: 'bg-green/10',
    text: 'text-green',
    icon: 'bg-green text-primary-foreground',
  },
  orange: {
    bg: 'bg-orange/10',
    text: 'text-orange',
    icon: 'bg-orange text-primary-foreground',
  },
};

const StatsCard = ({ title, value, subtitle, icon: Icon, trend, color = 'primary' }: StatsCardProps) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card variant="elevated" className="p-6 hover-lift">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <div className={`text-sm font-medium ${trend.isPositive ? 'text-green' : 'text-destructive'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
