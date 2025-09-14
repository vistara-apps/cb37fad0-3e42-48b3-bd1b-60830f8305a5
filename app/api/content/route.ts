import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  createContentSchema,
  getAuthenticatedUser,
  requireAuth,
  checkRateLimit,
  createPaginatedResponse,
} from '@/lib/api';
import type { CreateContentRequest, ContentPiece } from '@/lib/types';

// GET /api/content - Get content feed with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const creatorId = searchParams.get('creatorId');
    const category = searchParams.get('category');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const query = searchParams.get('q');

    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`content_feed_${clientIp}`)) {
      return createErrorResponse('Rate limit exceeded', 429);
    }

    let content: ContentPiece[];

    if (creatorId) {
      // Get content by specific creator
      content = await db.getContentByCreator(creatorId);
    } else if (query || category || tags) {
      // Search content
      content = await db.searchContent(query || '', { category, tags });
    } else {
      // Get all content
      content = Array.from((db as any).content.values());
    }

    // Sort by creation timestamp (newest first)
    content.sort((a, b) => b.creationTimestamp - a.creationTimestamp);

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContent = content.slice(startIndex, endIndex);

    return NextResponse.json(
      createPaginatedResponse(paginatedContent, content.length, page, limit)
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/content - Create new content
export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUser(request);
    requireAuth(userId);

    // Rate limiting for content creation
    if (!checkRateLimit(`create_content_${userId}`, 10, 3600000)) { // 10 per hour
      return createErrorResponse('Rate limit exceeded. Try again later.', 429);
    }

    const body = await request.json();
    const validatedData = createContentSchema.parse(body);

    // Create content in database
    const content = await db.createContent({
      ...validatedData,
      creatorId: userId,
      isRemix: false,
      status: 'published',
    });

    // Create notification for followers (in a real app)
    // await createNotificationForFollowers(userId, 'new_content', content);

    return NextResponse.json(
      createSuccessResponse(content, 'Content created successfully'),
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

