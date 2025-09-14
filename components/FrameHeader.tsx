'use client';

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { useAuthenticate } from '@coinbase/onchainkit/minikit';
import { User, Settings, Wallet } from 'lucide-react';
import { useApp, appActions } from '@/lib/store';

export function FrameHeader() {
  const { state, dispatch } = useApp();
  const { context } = useMiniKit();
  const { user } = useAuthenticate();

  const displayName = state.currentUser?.displayName ||
                     context?.user?.displayName ||
                     user?.displayName ||
                     'Creator';

  const walletAddress = state.currentUser?.walletAddress ||
                       context?.user?.walletAddress ||
                       user?.walletAddress;

  // Initialize user data
  useEffect(() => {
    if (!state.currentUser && (context?.user || user)) {
      const userData = context?.user || user;
      if (userData) {
        dispatch(appActions.setUser({
          creatorId: userData.fid?.toString() || `fc_${Date.now()}`,
          walletAddress: userData.walletAddress || '',
          displayName: userData.displayName || 'Creator',
          bio: '',
          revenueSharePercentage: 15,
          totalRevenue: 0,
          totalContent: 0,
          followersCount: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }));
      }
    }
  }, [context, user, state.currentUser, dispatch]);

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
            <div className="flex items-center space-x-2">
              <p className="text-white/70 text-sm">Creator Dashboard</p>
              {walletAddress && (
                <div className="flex items-center space-x-1 text-white/60 text-xs">
                  <Wallet className="w-3 h-3" />
                  <span>{formatWalletAddress(walletAddress)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors duration-200">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Stats Row */}
      {state.currentUser && (
        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-lg font-semibold text-white">
              {state.currentUser.totalContent}
            </div>
            <div className="text-xs text-white/70">Content</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-400">
              ${state.currentUser.totalRevenue.toFixed(2)}
            </div>
            <div className="text-xs text-white/70">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-400">
              {state.currentUser.followersCount}
            </div>
            <div className="text-xs text-white/70">Followers</div>
          </div>
        </div>
      )}
    </header>
  );
}
