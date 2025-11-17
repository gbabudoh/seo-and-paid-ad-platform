'use client';

import Card from '@/src/components/ui/Card';

interface ClientHealthScoreProps {
  score: number; // 0-100
  label?: string;
}

export default function ClientHealthScore({ score, label = 'Health Score' }: ClientHealthScoreProps) {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  return (
    <Card>
      <Card.Content>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{label}</p>
            <p className={`text-4xl font-bold ${getColor(score)}`}>{score}</p>
            <p className={`text-sm font-medium ${getColor(score)}`}>{getStatus(score)}</p>
          </div>
          <div className="relative h-24 w-24">
            <svg className="h-24 w-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                className={getColor(score)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${getColor(score)}`}>{score}%</span>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

