'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Share2, DollarSign } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import type { RevenueStats } from '@/lib/types';

export function RevenueStats() {
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 1250.75,
    monthlyGrowth: 23.8,
    activeCreators: 142,
    totalShares: 1847,
  });

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+12.5%',
    },
    {
      title: 'Monthly Growth',
      value: formatPercentage(stats.monthlyGrowth),
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      change: '+5.2%',
    },
    {
      title: 'Active Creators',
      value: stats.activeCreators.toString(),
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      change: '+8 new',
    },
    {
      title: 'Total Shares',
      value: stats.totalShares.toString(),
      icon: Share2,
      color: 'from-pink-500 to-rose-500',
      change: '+156 today',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Revenue Overview</h2>
        <div className="glass-effect rounded-full px-3 py-1">
          <span className="text-white/80 text-xs">Live</span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
