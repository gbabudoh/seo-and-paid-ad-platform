import Card from '@/src/components/ui/Card';
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  trend = 'neutral',
}: MetricCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <Card.Content>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            {change !== undefined && (
              <p className={`mt-1 text-sm ${getTrendColor()}`}>
                {change > 0 ? '+' : ''}
                {change}% {changeLabel && `vs ${changeLabel}`}
              </p>
            )}
          </div>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
      </Card.Content>
    </Card>
  );
}

