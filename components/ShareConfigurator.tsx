'use client';

import { useState } from 'react';
import { Slider } from './ui/Slider';
import { Button } from './ui/Button';
import { REVENUE_SHARE_OPTIONS } from '@/lib/constants';
import { formatPercentage } from '@/lib/utils';

interface ShareConfiguratorProps {
  variant?: 'revenueSplit';
  onSave?: (percentage: number) => void;
}

export function ShareConfigurator({ variant = 'revenueSplit', onSave }: ShareConfiguratorProps) {
  const [sharePercentage, setSharePercentage] = useState(15);
  const [isCustom, setIsCustom] = useState(false);

  const handleSave = () => {
    onSave?.(sharePercentage);
  };

  return (
    <div className="glass-effect rounded-lg p-6 space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-2">
          Configure Revenue Share
        </h3>
        <p className="text-white/70 text-sm">
          Set how much of your content revenue to share with your community
        </p>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {formatPercentage(sharePercentage)}
          </div>
          <p className="text-white/70 text-sm">
            Community Share
          </p>
        </div>

        {!isCustom ? (
          <div className="grid grid-cols-3 gap-2">
            {REVENUE_SHARE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSharePercentage(option.value)}
                className={`p-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                  sharePercentage === option.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <Slider
              value={[sharePercentage]}
              onValueChange={(value) => setSharePercentage(value[0])}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70">
              <span>1%</span>
              <span>50%</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCustom(!isCustom)}
          className="w-full text-center text-purple-400 text-sm hover:text-purple-300 transition-colors duration-200"
        >
          {isCustom ? 'Use Presets' : 'Custom Percentage'}
        </button>
      </div>

      <div className="bg-white/5 rounded-md p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Your Share:</span>
          <span className="text-white font-medium">
            {formatPercentage(100 - sharePercentage)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Community Share:</span>
          <span className="text-green-400 font-medium">
            {formatPercentage(sharePercentage)}
          </span>
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        Save Configuration
      </Button>
    </div>
  );
}
