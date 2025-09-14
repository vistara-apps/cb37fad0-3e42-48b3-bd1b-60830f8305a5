// Application constants for CreatorDAO Share

export const APP_CONFIG = {
  name: 'CreatorDAO Share',
  description: 'Empower creators with revenue-sharing and community engagement on Base.',
  version: '1.0.0',
  maxContentTitleLength: 100,
  maxContentDescriptionLength: 500,
  maxTagsPerContent: 10,
  maxTagLength: 20,
  defaultRevenueSharePercentage: 15,
  maxRevenueSharePercentage: 50,
  minRevenueSharePercentage: 1,
} as const;

export const REVENUE_SHARE_OPTIONS = [
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' },
  { value: 25, label: '25%' },
  { value: 30, label: '30%' },
] as const;

export const CONTENT_CATEGORIES = [
  'Digital Art',
  'Music',
  'Video',
  'Photography',
  'Writing',
  'Design',
  'Animation',
  'NFT',
  'Tutorial',
  'Other',
] as const;

export const ENHANCEMENT_TYPES = [
  { value: 'filter', label: 'Visual Filter', description: 'Apply artistic filters to your content' },
  { value: 'effect', label: 'Special Effect', description: 'Add dynamic effects and animations' },
  { value: 'overlay', label: 'Text Overlay', description: 'Add text, captions, or branding' },
  { value: 'text', label: 'Typography', description: 'Custom text styling and fonts' },
  { value: 'audio', label: 'Audio Enhancement', description: 'Background music or sound effects' },
  { value: 'custom', label: 'Custom Enhancement', description: 'Unique modifications' },
] as const;

export const CONTENT_TYPES = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  video: ['mp4', 'webm', 'mov', 'avi'],
  audio: ['mp3', 'wav', 'flac', 'aac'],
  text: ['txt', 'md', 'pdf'],
} as const;

export const NOTIFICATION_TYPES = {
  revenue_received: {
    title: 'Revenue Received',
    color: 'text-green-400',
    icon: '💰',
  },
  content_remixed: {
    title: 'Content Remixed',
    color: 'text-blue-400',
    icon: '🔄',
  },
  enhancement_applied: {
    title: 'Enhancement Applied',
    color: 'text-purple-400',
    icon: '✨',
  },
  poll_ended: {
    title: 'Poll Ended',
    color: 'text-orange-400',
    icon: '📊',
  },
  system: {
    title: 'System Notification',
    color: 'text-gray-400',
    icon: 'ℹ️',
  },
} as const;

export const POLL_DURATION_OPTIONS = [
  { value: 3600000, label: '1 hour' },     // 1 hour
  { value: 86400000, label: '1 day' },     // 1 day
  { value: 604800000, label: '1 week' },   // 1 week
  { value: 2592000000, label: '1 month' }, // 1 month
] as const;

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;

export const API_RATE_LIMITS = {
  contentCreation: { requests: 10, windowMs: 3600000 }, // 10 per hour
  remixCreation: { requests: 10, windowMs: 3600000 },   // 10 per hour
  enhancementCreation: { requests: 20, windowMs: 3600000 }, // 20 per hour
  revenueShareUpdate: { requests: 5, windowMs: 3600000 }, // 5 per hour
  generalApi: { requests: 100, windowMs: 60000 }, // 100 per minute
} as const;

export const STORAGE_CONFIG = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/webm',
    'audio/mpeg',
    'audio/wav',
    'application/pdf',
  ],
  ipfsGateway: 'https://ipfs.io/ipfs/',
  arweaveGateway: 'https://arweave.net/',
} as const;

export const CONTRACT_CONFIG = {
  gasMultiplier: 1.2, // 20% buffer for gas estimation
  defaultGasLimit: 300000,
  confirmationBlocks: 1,
} as const;

export const SOCIAL_PLATFORMS = {
  farcaster: {
    name: 'Farcaster',
    icon: '🟣',
    baseUrl: 'https://warpcast.com/',
  },
  twitter: {
    name: 'Twitter',
    icon: '🐦',
    baseUrl: 'https://twitter.com/',
  },
  lens: {
    name: 'Lens',
    icon: '👁️',
    baseUrl: 'https://lens.xyz/',
  },
} as const;

export const THEME_COLORS = {
  primary: 'hsl(210 40% 98%)',
  accent: 'hsl(208 100% 60%)',
  background: 'hsl(210 40% 98%)',
  surface: 'hsl(210 40% 100%)',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',
} as const;

