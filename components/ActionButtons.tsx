'use client';

import { useState } from 'react';
import { Share2, Zap, Plus, Users, MessageSquare, BarChart3, Settings, Heart } from 'lucide-react';
import { ShareConfigurator } from './ShareConfigurator';
import { useApp, appActions } from '@/lib/store';

interface ActionButtonsProps {
  variant?: 'remix' | 'engage';
  contentId?: string;
}

export function ActionButtons({ variant = 'engage', contentId }: ActionButtonsProps) {
  const { state, dispatch } = useApp();
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEngagement, setShowEngagement] = useState(false);

  const handleConfigureShare = () => {
    setShowConfigurator(true);
  };

  const handleSaveShare = async (percentage: number) => {
    if (!contentId) return;

    try {
      dispatch(appActions.setLoading('content', true));

      const response = await fetch(`/api/content/${contentId}/revenue-share`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': state.currentUser?.creatorId || 'anonymous',
        },
        body: JSON.stringify({
          contentId,
          revenueSharePercentage: percentage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update revenue share');
      }

      // Update local state
      const currentContent = state.content.find(c => c.contentId === contentId);
      if (currentContent) {
        dispatch(appActions.updateContent({
          ...currentContent,
          revenueSharePercentage: percentage,
        }));
      }

      setShowConfigurator(false);
    } catch (error) {
      console.error('Error updating revenue share:', error);
    } finally {
      dispatch(appActions.setLoading('content', false));
    }
  };

  const handleCreateEngagement = async (type: 'like' | 'comment' | 'share') => {
    if (!contentId || !state.currentUser) return;

    try {
      const response = await fetch('/api/engagement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': state.currentUser.creatorId,
        },
        body: JSON.stringify({
          contentId,
          engagementType: type,
          userId: state.currentUser.creatorId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create engagement');
      }

      // Update local content engagement count
      const currentContent = state.content.find(c => c.contentId === contentId);
      if (currentContent) {
        dispatch(appActions.updateContent({
          ...currentContent,
          engagementCount: currentContent.engagementCount + 1,
        }));
      }
    } catch (error) {
      console.error('Error creating engagement:', error);
    }
  };

  const handleCreatePoll = () => {
    // In a real app, this would open a poll creation modal
    console.log('Create community poll');
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

  if (showCreateForm) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowCreateForm(false)}
          className="text-white/70 text-sm hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <CreateContentForm onClose={() => setShowCreateForm(false)} />
      </div>
    );
  }

  if (showEngagement) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowEngagement(false)}
          className="text-white/70 text-sm hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
        <EngagementPanel contentId={contentId} onEngage={handleCreateEngagement} />
      </div>
    );
  }

  const actions = [
    {
      icon: Plus,
      label: 'Create Content',
      description: 'Upload new content with revenue sharing',
      color: 'from-purple-600 to-purple-700',
      onClick: () => setShowCreateForm(true),
    },
    {
      icon: Share2,
      label: 'Configure Split',
      description: 'Set your community revenue share',
      color: 'from-blue-600 to-blue-700',
      onClick: handleConfigureShare,
      disabled: !contentId,
    },
    {
      icon: Zap,
      label: 'Enhance Content',
      description: 'Add special effects and features',
      color: 'from-yellow-600 to-orange-600',
      onClick: () => console.log('Enhance content'),
      disabled: !contentId,
    },
    {
      icon: Heart,
      label: 'Engage Community',
      description: 'Like, comment, and share content',
      color: 'from-pink-600 to-rose-600',
      onClick: () => setShowEngagement(true),
      disabled: !contentId,
    },
    {
      icon: MessageSquare,
      label: 'Community Poll',
      description: 'Create polls for community input',
      color: 'from-green-600 to-emerald-600',
      onClick: handleCreatePoll,
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      description: 'Track your content performance',
      color: 'from-indigo-600 to-blue-600',
      onClick: () => console.log('View analytics'),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Quick Actions</h2>

      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`glass-effect rounded-lg p-4 hover:bg-white/20 transition-all duration-200 text-left group ${
              action.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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

// Create Content Form Component
function CreateContentForm({ onClose }: { onClose: () => void }) {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image' as const,
    monetizationEnabled: true,
    revenueSharePercentage: 15,
    tags: [] as string[],
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'creator1', // Mock user ID
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create content');
      }

      const newContent = await response.json();
      dispatch(appActions.addContent(newContent.data));

      onClose();
    } catch (error) {
      console.error('Error creating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-effect rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Create New Content</h3>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Content Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
          required
        />

        <input
          type="url"
          placeholder="Media URL"
          value={formData.mediaUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, mediaUrl: e.target.value }))}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <select
          value={formData.mediaType}
          onChange={(e) => setFormData(prev => ({ ...prev, mediaType: e.target.value as any }))}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="text">Text</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
          }))}
          className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="monetization"
            checked={formData.monetizationEnabled}
            onChange={(e) => setFormData(prev => ({ ...prev, monetizationEnabled: e.target.checked }))}
            className="rounded border-white/20"
          />
          <label htmlFor="monetization" className="text-white/70 text-sm">
            Enable monetization
          </label>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Content'}
        </button>
      </div>
    </form>
  );
}

// Engagement Panel Component
function EngagementPanel({
  contentId,
  onEngage
}: {
  contentId?: string;
  onEngage: (type: 'like' | 'comment' | 'share') => void;
}) {
  const [comment, setComment] = useState('');

  const handleComment = () => {
    if (comment.trim()) {
      onEngage('comment');
      setComment('');
    }
  };

  return (
    <div className="glass-effect rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">Engage with Content</h3>

      <div className="space-y-3">
        <button
          onClick={() => onEngage('like')}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-4 py-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Heart className="w-5 h-5" />
          <span>Like Content</span>
        </button>

        <div className="space-y-2">
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white/10 text-white rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 resize-none"
          />
          <button
            onClick={handleComment}
            disabled={!comment.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            Post Comment
          </button>
        </div>

        <button
          onClick={() => onEngage('share')}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Content</span>
        </button>
      </div>
    </div>
  );
}
