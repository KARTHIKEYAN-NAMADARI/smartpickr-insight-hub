
import React from 'react';
import { cn } from '@/lib/utils';

interface RatingCircleProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
}

const RatingCircle: React.FC<RatingCircleProps> = ({
  rating,
  maxRating = 10,
  size = 'md',
  className,
  showValue = true,
}) => {
  const normalizedRating = Math.min(Math.max(rating, 0), maxRating);
  const percentage = (normalizedRating / maxRating) * 100;
  
  // Calculate color based on rating
  let colorClass = '';
  if (percentage >= 75) {
    colorClass = 'text-green-500';
  } else if (percentage >= 60) {
    colorClass = 'text-yellow-500';
  } else {
    colorClass = 'text-red-500';
  }

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div 
      className={cn(
        'rating-circle relative rounded-full flex items-center justify-center font-bold',
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      <svg 
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 36 36"
      >
        <circle 
          cx="18" 
          cy="18" 
          r="16" 
          fill="none" 
          className="stroke-muted stroke-[2]" 
        />
        <circle 
          cx="18" 
          cy="18" 
          r="16" 
          fill="none" 
          className={`stroke-current stroke-[3]`}
          strokeDasharray="100"
          strokeDashoffset={100 - percentage}
          strokeLinecap="round"
        />
      </svg>
      {showValue && (
        <span className="relative z-10">
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingCircle;
