'use client';

import { useState } from 'react';
import { Share2, Zap, Plus, Users } from 'lucide-react';
import { ShareConfigurator } from './ShareConfigurator';

interface ActionButtonsProps {
  variant?: 'remix' | 'engage';
}

export function ActionButtons({ variant = 'engage' }: ActionButtonsProps) {
  const [showConfigurator, setShowConfigurator] = useState(false);

  const handleConfigureShare = () => {
    setShowConfigurator(true);
  };

  const handleSaveShare = (percentage: number) => {
    console.log('Saving share percentage:', percentage);
    setShowConfigurator(false);
    // In real app, save to blockchain/API
  };

  if (showConfigurator) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowConfigurator(false)}
          className="text-white/70 text-sm hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <ShareConfigurator onSave={handleSaveShare} />
      </div>
    );
  }

  const actions = [
    {
      icon: Plus,
      label: 'Create Content',
      description: 'Upload new content with revenue sharing',
      color: 'from-purple-600 to-purple-700',
      onClick: () => console.log('Create content'),
    },
    {
      icon: Share2,
      label: 'Configure Split',
      description: 'Set your community revenue share',
      color: 'from-blue-600 to-blue-700',
      onClick: handleConfigureShare,
    },
    {
      icon: Zap,
      label: 'Enhance Content',
      description: 'Add special effects and features',
      color: 'from-yellow-600 to-orange-600',
      onClick: () => console.log('Enhance content'),
    },
    {
      icon: Users,
      label: 'Community Hub',
      description: 'Engage with your creator community',
      color: 'from-green-600 to-emerald-600',
      onClick: () => console.log('Community hub'),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
      
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="glass-effect rounded-lg p-4 hover:bg-white/20 transition-all duration-200 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">
                  {action.label}
                </h3>
                <p className="text-white/70 text-xs mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
