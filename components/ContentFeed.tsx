'use client';

import { useState, useEffect } from 'react';
import { ContentCard } from './ContentCard';
import { Plus, Filter } from 'lucide-react';
import type { ContentPiece } from '@/lib/types';

export function ContentFeed() {
  const [content, setContent] = useState<ContentPiece[]>([]);
  const [filter, setFilter] = useState<'all' | 'mine' | 'remixes'>('all');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockContent: ContentPiece[] = [
      {
        contentId: '1',
        creatorId: 'creator1',
        title: 'Digital Art Collection: Neon Dreams',
        description: 'A vibrant collection of digital artworks',
        mediaUrl: '/mock-content-1.jpg',
        creationTimestamp: Date.now() - 3600000,
        monetizationEnabled: true,
        currentRevenue: 245.50,
        revenueSharePercentage: 15,
      },
      {
        contentId: '2',
        creatorId: 'creator2',
        title: 'Music Track: Synthwave Sunset',
        description: 'An atmospheric synthwave composition',
        mediaUrl: '/mock-content-2.jpg',
        creationTimestamp: Date.now() - 7200000,
        monetizationEnabled: true,
        currentRevenue: 189.25,
        revenueSharePercentage: 20,
      },
      {
        contentId: '3',
        creatorId: 'creator1',
        title: 'Video Tutorial: Creative Process',
        description: 'Behind the scenes of my creative workflow',
        mediaUrl: '/mock-content-3.jpg',
        creationTimestamp: Date.now() - 86400000,
        monetizationEnabled: true,
        currentRevenue: 312.75,
        revenueSharePercentage: 10,
      },
    ];
    setContent(mockContent);
  }, []);

  const filteredContent = content.filter(item => {
    switch (filter) {
      case 'mine':
        return item.creatorId === 'creator1'; // Mock current user
      case 'remixes':
        return false; // No remixes in mock data
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Content Feed</h2>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white/10 text-white text-sm rounded-md px-3 py-1 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Content</option>
            <option value="mine">My Content</option>
            <option value="remixes">Remixes</option>
          </select>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md transition-colors duration-200">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredContent.map((item) => (
          <ContentCard
            key={item.contentId}
            content={item}
            variant="creator"
          />
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="glass-effect rounded-lg p-8 text-center">
          <p className="text-white/70 text-sm mb-4">No content found</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
            Create Your First Content
          </button>
        </div>
      )}
    </div>
  );
}
