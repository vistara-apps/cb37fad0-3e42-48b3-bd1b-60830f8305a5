// Smart contract ABIs and addresses for CreatorDAO Share

export const CONTRACT_ADDRESSES = {
  // Base network contract addresses
  base: {
    revenueShare: '0x1234567890123456789012345678901234567890', // Placeholder
    contentRegistry: '0x0987654321098765432109876543210987654321', // Placeholder
    enhancementMarket: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', // Placeholder
  },
  // Base Sepolia testnet
  baseSepolia: {
    revenueShare: '0x1234567890123456789012345678901234567890', // Placeholder
    contentRegistry: '0x0987654321098765432109876543210987654321', // Placeholder
    enhancementMarket: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', // Placeholder
  },
} as const;

export const REVENUE_SHARE_ABI = [
  // Revenue Share Contract ABI
  {
    inputs: [
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'uint256', name: 'percentage', type: 'uint256' },
      { internalType: 'string', name: 'contentId', type: 'string' },
    ],
    name: 'setRevenueShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'contentId', type: 'string' },
      { internalType: 'address', name: 'contributor', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'distributeRevenue',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'contentId', type: 'string' }],
    name: 'getRevenueShare',
    outputs: [
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'uint256', name: 'percentage', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'contentId', type: 'string' }],
    name: 'getTotalRevenue',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const CONTENT_REGISTRY_ABI = [
  // Content Registry Contract ABI
  {
    inputs: [
      { internalType: 'string', name: 'contentId', type: 'string' },
      { internalType: 'string', name: 'metadata', type: 'string' },
      { internalType: 'string', name: 'contentHash', type: 'string' },
    ],
    name: 'registerContent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'contentId', type: 'string' }],
    name: 'getContent',
    outputs: [
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'string', name: 'metadata', type: 'string' },
      { internalType: 'string', name: 'contentHash', type: 'string' },
      { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'originalContentId', type: 'string' },
      { internalType: 'string', name: 'remixContentId', type: 'string' },
      { internalType: 'address', name: 'remixer', type: 'address' },
    ],
    name: 'registerRemix',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

export const ENHANCEMENT_MARKET_ABI = [
  // Enhancement Market Contract ABI
  {
    inputs: [
      { internalType: 'string', name: 'contentId', type: 'string' },
      { internalType: 'string', name: 'enhancementType', type: 'string' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
    ],
    name: 'createEnhancementOffer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'enhancementId', type: 'string' },
    ],
    name: 'purchaseEnhancement',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'enhancementId', type: 'string' }],
    name: 'getEnhancement',
    outputs: [
      { internalType: 'address', name: 'creator', type: 'address' },
      { internalType: 'string', name: 'contentId', type: 'string' },
      { internalType: 'string', name: 'enhancementType', type: 'string' },
      { internalType: 'uint256', name: 'cost', type: 'uint256' },
      { internalType: 'bool', name: 'purchased', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Contract event signatures
export const CONTRACT_EVENTS = {
  RevenueDistributed: 'RevenueDistributed(string,address,uint256)',
  ContentRegistered: 'ContentRegistered(string,address,string)',
  RemixRegistered: 'RemixRegistered(string,string,address)',
  EnhancementPurchased: 'EnhancementPurchased(string,address,uint256)',
} as const;

// Gas estimation constants
export const GAS_ESTIMATES = {
  setRevenueShare: 150000,
  distributeRevenue: 200000,
  registerContent: 180000,
  registerRemix: 160000,
  createEnhancementOffer: 170000,
  purchaseEnhancement: 190000,
} as const;

