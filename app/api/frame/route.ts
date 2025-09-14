import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  validateFrameMessage,
  corsHeaders,
} from '@/lib/api';
import type { FrameWebhookPayload, FrameActionPayload } from '@/lib/types';

// POST /api/frame - Handle Farcaster frame actions
export async function POST(request: NextRequest) {
  try {
    const body: FrameWebhookPayload = await request.json();

    // Validate frame message
    if (!validateFrameMessage(body)) {
      return createErrorResponse('Invalid frame message', 400);
    }

    const { untrustedData } = body;
    const userId = `fc_${untrustedData.fid}`; // Farcaster user ID

    // Handle different button actions
    switch (untrustedData.buttonIndex) {
      case 1: // Configure Revenue Share
        return handleConfigureRevenue(body);
      case 2: // Create Remix
        return handleCreateRemix(body, userId);
      case 3: // Purchase Enhancement
        return handlePurchaseEnhancement(body, userId);
      case 4: // Vote on Poll
        return handleVoteOnPoll(body, userId);
      default:
        return createErrorResponse('Unknown action', 400);
    }
  } catch (error) {
    return handleApiError(error);
  }
}

// Handle revenue share configuration
async function handleConfigureRevenue(body: FrameWebhookPayload) {
  const { untrustedData } = body;

  // Extract content ID from frame URL or state
  const contentId = untrustedData.state || extractContentIdFromUrl(untrustedData.url);

  if (!contentId) {
    return createErrorResponse('Content ID not found', 400);
  }

  const content = await db.getContent(contentId);
  if (!content) {
    return createErrorResponse('Content not found', 404);
  }

  // In a real implementation, this would redirect to a configuration frame
  // For now, we'll return a success response
  return NextResponse.json(
    createSuccessResponse({
      message: 'Revenue share configuration initiated',
      contentId,
      currentPercentage: content.revenueSharePercentage,
    })
  );
}

// Handle remix creation
async function handleCreateRemix(body: FrameWebhookPayload, userId: string) {
  const { untrustedData } = body;

  const contentId = untrustedData.state || extractContentIdFromUrl(untrustedData.url);

  if (!contentId) {
    return createErrorResponse('Content ID not found', 400);
  }

  const content = await db.getContent(contentId);
  if (!content) {
    return createErrorResponse('Content not found', 404);
  }

  // Create a pending remix (user would need to provide remix content URL)
  const remix = await db.createRemix({
    originalContentId: contentId,
    remixingCreatorId: userId,
    remixContentUrl: '', // Would be provided in a follow-up interaction
    description: untrustedData.inputText || 'Remix created via Farcaster',
    revenueSharePercentage: 10, // Default
    approved: false,
  });

  return NextResponse.json(
    createSuccessResponse({
      message: 'Remix request submitted',
      remixId: remix.remixId,
      contentId,
    })
  );
}

// Handle enhancement purchase
async function handlePurchaseEnhancement(body: FrameWebhookPayload, userId: string) {
  const { untrustedData } = body;

  const contentId = untrustedData.state || extractContentIdFromUrl(untrustedData.url);

  if (!contentId) {
    return createErrorResponse('Content ID not found', 400);
  }

  const content = await db.getContent(contentId);
  if (!content) {
    return createErrorResponse('Content not found', 404);
  }

  // Create enhancement request
  const enhancement = await db.createEnhancement({
    contentId,
    appliedByCreatorId: userId,
    enhancementType: 'custom', // Default
    enhancementDetails: untrustedData.inputText || 'Enhancement requested via Farcaster',
    cost: 0.01, // Default cost in ETH
    approved: false,
  });

  return NextResponse.json(
    createSuccessResponse({
      message: 'Enhancement request submitted',
      enhancementId: enhancement.enhancementId,
      contentId,
    })
  );
}

// Handle poll voting
async function handleVoteOnPoll(body: FrameWebhookPayload, userId: string) {
  const { untrustedData } = body;

  // Extract poll ID from state
  const pollId = untrustedData.state;

  if (!pollId) {
    return createErrorResponse('Poll ID not found', 400);
  }

  // For simplicity, we'll assume the button index corresponds to the option index
  const optionIndex = untrustedData.buttonIndex - 1;

  const success = await db.voteOnPoll(pollId, userId, optionIndex);

  if (!success) {
    return createErrorResponse('Failed to vote on poll', 400);
  }

  return NextResponse.json(
    createSuccessResponse({
      message: 'Vote recorded successfully',
      pollId,
      optionIndex,
    })
  );
}

// Helper function to extract content ID from URL
function extractContentIdFromUrl(url: string): string | null {
  // Extract content ID from URL patterns like:
  // https://app.com/content/content_1234567890_abc123
  const match = url.match(/content\/(content_[^/?]+)/);
  return match ? match[1] : null;
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

