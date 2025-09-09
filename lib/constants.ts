// Application constants

export const APP_CONFIG = {
  name: 'Loopin',
  version: '1.0.0',
  description: 'Your financial goal is possible, tell us. We will match you to the right opportunity.',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  user: {
    profile: '/user/profile',
    update: '/user/update',
  },
  portfolio: {
    get: '/portfolio',
    update: '/portfolio/update',
  },
  assets: {
    list: '/assets',
    price: '/assets/price',
    history: '/assets/history',
  },
  goals: {
    list: '/goals',
    create: '/goals/create',
    update: '/goals/update',
    delete: '/goals/delete',
  },
  transactions: {
    list: '/transactions',
    create: '/transactions/create',
  },
  news: {
    list: '/news',
    crypto: '/news/crypto',
  },
} as const;

export const STORAGE_KEYS = {
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
  user: 'user_data',
  onboarding: 'onboarding_completed',
  tutorial: 'tutorial_completed',
  settings: 'app_settings',
} as const;

export const TIME_RANGES = {
  '6h': '6h',
  '12h': '12h',
  '24h': '24h',
  '1W': '1w',
  '1M': '1m',
  'ALL': 'all',
} as const;

export const CHART_COLORS = {
  primary: '#0108DC',
  secondary: '#00046F',
  success: '#00C851',
  warning: '#FF8800',
  danger: '#FF4444',
  info: '#33B5E5',
} as const;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const DEBOUNCE_DELAY = {
  search: 300,
  input: 500,
} as const;
