import { createPublicClient, createWalletClient, http, type Hash, type Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import {
  CONTRACT_ADDRESSES,
  REVENUE_SHARE_ABI,
  CONTENT_REGISTRY_ABI,
  ENHANCEMENT_MARKET_ABI,
  GAS_ESTIMATES,
} from '@/lib/contracts';
import type { TransactionResult, ContractAddresses } from '@/lib/types';

// Web3 client configuration
const isProduction = process.env.NODE_ENV === 'production';
const chain = isProduction ? base : baseSepolia;

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
});

// Wallet client for transactions (server-side only)
let walletClient: any = null;
if (typeof window === 'undefined' && process.env.PRIVATE_KEY) {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hash);
  walletClient = createWalletClient({
    account,
    chain,
    transport: http(process.env.BASE_RPC_URL),
  });
}

export const contractAddresses: ContractAddresses = CONTRACT_ADDRESSES[chain.id === base.id ? 'base' : 'baseSepolia'];

// Revenue Share Contract Functions
export class RevenueShareContract {
  static async setRevenueShare(
    creator: Address,
    percentage: number,
    contentId: string
  ): Promise<TransactionResult> {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const hash = await walletClient.writeContract({
        address: contractAddresses.revenueShare as Address,
        abi: REVENUE_SHARE_ABI,
        functionName: 'setRevenueShare',
        args: [creator, BigInt(percentage), contentId],
        gas: BigInt(GAS_ESTIMATES.setRevenueShare),
      });

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Error setting revenue share:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async distributeRevenue(
    contentId: string,
    contributor: Address,
    amount: number
  ): Promise<TransactionResult> {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const hash = await walletClient.writeContract({
        address: contractAddresses.revenueShare as Address,
        abi: REVENUE_SHARE_ABI,
        functionName: 'distributeRevenue',
        args: [contentId, contributor, BigInt(amount * 1e18)], // Convert to wei
        gas: BigInt(GAS_ESTIMATES.distributeRevenue),
        value: BigInt(amount * 1e18),
      });

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Error distributing revenue:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async getRevenueShare(contentId: string) {
    try {
      const result = await publicClient.readContract({
        address: contractAddresses.revenueShare as Address,
        abi: REVENUE_SHARE_ABI,
        functionName: 'getRevenueShare',
        args: [contentId],
      });

      return {
        creator: result[0] as Address,
        percentage: Number(result[1]),
      };
    } catch (error) {
      console.error('Error getting revenue share:', error);
      return null;
    }
  }

  static async getTotalRevenue(contentId: string): Promise<number> {
    try {
      const result = await publicClient.readContract({
        address: contractAddresses.revenueShare as Address,
        abi: REVENUE_SHARE_ABI,
        functionName: 'getTotalRevenue',
        args: [contentId],
      });

      return Number(result) / 1e18; // Convert from wei to ETH
    } catch (error) {
      console.error('Error getting total revenue:', error);
      return 0;
    }
  }
}

// Content Registry Contract Functions
export class ContentRegistryContract {
  static async registerContent(
    contentId: string,
    metadata: string,
    contentHash: string
  ): Promise<TransactionResult> {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const hash = await walletClient.writeContract({
        address: contractAddresses.contentRegistry as Address,
        abi: CONTENT_REGISTRY_ABI,
        functionName: 'registerContent',
        args: [contentId, metadata, contentHash],
        gas: BigInt(GAS_ESTIMATES.registerContent),
      });

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Error registering content:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async getContent(contentId: string) {
    try {
      const result = await publicClient.readContract({
        address: contractAddresses.contentRegistry as Address,
        abi: CONTENT_REGISTRY_ABI,
        functionName: 'getContent',
        args: [contentId],
      });

      return {
        creator: result[0] as Address,
        metadata: result[1] as string,
        contentHash: result[2] as string,
        timestamp: Number(result[3]),
      };
    } catch (error) {
      console.error('Error getting content:', error);
      return null;
    }
  }

  static async registerRemix(
    originalContentId: string,
    remixContentId: string,
    remixer: Address
  ): Promise<TransactionResult> {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const hash = await walletClient.writeContract({
        address: contractAddresses.contentRegistry as Address,
        abi: CONTENT_REGISTRY_ABI,
        functionName: 'registerRemix',
        args: [originalContentId, remixContentId, remixer],
        gas: BigInt(GAS_ESTIMATES.registerRemix),
      });

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Error registering remix:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Enhancement Market Contract Functions
export class EnhancementMarketContract {
  static async createEnhancementOffer(
    contentId: string,
    enhancementType: string,
    cost: number
  ): Promise<TransactionResult> {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const hash = await walletClient.writeContract({
        address: contractAddresses.enhancementMarket as Address,
        abi: ENHANCEMENT_MARKET_ABI,
        functionName: 'createEnhancementOffer',
        args: [contentId, enhancementType, BigInt(cost * 1e18)],
        gas: BigInt(GAS_ESTIMATES.createEnhancementOffer),
      });

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Error creating enhancement offer:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async purchaseEnhancement(
    enhancementId: string,
    cost: number
  ): Promise<TransactionResult> {
    try {
      if (!walletClient) {
        throw new Error('Wallet client not available');
      }

      const hash = await walletClient.writeContract({
        address: contractAddresses.enhancementMarket as Address,
        abi: ENHANCEMENT_MARKET_ABI,
        functionName: 'purchaseEnhancement',
        args: [enhancementId],
        gas: BigInt(GAS_ESTIMATES.purchaseEnhancement),
        value: BigInt(cost * 1e18),
      });

      return {
        success: true,
        transactionHash: hash,
      };
    } catch (error) {
      console.error('Error purchasing enhancement:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  static async getEnhancement(enhancementId: string) {
    try {
      const result = await publicClient.readContract({
        address: contractAddresses.enhancementMarket as Address,
        abi: ENHANCEMENT_MARKET_ABI,
        functionName: 'getEnhancement',
        args: [enhancementId],
      });

      return {
        creator: result[0] as Address,
        contentId: result[1] as string,
        enhancementType: result[2] as string,
        cost: Number(result[3]) / 1e18,
        purchased: result[4] as boolean,
      };
    } catch (error) {
      console.error('Error getting enhancement:', error);
      return null;
    }
  }
}

// Utility functions
export async function getGasPrice(): Promise<bigint> {
  try {
    return await publicClient.getGasPrice();
  } catch (error) {
    console.error('Error getting gas price:', error);
    return BigInt(20000000000); // 20 gwei fallback
  }
}

export async function estimateGas(
  to: Address,
  data: Hash,
  value?: bigint
): Promise<bigint> {
  try {
    return await publicClient.estimateGas({
      to,
      data,
      value,
    });
  } catch (error) {
    console.error('Error estimating gas:', error);
    return BigInt(21000); // Default gas limit
  }
}

export async function waitForTransaction(hash: Hash): Promise<any> {
  try {
    return await publicClient.waitForTransactionReceipt({ hash });
  } catch (error) {
    console.error('Error waiting for transaction:', error);
    throw error;
  }
}

