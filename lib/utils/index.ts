import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for combining Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency values
export function formatCurrency(amount: number, currency = 'ETH'): string {
  if (amount >= 1) {
    return `${amount.toFixed(2)} ${currency}`;
  } else if (amount >= 0.01) {
    return `${amount.toFixed(4)} ${currency}`;
  } else {
    return `< 0.01 ${currency}`;
  }
}

// Format time ago
export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

// Generate unique IDs
export function generateId(prefix = ''): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}${timestamp}_${random}`;
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get content type from file extension
export function getContentTypeFromExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const typeMap: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'pdf': 'application/pdf',
  };

  return typeMap[ext || ''] || 'application/octet-stream';
}

// Calculate engagement score
export function calculateEngagementScore(
  likes: number,
  comments: number,
  shares: number,
  views: number
): number {
  // Simple engagement score calculation
  return (likes * 1) + (comments * 2) + (shares * 3) + (views * 0.1);
}

// Validate content URL
export function isValidContentUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Generate content hash (simple implementation)
export function generateContentHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

// Sleep utility for async operations
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if running on client side
export const isClient = typeof window !== 'undefined';

// Check if running on server side
export const isServer = typeof window === 'undefined';

// Local storage helpers (client-side only)
export const storage = {
  get: (key: string): string | null => {
    if (!isClient) return null;
    return localStorage.getItem(key);
  },
  set: (key: string, value: string): void => {
    if (!isClient) return;
    localStorage.setItem(key, value);
  },
  remove: (key: string): void => {
    if (!isClient) return;
    localStorage.removeItem(key);
  },
  clear: (): void => {
    if (!isClient) return;
    localStorage.clear();
  },
};

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Calculate revenue share amount
export function calculateRevenueShare(totalAmount: number, percentage: number): number {
  return (totalAmount * percentage) / 100;
}

// Validate email (basic)
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate random color for avatars
export function generateAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// Check if content is monetizable
export function isContentMonetizable(content: any): boolean {
  return content.monetizationEnabled &&
         content.status === 'published' &&
         content.revenueSharePercentage > 0;
}

// Get content status color
export function getStatusColor(status: string): string {
  const colors = {
    draft: 'text-gray-500',
    published: 'text-green-500',
    archived: 'text-red-500',
  };
  return colors[status as keyof typeof colors] || 'text-gray-500';
}

// Format transaction hash for display
export function formatTransactionHash(hash: string): string {
  if (hash.length <= 10) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

