import { Creator, ContentPiece, Remix, Enhancement, Transaction, Engagement, CommunityPoll, Notification } from '@/lib/types';

// In-memory database for demo purposes
// In production, this would be replaced with a proper database like PostgreSQL, MongoDB, etc.

class Database {
  private creators: Map<string, Creator> = new Map();
  private content: Map<string, ContentPiece> = new Map();
  private remixes: Map<string, Remix> = new Map();
  private enhancements: Map<string, Enhancement> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private engagements: Map<string, Engagement> = new Map();
  private polls: Map<string, CommunityPoll> = new Map();
  private notifications: Map<string, Notification> = new Map();

  // Creator operations
  async createCreator(creator: Omit<Creator, 'createdAt' | 'updatedAt'>): Promise<Creator> {
    const now = Date.now();
    const newCreator: Creator = {
      ...creator,
      createdAt: now,
      updatedAt: now,
    };
    this.creators.set(creator.creatorId, newCreator);
    return newCreator;
  }

  async getCreator(creatorId: string): Promise<Creator | null> {
    return this.creators.get(creatorId) || null;
  }

  async updateCreator(creatorId: string, updates: Partial<Creator>): Promise<Creator | null> {
    const creator = this.creators.get(creatorId);
    if (!creator) return null;

    const updatedCreator = {
      ...creator,
      ...updates,
      updatedAt: Date.now(),
    };
    this.creators.set(creatorId, updatedCreator);
    return updatedCreator;
  }

  // Content operations
  async createContent(content: Omit<ContentPiece, 'contentId' | 'creationTimestamp' | 'remixCount' | 'engagementCount'>): Promise<ContentPiece> {
    const contentId = `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newContent: ContentPiece = {
      ...content,
      contentId,
      creationTimestamp: Date.now(),
      remixCount: 0,
      engagementCount: 0,
    };
    this.content.set(contentId, newContent);
    return newContent;
  }

  async getContent(contentId: string): Promise<ContentPiece | null> {
    return this.content.get(contentId) || null;
  }

  async getContentByCreator(creatorId: string): Promise<ContentPiece[]> {
    return Array.from(this.content.values()).filter(c => c.creatorId === creatorId);
  }

  async updateContent(contentId: string, updates: Partial<ContentPiece>): Promise<ContentPiece | null> {
    const content = this.content.get(contentId);
    if (!content) return null;

    const updatedContent = { ...content, ...updates };
    this.content.set(contentId, updatedContent);
    return updatedContent;
  }

  // Remix operations
  async createRemix(remix: Omit<Remix, 'remixId' | 'remixTimestamp'>): Promise<Remix> {
    const remixId = `remix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRemix: Remix = {
      ...remix,
      remixId,
      remixTimestamp: Date.now(),
    };
    this.remixes.set(remixId, newRemix);

    // Update original content remix count
    const originalContent = this.content.get(remix.originalContentId);
    if (originalContent) {
      originalContent.remixCount += 1;
      this.content.set(remix.originalContentId, originalContent);
    }

    return newRemix;
  }

  async getRemixesByContent(contentId: string): Promise<Remix[]> {
    return Array.from(this.remixes.values()).filter(r => r.originalContentId === contentId);
  }

  // Enhancement operations
  async createEnhancement(enhancement: Omit<Enhancement, 'enhancementId' | 'appliedTimestamp'>): Promise<Enhancement> {
    const enhancementId = `enhancement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newEnhancement: Enhancement = {
      ...enhancement,
      enhancementId,
      appliedTimestamp: Date.now(),
    };
    this.enhancements.set(enhancementId, newEnhancement);
    return newEnhancement;
  }

  async getEnhancementsByContent(contentId: string): Promise<Enhancement[]> {
    return Array.from(this.enhancements.values()).filter(e => e.contentId === contentId);
  }

  // Transaction operations
  async createTransaction(transaction: Omit<Transaction, 'transactionId' | 'timestamp'>): Promise<Transaction> {
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTransaction: Transaction = {
      ...transaction,
      transactionId,
      timestamp: Date.now(),
    };
    this.transactions.set(transactionId, newTransaction);
    return newTransaction;
  }

  async getTransactionsByContent(contentId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(t => t.contentId === contentId);
  }

  async getTransactionsByWallet(walletAddress: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      t => t.fromWallet === walletAddress || t.toWallet === walletAddress
    );
  }

  // Engagement operations
  async createEngagement(engagement: Omit<Engagement, 'engagementId' | 'timestamp'>): Promise<Engagement> {
    const engagementId = `engagement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newEngagement: Engagement = {
      ...engagement,
      engagementId,
      timestamp: Date.now(),
    };
    this.engagements.set(engagementId, newEngagement);

    // Update content engagement count
    const content = this.content.get(engagement.contentId);
    if (content) {
      content.engagementCount += 1;
      this.content.set(engagement.contentId, content);
    }

    return newEngagement;
  }

  async getEngagementsByContent(contentId: string): Promise<Engagement[]> {
    return Array.from(this.engagements.values()).filter(e => e.contentId === contentId);
  }

  // Poll operations
  async createPoll(poll: Omit<CommunityPoll, 'pollId' | 'createdAt'>): Promise<CommunityPoll> {
    const pollId = `poll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newPoll: CommunityPoll = {
      ...poll,
      pollId,
      createdAt: Date.now(),
    };
    this.polls.set(pollId, newPoll);
    return newPoll;
  }

  async getPollsByCreator(creatorId: string): Promise<CommunityPoll[]> {
    return Array.from(this.polls.values()).filter(p => p.creatorId === creatorId);
  }

  async voteOnPoll(pollId: string, userId: string, optionIndex: number): Promise<boolean> {
    const poll = this.polls.get(pollId);
    if (!poll || poll.status !== 'active' || Date.now() > poll.endTime) return false;

    if (!poll.votes[userId]) {
      poll.votes[userId] = optionIndex;
      this.polls.set(pollId, poll);
      return true;
    }
    return false;
  }

  // Notification operations
  async createNotification(notification: Omit<Notification, 'notificationId' | 'createdAt'>): Promise<Notification> {
    const notificationId = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newNotification: Notification = {
      ...notification,
      notificationId,
      createdAt: Date.now(),
    };
    this.notifications.set(notificationId, newNotification);
    return newNotification;
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  async markNotificationAsRead(notificationId: string): Promise<boolean> {
    const notification = this.notifications.get(notificationId);
    if (!notification) return false;

    notification.read = true;
    this.notifications.set(notificationId, notification);
    return true;
  }

  // Analytics
  async getContentAnalytics(contentId: string): Promise<any> {
    const content = this.content.get(contentId);
    if (!content) return null;

    const transactions = await this.getTransactionsByContent(contentId);
    const engagements = await this.getEngagementsByContent(contentId);
    const remixes = await this.getRemixesByContent(contentId);

    return {
      contentId,
      views: content.engagementCount,
      engagement: engagements.length,
      revenue: transactions.reduce((sum, tx) => sum + tx.amount, 0),
      remixes: remixes.length,
      enhancements: (await this.getEnhancementsByContent(contentId)).length,
    };
  }

  // Search and filtering
  async searchContent(query: string, filters?: { category?: string; tags?: string[] }): Promise<ContentPiece[]> {
    let results = Array.from(this.content.values());

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(c =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.description.toLowerCase().includes(lowerQuery) ||
        c.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    if (filters?.category) {
      results = results.filter(c => c.category === filters.category);
    }

    if (filters?.tags && filters.tags.length > 0) {
      results = results.filter(c =>
        filters.tags!.some(tag => c.tags.includes(tag))
      );
    }

    return results;
  }
}

export const db = new Database();

