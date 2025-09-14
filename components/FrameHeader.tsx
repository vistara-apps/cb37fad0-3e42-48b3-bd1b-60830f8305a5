'use client';

import { User, Settings } from 'lucide-react';

export function FrameHeader() {
  // TODO: Implement proper user context hooks when available
  const displayName = 'Creator';

  return (
    <header className="glass-effect rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              {displayName}
            </h1>
            <p className="text-white/70 text-sm">Creator Dashboard</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors duration-200">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
}
