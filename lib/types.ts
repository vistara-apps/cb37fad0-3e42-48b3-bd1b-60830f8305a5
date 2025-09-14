export interface Creator {
  creatorId: string;
  walletAddress: string;
  displayName: string;
  bio: string;
  revenueSharePercentage: number;
}

export interface ContentPiece {
  contentId: string;
  creatorId: string;
  title: string;
  description: string;
  mediaUrl: string;
  creationTimestamp: number;
  monetizationEnabled: boolean;
  currentRevenue: number;
  revenueSharePercentage: number;
}

export interface Remix {
  remixId: string;
  originalContentId: string;
  remixingCreatorId: string;
  remixContentUrl: string;
  remixTimestamp: number;
  revenueSharePercentage: number;
}

export interface Enhancement {
  enhancementId: string;
  contentId: string;
  appliedByCreatorId: string;
  enhancementType: string;
  enhancementDetails: string;
  appliedTimestamp: number;
}

export interface Transaction {
  transactionId: string;
  fromWallet: string;
  toWallet: string;
  amount: number;
  timestamp: number;
  contentId: string;
  transactionType: 'revenue_share' | 'enhancement' | 'remix_payment';
}

export interface RevenueStats {
  totalRevenue: number;
  monthlyGrowth: number;
  activeCreators: number;
  totalShares: number;
}
