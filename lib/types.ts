export interface Creator {
  creatorId: string;
  walletAddress: string;
  displayName: string;
  bio: string;
  profileImage?: string;
  revenueSharePercentage: number;
  totalRevenue: number;
  totalContent: number;
  followersCount: number;
  createdAt: number;
  updatedAt: number;
  socialLinks?: {
    farcaster?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ContentPiece {
  contentId: string;
  creatorId: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'audio' | 'text';
  creationTimestamp: number;
  monetizationEnabled: boolean;
  currentRevenue: number;
  revenueSharePercentage: number;
  tags: string[];
  category: string;
  isRemix: boolean;
  originalContentId?: string;
  remixCount: number;
  engagementCount: number;
  status: 'draft' | 'published' | 'archived';
  ipfsHash?: string;
  arweaveHash?: string;
}

export interface Remix {
  remixId: string;
  originalContentId: string;
  remixingCreatorId: string;
  remixContentUrl: string;
  remixTimestamp: number;
  revenueSharePercentage: number;
  description: string;
  approved: boolean;
  ipfsHash?: string;
  arweaveHash?: string;
}

export interface Enhancement {
  enhancementId: string;
  contentId: string;
  appliedByCreatorId: string;
  enhancementType: 'filter' | 'effect' | 'overlay' | 'text' | 'audio' | 'custom';
  enhancementDetails: string;
  appliedTimestamp: number;
  cost: number;
  approved: boolean;
  ipfsHash?: string;
}

export interface Transaction {
  transactionId: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
  timestamp: number;
  contentId: string;
  transactionType: 'revenue_share' | 'enhancement_purchase' | 'remix_payment' | 'platform_fee';
  transactionHash?: string;
  status: 'pending' | 'completed' | 'failed';
  gasUsed?: number;
}

export interface RevenueStats {
  totalRevenue: number;
  monthlyGrowth: number;
  activeCreators: number;
  totalShares: number;
  pendingDistributions: number;
  totalTransactions: number;
}

export interface Engagement {
  engagementId: string;
  contentId: string;
  userId: string;
  engagementType: 'like' | 'comment' | 'share' | 'remix' | 'enhance';
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface CommunityPoll {
  pollId: string;
  creatorId: string;
  contentId?: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
  endTime: number;
  createdAt: number;
  status: 'active' | 'ended';
}

export interface Notification {
  notificationId: string;
  userId: string;
  type: 'revenue_received' | 'content_remixed' | 'enhancement_applied' | 'poll_ended' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  actionUrl?: string;
}

// API Request/Response types
export interface CreateContentRequest {
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: ContentPiece['mediaType'];
  monetizationEnabled: boolean;
  revenueSharePercentage: number;
  tags: string[];
  category: string;
}

export interface UpdateRevenueShareRequest {
  contentId: string;
  revenueSharePercentage: number;
}

export interface CreateRemixRequest {
  originalContentId: string;
  remixContentUrl: string;
  description: string;
  revenueSharePercentage: number;
}

export interface CreateEnhancementRequest {
  contentId: string;
  enhancementType: Enhancement['enhancementType'];
  enhancementDetails: string;
  cost: number;
}

export interface FrameActionPayload {
  action: 'configure_revenue' | 'create_remix' | 'purchase_enhancement' | 'vote_poll';
  data: Record<string, any>;
  userId: string;
  timestamp: number;
}

// Web3 types
export interface ContractAddresses {
  revenueShare: string;
  contentRegistry: string;
  enhancementMarket: string;
}

export interface TransactionResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  gasUsed?: bigint;
}

// Storage types
export interface StorageUploadResult {
  success: boolean;
  url?: string;
  hash?: string;
  error?: string;
}

// Analytics types
export interface ContentAnalytics {
  contentId: string;
  views: number;
  engagement: number;
  revenue: number;
  remixes: number;
  enhancements: number;
  timeRange: 'day' | 'week' | 'month' | 'year';
}
