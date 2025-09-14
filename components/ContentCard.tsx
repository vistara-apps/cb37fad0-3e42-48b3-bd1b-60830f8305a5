'use client';

import { useState } from 'react';
import { Heart, Share, Zap, Play, MoreHorizontal } from 'lucide-react';
import { formatCurrency, timeAgo } from '@/lib/utils';
import type { ContentPiece } from '@/lib/types';

interface ContentCardProps {
  content: ContentPiece;
  variant?: 'creator' | 'remix';
}

export function ContentCard({ content, variant = 'creator' }: ContentCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="glass-effect rounded-lg overflow-hidden hover:bg-white/20 transition-all duration-200">
      {/* Content Preview */}
      <div className="relative aspect-video bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <Play className="w-12 h-12 text-white/80" />
        {variant === 'remix' && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-medium">
            Remix
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          {formatCurrency(content.currentRevenue)}
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm line-clamp-2">
              {content.title}
            </h3>
            <p className="text-white/70 text-xs mt-1">
              {timeAgo(content.creationTimestamp)}
            </p>
          </div>
          <button className="p-1 hover:bg-white/10 rounded-md">
            <MoreHorizontal className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Revenue Share Badge */}
        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {content.revenueSharePercentage}% shared
          </div>
          <div className="flex items-center space-x-1 text-white/70 text-xs">
            <Zap className="w-3 h-3" />
            <span>Active</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs transition-colors duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs bg-white/10 text-white/70 hover:bg-white/20 transition-colors duration-200">
            <Share className="w-3 h-3" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
