'use client';

import { useState, useEffect } from 'react';
import { ContentCard } from './ContentCard';
import { Plus, Filter, Loader2 } from 'lucide-react';
import type { ContentPiece } from '@/lib/types';

interface ContentFeedProps {
  creatorId?: string;
  showCreateButton?: boolean;
}

export function ContentFeed({ creatorId, showCreateButton = true }: ContentFeedProps) {
  const [content, setContent] = useState<ContentPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'mine' | 'remixes'>('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchContent = async (pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '10',
      });

      if (creatorId) {
        params.set('creatorId', creatorId);
      }

      const response = await fetch(`/api/content?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch content');
      }

      const newContent = data.data || [];

      if (append) {
        setContent(prev => [...prev, ...newContent]);
      } else {
        setContent(newContent);
      }

      setHasMore(newContent.length === 10 && data.pagination.totalPages > pageNum);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(1, false);
  }, [creatorId]);

  useEffect(() => {
    if (page > 1) {
      fetchContent(page, true);
    }
  }, [page]);

  const filteredContent = content.filter(item => {
    switch (filter) {
      case 'mine':
        return item.creatorId === creatorId; // Use passed creatorId
      case 'remixes':
        return item.isRemix;
      default:
        return true;
    }
  });

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="glass-effect rounded-lg p-8 text-center">
        <p className="text-red-400 text-sm mb-4">{error}</p>
        <button
          onClick={() => fetchContent(1, false)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          {creatorId ? 'Creator Content' : 'Content Feed'}
        </h2>
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
          {showCreateButton && (
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-md transition-colors duration-200">
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredContent.map((item) => (
          <ContentCard
            key={item.contentId}
            content={item}
            variant={item.isRemix ? 'remix' : 'creator'}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-white/70 animate-spin" />
        </div>
      )}

      {filteredContent.length === 0 && !loading && (
        <div className="glass-effect rounded-lg p-8 text-center">
          <p className="text-white/70 text-sm mb-4">
            {filter === 'mine' ? 'You haven\'t created any content yet' :
             filter === 'remixes' ? 'No remixes found' :
             'No content found'}
          </p>
          {showCreateButton && (
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              {filter === 'mine' ? 'Create Your First Content' : 'Explore Content'}
            </button>
          )}
        </div>
      )}

      {hasMore && !loading && filteredContent.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="bg-white/10 hover:bg-white/20 text-white/70 hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
