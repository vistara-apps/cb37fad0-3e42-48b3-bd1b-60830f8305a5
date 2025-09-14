'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Share2, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { useApp, selectors } from '@/lib/store';
import type { RevenueStats } from '@/lib/types';

export function RevenueStats() {
  const { state } = useApp();
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeCreators: 0,
    totalShares: 0,
    pendingDistributions: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Calculate stats from current state
      const totalRevenue = selectors.getTotalRevenue(state);
      const userContent = selectors.getUserContent(state);
      const totalShares = userContent.reduce((sum, content) => sum + content.revenueSharePercentage, 0);
      const totalEngagements = userContent.reduce((sum, content) => sum + content.engagementCount, 0);

      // Mock additional stats (in real app, fetch from API)
      const mockStats: RevenueStats = {
        totalRevenue,
        monthlyGrowth: 23.8,
        activeCreators: 142,
        totalShares,
        pendingDistributions: Math.floor(totalRevenue * 0.1), // 10% pending
        totalTransactions: totalEngagements,
      };

      setStats(mockStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [state.content, state.currentUser]);

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: stats.totalRevenue > 0 ? '+12.5%' : '0%',
      description: 'From content monetization',
    },
    {
      title: 'Monthly Growth',
      value: formatPercentage(stats.monthlyGrowth),
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      change: '+5.2%',
      description: 'Revenue growth this month',
    },
    {
      title: 'Active Creators',
      value: stats.activeCreators.toString(),
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      change: '+8 new',
      description: 'Creators in your network',
    },
    {
      title: 'Revenue Shares',
      value: stats.totalShares.toString(),
      icon: Share2,
      color: 'from-pink-500 to-rose-500',
      change: `+${Math.floor(stats.totalShares * 0.1)} today`,
      description: 'Total share percentage',
    },
  ];

  if (error) {
    return (
      <div className="glass-effect rounded-lg p-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-400 text-sm mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Revenue Overview</h2>
        <div className="flex items-center space-x-2">
          <div className="glass-effect rounded-full px-3 py-1">
            <span className="text-white/80 text-xs">Live</span>
          </div>
          <button
            onClick={fetchStats}
            disabled={loading}
            className="p-2 hover:bg-white/10 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-white/70 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="glass-effect rounded-lg p-4 hover:bg-white/20 transition-all duration-200 animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-md flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-green-400 text-xs font-medium">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-white text-lg font-semibold">{stat.value}</p>
              <p className="text-white/70 text-xs">{stat.title}</p>
              <p className="text-white/50 text-xs mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="glass-effect rounded-lg p-4">
        <h3 className="text-white font-medium text-sm mb-3">Additional Metrics</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Pending Distributions</span>
            <span className="text-yellow-400 font-medium">
              {formatCurrency(stats.pendingDistributions)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Total Transactions</span>
            <span className="text-blue-400 font-medium">
              {stats.totalTransactions}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Average Share</span>
            <span className="text-purple-400 font-medium">
              {stats.totalShares > 0 ? formatPercentage(stats.totalShares / Math.max(state.content.length, 1)) : '0%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
