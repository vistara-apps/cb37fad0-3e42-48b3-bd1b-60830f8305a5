import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// API Response utilities
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(error: string, statusCode = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status: statusCode }
  );
}

// Validation schemas
export const createContentSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  mediaUrl: z.string().url(),
  mediaType: z.enum(['image', 'video', 'audio', 'text']),
  monetizationEnabled: z.boolean(),
  revenueSharePercentage: z.number().min(0).max(100),
  tags: z.array(z.string()).max(10),
  category: z.string().min(1).max(50),
});

export const updateRevenueShareSchema = z.object({
  contentId: z.string(),
  revenueSharePercentage: z.number().min(0).max(100),
});

export const createRemixSchema = z.object({
  originalContentId: z.string(),
  remixContentUrl: z.string().url(),
  description: z.string().min(1).max(300),
  revenueSharePercentage: z.number().min(0).max(50),
});

export const createEnhancementSchema = z.object({
  contentId: z.string(),
  enhancementType: z.enum(['filter', 'effect', 'overlay', 'text', 'audio', 'custom']),
  enhancementDetails: z.string().min(1).max(200),
  cost: z.number().min(0),
});

// Authentication utilities
export async function getAuthenticatedUser(request: NextRequest): Promise<string | null> {
  // In a real app, this would verify JWT tokens, session cookies, etc.
  // For now, we'll use a simple header-based approach
  const userId = request.headers.get('x-user-id');
  return userId;
}

export function requireAuth(userId: string | null): asserts userId is string {
  if (!userId) {
    throw new Error('Authentication required');
  }
}

// Error handling
export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return createErrorResponse(error.message, error.statusCode);
  }

  if (error instanceof z.ZodError) {
    return createErrorResponse(
      `Validation error: ${error.errors.map(e => e.message).join(', ')}`,
      400
    );
  }

  return createErrorResponse('Internal server error', 500);
}

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, maxRequests = 100, windowMs = 60000): boolean {
  const now = Date.now();
  const windowKey = `${identifier}_${Math.floor(now / windowMs)}`;

  const current = rateLimitMap.get(windowKey) || { count: 0, resetTime: now + windowMs };

  if (now > current.resetTime) {
    current.count = 1;
    current.resetTime = now + windowMs;
  } else if (current.count >= maxRequests) {
    return false;
  } else {
    current.count++;
  }

  rateLimitMap.set(windowKey, current);
  return true;
}

// CORS headers
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-user-id',
};

// Pagination utilities
export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Cache utilities (simple in-memory cache)
const cache = new Map<string, { data: any; expiry: number }>();

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (!cached || Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }
  return cached.data;
}

export function setCachedData(key: string, data: any, ttlMs = 300000): void {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs,
  });
}

// Webhook utilities for Farcaster frames
export interface FrameWebhookPayload {
  untrustedData: {
    fid: number;
    url: string;
    messageHash: string;
    timestamp: number;
    network: number;
    buttonIndex: number;
    inputText?: string;
    state?: string;
  };
  trustedData: {
    messageBytes: string;
  };
}

export function validateFrameMessage(payload: FrameWebhookPayload): boolean {
  // In production, you would verify the frame message signature
  // For now, we'll do basic validation
  const { untrustedData } = payload;

  if (!untrustedData.fid || !untrustedData.url || !untrustedData.messageHash) {
    return false;
  }

  // Check if timestamp is within reasonable bounds (within last 5 minutes)
  const now = Date.now();
  const messageTime = untrustedData.timestamp * 1000;
  const fiveMinutes = 5 * 60 * 1000;

  return Math.abs(now - messageTime) < fiveMinutes;
}

