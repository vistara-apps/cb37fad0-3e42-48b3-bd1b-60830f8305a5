'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  min?: number;
  step?: number;
  className?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, max = 100, min = 0, step = 1, className }, ref) => {
    const [isDragging, setIsDragging] = useState(false);

    const percentage = ((value[0] - min) / (max - min)) * 100;

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newValue = Math.round((percentage / 100) * (max - min) + min);

      onValueChange([newValue]);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-6 cursor-pointer select-none', className)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Track */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/20 rounded-full transform -translate-y-1/2">
          {/* Range */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Thumb */}
        <div
          className="absolute top-1/2 w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
          style={{ left: `${percentage}%` }}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
