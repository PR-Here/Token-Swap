// Global type definitions

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  image?: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  assets: PortfolioAsset[];
  totalValue: number;
  totalChange24h: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioAsset {
  assetId: string;
  symbol: string;
  amount: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  change24h: number;
}

export interface Transaction {
  id: string;
  userId: string;
  assetId: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  totalValue: number;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  tags: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface SocialMention {
  platform: 'twitter' | 'facebook' | 'instagram' | 'tiktok' | 'google';
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  lastUpdated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
