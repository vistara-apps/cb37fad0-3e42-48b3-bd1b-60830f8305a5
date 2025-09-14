export const REVENUE_SHARE_OPTIONS = [
  { value: 5, label: '5%' },
  { value: 10, label: '10%' },
  { value: 15, label: '15%' },
  { value: 20, label: '20%' },
  { value: 25, label: '25%' },
];

export const ENHANCEMENT_TYPES = [
  'Special Effects',
  'Exclusive Intro',
  'Custom Overlay',
  'Audio Enhancement',
  'Visual Filter',
];

export const CONTENT_CATEGORIES = [
  'Art',
  'Music',
  'Video',
  'Writing',
  'Photography',
  'Design',
];

export const TRANSACTION_TYPES = {
  REVENUE_SHARE: 'revenue_share',
  ENHANCEMENT: 'enhancement',
  REMIX_PAYMENT: 'remix_payment',
} as const;
