export type UserRole = 'user' | 'admin' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number; // in PKR
  eggBalance: number; // count of collected eggs
  eggRatePerUnit: number; // e.g. Rs. 35 per egg
  eggRatePerUsd?: number; // fallback alias
  totalInvested: number;
  totalWithdrawn: number;
  referralCode: string;
  referredBy?: string;
  referralEarnings: number;
  referralCount: number;
  createdAt: string;
  status: 'active' | 'suspended';
  phone?: string;
  jazzcashNumber?: string;
  jazzcashTitle?: string;
  easypaisaNumber?: string;
  easypaisaTitle?: string;
}

export interface Plan {
  id: string;
  name: string;
  badge?: string;
  flockType: string; // e.g. "ISA Brown Layer Hen"
  henCount: number; // number of physical layers assigned
  pricePkr: number; // fixed plan price in PKR e.g. 500, 1500, 5000, 12500, 30000, 75000
  minDeposit?: number; // alias
  maxDeposit?: number; // alias
  dailyReturnPkr: number; // daily PKR return
  dailyReturnPercent: number; // e.g. 7.0%
  durationDays: number; // e.g. 30 days
  dailyEggYieldEstimate: number; // estimated eggs collected daily
  payoutFrequency: 'Daily' | 'Hourly' | 'Cycle End';
  capitalReturn: boolean; // Return capital at end
  active: boolean;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface Investment {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  henCount: number;
  amount: number; // in PKR
  dailyReturn: number; // in PKR
  dailyEggYield: number; // in eggs
  startDate: string;
  endDate: string;
  durationDays: number;
  daysCompleted: number;
  totalEarned: number;
  eggsHarvested: number;
  status: 'active' | 'completed' | 'cancelled' | 'pending';
  lastHarvestDate?: string;
  tid?: string; // JazzCash / Easypaisa Transaction ID
  senderNumber?: string;
  paymentMethod?: string;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'investment' | 'egg_harvest' | 'referral_bonus';
export type TransactionStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface Transaction {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  type: TransactionType;
  amount: number; // in PKR
  eggCount?: number;
  method: string; // e.g. "JazzCash", "Easypaisa", "Bank Wire"
  tid?: string; // JazzCash / Easypaisa Transaction ID (TID)
  txHash?: string; // alias
  senderNumber?: string; // Sender's mobile number
  walletAddress?: string; // Destination account number / title
  planId?: string;
  planName?: string;
  status: TransactionStatus;
  createdAt: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'alert' | 'promo' | 'update';
  active: boolean;
  createdAt: string;
}

export interface SupportInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
  replyNote?: string;
}

export interface WebsiteSettings {
  websiteName: string;
  tagline: string;
  logoText: string;
  logoSubtitle: string;
  currencySymbol: string; // "Rs." or "PKR"
  eggUnitPricePkr: number; // price per digital egg in PKR (e.g. Rs. 35)
  eggUnitPrice?: number; // alias
  minDepositPkr: number; // e.g. Rs. 500
  minDeposit?: number; // alias
  minWithdrawalPkr: number; // e.g. Rs. 200
  minWithdrawal?: number; // alias
  referralTier1Percent: number; // 7%
  referralTier2Percent: number; // 3%
  referralTier3Percent: number; // 1%
  paymentMethods: {
    jazzcash: {
      enabled: boolean;
      accountName: string;
      accountNumber: string;
      instructions: string;
    };
    easypaisa: {
      enabled: boolean;
      accountName: string;
      accountNumber: string;
      instructions: string;
    };
    bankTransfer: {
      enabled: boolean;
      bankName: string;
      accountName: string;
      accountNumber: string;
      swift: string;
    };
    usdtTrc20: { enabled: boolean; address: string; qrNote: string };
    usdtBep20: { enabled: boolean; address: string; qrNote: string };
    btc: { enabled: boolean; address: string; qrNote: string };
  };
  contactEmail: string;
  supportPhone: string;
  whatsappSupport: string;
  telegramChannel: string;
  farmAddress: string;
  heroHeadline: string;
  heroSubheadline: string;
  marqueeNotice: string;
  enableMarquee: boolean;
  maintenanceMode: boolean;
  liveStats: {
    totalEggsHarvested: number;
    activeFlockBirds: number;
    totalDistributedPkr: number;
    totalDistributedUsd?: number;
    hatchingRatePercent: number;
  };
}
