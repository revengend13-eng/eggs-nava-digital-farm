import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Plan,
  Investment,
  Transaction,
  Announcement,
  SupportInquiry,
  WebsiteSettings
} from '../types';

const STORAGE_KEY = 'eggs_nava_digital_farm_pkr_v3';

const DEFAULT_SETTINGS: WebsiteSettings = {
  websiteName: 'EGGS NAVA DIGITAL FARM',
  tagline: 'Pakistan’s Premier Digital Poultry Platform · Verified Laying Hens & Daily JazzCash Egg Yields',
  logoText: 'EGGS NAVA',
  logoSubtitle: 'DIGITAL FARM',
  currencySymbol: 'Rs.',
  eggUnitPricePkr: 35, // Rs. 35 per fresh farm egg
  eggUnitPrice: 35, // alias
  minDepositPkr: 500, // Rs. 500
  minDeposit: 500, // alias
  minWithdrawalPkr: 200, // Rs. 200
  minWithdrawal: 200, // alias
  referralTier1Percent: 7,
  referralTier2Percent: 3,
  referralTier3Percent: 1,
  paymentMethods: {
    jazzcash: {
      enabled: true,
      accountName: 'Inam Ullah (Official Farm Receiver)',
      accountNumber: '03001234567',
      instructions: 'Send payment via JazzCash App or *786# to our official account. After successful transfer, copy the 11/12-digit TID from SMS 8558 and enter it below.'
    },
    easypaisa: {
      enabled: true,
      accountName: 'Inam Ullah',
      accountNumber: '03007654321',
      instructions: 'Send payment via Easypaisa App to the official account and copy the TRX/TID number.'
    },
    bankTransfer: {
      enabled: true,
      bankName: 'Meezan Bank Islamic Agriculture',
      accountName: 'Eggs Nava Digital Farm Ltd',
      accountNumber: '0102-0104882199-01',
      swift: 'MEZNAGRO'
    },
    usdtTrc20: {
      enabled: true,
      address: 'TY9bK2s7AqmNawa8Eggs98xZ4F6bVwP3Xk',
      qrNote: 'Send USDT TRC-20 for international investors.'
    },
    usdtBep20: {
      enabled: true,
      address: '0x71C2d85FaB543E8224bBE9918712aE09b8D2C971',
      qrNote: 'Binance Smart Chain BEP-20 USDT transfer.'
    },
    btc: {
      enabled: false,
      address: 'bc1q9navafarm827hdy30q8kzmep948slr747w6a',
      qrNote: 'Bitcoin network transfer.'
    }
  },
  contactEmail: 'support@eggs-nava.farm',
  supportPhone: '+92 300 1234567',
  whatsappSupport: '+92 300 1234567',
  telegramChannel: 'https://t.me/EggsNavaDigitalFarm',
  farmAddress: 'Bio-Secure Poultry Facility Complex 04, Raiwind Agro Corridor, Lahore, Pakistan',
  heroHeadline: 'Verified Digital Poultry Farming & Daily Egg Yield Returns in Pakistan',
  heroSubheadline: 'Acquire verified ISA Brown and Lohmann layer hens in our climate-controlled bio-secure coops. Receive automated daily egg production profits paid directly via JazzCash.',
  marqueeNotice: '🔥 NEW COHORT OPEN: Batch #NV-2026-B ISA Brown Layers is now accepting JazzCash activations! Instant daily egg collections live.',
  enableMarquee: true,
  maintenanceMode: false,
  liveStats: {
    totalEggsHarvested: 248920,
    activeFlockBirds: 48500,
    totalDistributedPkr: 8750000,
    totalDistributedUsd: 8750000,
    hatchingRatePercent: 98.6
  }
};

const DEFAULT_USERS: User[] = [
  {
    id: 'usr-admin-owner',
    name: 'Inam (Owner & Super Admin)',
    email: 'inam909800@gmail.com',
    role: 'superadmin',
    balance: 85400, // PKR
    eggBalance: 320,
    eggRatePerUnit: 35,
    eggRatePerUsd: 35,
    totalInvested: 150000,
    totalWithdrawn: 64500,
    referralCode: 'NAVA-OWNER',
    referralEarnings: 18500,
    referralCount: 42,
    createdAt: '2026-01-15T10:00:00.000Z',
    status: 'active',
    phone: '+92 300 1234567',
    jazzcashNumber: '03001234567',
    jazzcashTitle: 'Inam Ullah',
    easypaisaNumber: '03007654321',
    easypaisaTitle: 'Inam Ullah'
  },
  {
    id: 'usr-investor-1',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.invest@example.com',
    role: 'user',
    balance: 4200, // PKR
    eggBalance: 48,
    eggRatePerUnit: 35,
    eggRatePerUsd: 35,
    totalInvested: 15000,
    totalWithdrawn: 5800,
    referralCode: 'TARIQ77',
    referredBy: 'NAVA-OWNER',
    referralEarnings: 1050,
    referralCount: 5,
    createdAt: '2026-02-10T14:30:00.000Z',
    status: 'active',
    phone: '+92 321 9876543',
    jazzcashNumber: '03219876543',
    jazzcashTitle: 'Tariq Mansoor'
  }
];

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'plan-starter-hen',
    name: 'Starter Layer (1 Verified Hen)',
    flockType: 'Hy-Line Brown Layer',
    henCount: 1,
    pricePkr: 500,
    minDeposit: 500,
    maxDeposit: 5000,
    dailyReturnPkr: 35,
    dailyReturnPercent: 7.0,
    durationDays: 30,
    dailyEggYieldEstimate: 1,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    description: 'Acquire 1 verified layer hen cared for in our automated smart coop. Ideal for starting digital egg farming via JazzCash.',
    features: [
      '1 Verified ISA Brown Layer Hen',
      'Rs. 35 daily egg profit (7.0% Daily)',
      '1 fresh Grade-A egg harvested daily',
      '30 Days contract duration',
      '100% Principal (Rs. 500) returned at end',
      'Daily JazzCash withdrawal enabled'
    ]
  },
  {
    id: 'plan-golden-brood',
    name: 'Golden Brood (3 Verified Hens)',
    badge: 'MOST POPULAR',
    popular: true,
    flockType: 'ISA Brown High-Yield Trio',
    henCount: 3,
    pricePkr: 1500,
    minDeposit: 1500,
    maxDeposit: 15000,
    dailyReturnPkr: 105,
    dailyReturnPercent: 7.0,
    durationDays: 30,
    dailyEggYieldEstimate: 3,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    description: 'Our most popular commercial unit with 3 high-yield layers. Automated conveyor feeding and guaranteed daily egg sales.',
    features: [
      '3 Verified Premium Layer Hens',
      'Rs. 105 daily egg profit (7.0% Daily)',
      '3 fresh Grade-A eggs harvested daily',
      '30 Days harvest run (Rs. 3,150 profit)',
      '100% Capital returned at maturity',
      'Daily instant withdrawal via JazzCash'
    ]
  },
  {
    id: 'plan-commercial-flock',
    name: 'Commercial Flock (10 Verified Hens)',
    badge: 'COMMERCIAL FLOCK',
    popular: false,
    flockType: 'Lohmann White Bio-Secure Cohort',
    henCount: 10,
    pricePkr: 5000,
    minDeposit: 5000,
    maxDeposit: 50000,
    dailyReturnPkr: 385,
    dailyReturnPercent: 7.7,
    durationDays: 30,
    dailyEggYieldEstimate: 11,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    description: 'Ten dedicated hens in our climate-controlled bio-secure poultry house with computerized laser egg grading.',
    features: [
      '10 Verified Commercial Layer Hens',
      'Rs. 385 daily automated profit (7.7% Daily)',
      '11 fresh eggs harvested per day',
      '30 Days total run (Rs. 11,550 profit)',
      'Full capital preservation guarantee',
      'Priority veterinary health audit report'
    ]
  },
  {
    id: 'plan-master-coop',
    name: 'Master Coop (25 Verified Hens)',
    badge: 'HIGH YIELD',
    flockType: 'Elite ISA Brown Layer Unit',
    henCount: 25,
    pricePkr: 12500,
    minDeposit: 12500,
    maxDeposit: 125000,
    dailyReturnPkr: 1025,
    dailyReturnPercent: 8.2,
    durationDays: 45,
    dailyEggYieldEstimate: 29,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    description: 'Full automated coop division producing eggs for premium bakery and restaurant wholesale supply contracts.',
    features: [
      '25 Verified Elite Layers',
      'Rs. 1,025 daily profit (8.2% Daily)',
      '29 fresh Grade-A eggs collected daily',
      '45 Days high-yield cycle (Rs. 46,125 return)',
      'Principal returned at cycle completion',
      'Dedicated Farm Manager hotline'
    ]
  },
  {
    id: 'plan-industrial-mega',
    name: 'Industrial Mega Farm (60 Hens)',
    flockType: 'Industrial Layer Battery',
    henCount: 60,
    pricePkr: 30000,
    minDeposit: 30000,
    maxDeposit: 300000,
    dailyReturnPkr: 2700,
    dailyReturnPercent: 9.0,
    durationDays: 60,
    dailyEggYieldEstimate: 77,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    description: 'Industrial scale production backed by long-term supermarket distribution contracts and full bio-security insurance.',
    features: [
      '60 Verified Industrial Layers',
      'Rs. 2,700 daily automated profit (9.0% Daily)',
      '77 fresh eggs harvested daily',
      '60 Days cycle (Rs. 162,000 net return)',
      '100% Principal returned upon completion',
      'Physical farm visit pass included'
    ]
  },
  {
    id: 'plan-imperial-reserve',
    name: 'Nava Imperial Coop (150 Hens)',
    badge: 'VIP EXECUTIVE',
    flockType: 'Heritage Free-Range Organic Unit',
    henCount: 150,
    pricePkr: 75000,
    minDeposit: 75000,
    maxDeposit: 750000,
    dailyReturnPkr: 7500,
    dailyReturnPercent: 10.0,
    durationDays: 90,
    dailyEggYieldEstimate: 215,
    payoutFrequency: 'Daily',
    capitalReturn: true,
    active: true,
    description: 'Executive digital farming installation with dedicated solar-powered coops, zero-carbon rating, and VIP daily payouts.',
    features: [
      '150 Verified Heritage Hens',
      'Rs. 7,500 daily top-tier payout (10.0% Daily)',
      '215 fresh Grade-A eggs collected daily',
      '90 Days institutional contract',
      'Full capital return at maturity',
      'VIP Instant JazzCash priority settlement'
    ]
  }
];

const DEFAULT_INVESTMENTS: Investment[] = [
  {
    id: 'inv-101',
    userId: 'usr-admin-owner',
    planId: 'plan-commercial-flock',
    planName: 'Commercial Flock (10 Verified Hens)',
    henCount: 10,
    amount: 5000,
    dailyReturn: 385,
    dailyEggYield: 11,
    startDate: '2026-03-10T00:00:00.000Z',
    endDate: '2026-04-09T00:00:00.000Z',
    durationDays: 30,
    daysCompleted: 24,
    totalEarned: 9240,
    eggsHarvested: 264,
    status: 'active',
    lastHarvestDate: '2026-10-04T00:00:00.000Z',
    tid: '01988231945',
    senderNumber: '03001234567'
  },
  {
    id: 'inv-102',
    userId: 'usr-investor-1',
    planId: 'plan-golden-brood',
    planName: 'Golden Brood (3 Verified Hens)',
    henCount: 3,
    amount: 1500,
    dailyReturn: 105,
    dailyEggYield: 3,
    startDate: '2026-03-20T00:00:00.000Z',
    endDate: '2026-04-19T00:00:00.000Z',
    durationDays: 30,
    daysCompleted: 14,
    totalEarned: 1470,
    eggsHarvested: 42,
    status: 'active',
    lastHarvestDate: '2026-10-04T00:00:00.000Z',
    tid: '01899432190',
    senderNumber: '03219876543'
  }
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-jazz-301',
    userId: 'usr-investor-1',
    userEmail: 'tariq.invest@example.com',
    userName: 'Tariq Al-Mansoor',
    type: 'deposit',
    amount: 5000, // PKR
    method: 'JazzCash',
    tid: '85589021482',
    txHash: '85589021482',
    senderNumber: '03219876543',
    planId: 'plan-commercial-flock',
    planName: 'Commercial Flock (10 Verified Hens)',
    status: 'pending',
    createdAt: '2026-10-05T14:10:00.000Z'
  },
  {
    id: 'tx-302',
    userId: 'usr-admin-owner',
    userEmail: 'inam909800@gmail.com',
    userName: 'Inam (Owner & Super Admin)',
    type: 'deposit',
    amount: 50000,
    method: 'JazzCash',
    tid: '85581109481',
    txHash: '85581109481',
    senderNumber: '03001234567',
    status: 'completed',
    createdAt: '2026-03-01T10:00:00.000Z',
    approvedAt: '2026-03-01T10:15:00.000Z'
  },
  {
    id: 'tx-303',
    userId: 'usr-investor-1',
    userEmail: 'tariq.invest@example.com',
    userName: 'Tariq Al-Mansoor',
    type: 'withdrawal',
    amount: 1500,
    method: 'JazzCash',
    walletAddress: '03219876543 (Tariq Mansoor)',
    status: 'pending',
    createdAt: '2026-10-05T13:45:00.000Z'
  },
  {
    id: 'tx-304',
    userId: 'usr-admin-owner',
    userEmail: 'inam909800@gmail.com',
    userName: 'Inam (Owner & Super Admin)',
    type: 'egg_harvest',
    amount: 385,
    eggCount: 11,
    method: 'Daily Egg Yield Harvest',
    status: 'completed',
    createdAt: '2026-10-04T08:00:00.000Z'
  }
];

const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New ISA Brown Cohort Ready for JazzCash Activation',
    content: 'Coop Sector 4 has completed automated temperature calibration. Over 10,000 ISA Brown layers are in peak daily laying cycle.',
    type: 'update',
    active: true,
    createdAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'ann-2',
    title: 'Instant JazzCash Daily Withdrawals Active',
    content: 'Members can withdraw their daily egg harvest returns directly to JazzCash 24 hours a day with zero processing delay.',
    type: 'promo',
    active: true,
    createdAt: '2026-09-28T00:00:00.000Z'
  }
];

const DEFAULT_INQUIRIES: SupportInquiry[] = [
  {
    id: 'inq-1',
    name: 'Muhammad Asif',
    email: 'asif.poultry@gmail.com',
    subject: 'JazzCash Deposit Verification Inquiry',
    message: 'I have sent Rs. 5,000 via JazzCash with TID 85589021482. Please approve my 10-hen commercial flock plan.',
    status: 'new',
    createdAt: '2026-10-05T14:15:00.000Z'
  }
];

interface FarmContextType {
  currentUser: User | null;
  users: User[];
  plans: Plan[];
  investments: Investment[];
  transactions: Transaction[];
  announcements: Announcement[];
  inquiries: SupportInquiry[];
  settings: WebsiteSettings;
  isOwnerOrAdmin: boolean;
  login: (email: string, password?: string) => { success: boolean; message: string };
  quickLoginAsOwner: () => void;
  quickLoginAsUser: () => void;
  logout: () => void;
  register: (name: string, email: string, password?: string, referralCode?: string, jazzcashNumber?: string) => { success: boolean; message: string };
  submitJazzCashPlanDeposit: (planId: string, tid: string, senderNumber: string, method?: string) => { success: boolean; message: string };
  requestDeposit: (amount: number, method?: string, txHashOrTid?: string, senderNumber?: string) => { success: boolean; message: string };
  investInPlan: (planId: string, amount?: number) => { success: boolean; message: string };
  collectDailyEggs: () => { success: boolean; count: number; valuePkr: number; message: string };
  requestWithdrawal: (amountPkr: number, method: string, destinationAccount: string, accountTitle?: string) => { success: boolean; message: string };
  submitSupportInquiry: (name: string, email: string, subject: string, message: string) => { success: boolean; message: string };
  // Admin Methods
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  addUser: (userData: Omit<User, 'id' | 'createdAt'>) => void;
  deleteUser: (userId: string) => void;
  updatePlan: (planId: string, updates: Partial<Plan>) => void;
  addPlan: (planData: Omit<Plan, 'id'>) => void;
  deletePlan: (planId: string) => void;
  approveDepositAndActivatePlan: (transactionId: string) => { success: boolean; message: string };
  approveDeposit: (transactionId: string) => { success: boolean; message: string };
  rejectDeposit: (transactionId: string, reason: string) => void;
  approveWithdrawal: (transactionId: string) => void;
  rejectWithdrawal: (transactionId: string, reason: string) => void;
  addAnnouncement: (ann: Omit<Announcement, 'id' | 'createdAt'>) => void;
  deleteAnnouncement: (id: string) => void;
  toggleAnnouncement: (id: string) => void;
  updateInquiryStatus: (id: string, status: SupportInquiry['status'], reply?: string) => void;
  resetAllData: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          eggUnitPrice: parsed.eggUnitPricePkr || parsed.eggUnitPrice || DEFAULT_SETTINGS.eggUnitPricePkr,
          minDeposit: parsed.minDepositPkr || parsed.minDeposit || DEFAULT_SETTINGS.minDepositPkr,
          minWithdrawal: parsed.minWithdrawalPkr || parsed.minWithdrawal || DEFAULT_SETTINGS.minWithdrawalPkr,
          paymentMethods: {
            ...DEFAULT_SETTINGS.paymentMethods,
            ...(parsed.paymentMethods || {})
          }
        };
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_currentUser`);
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = DEFAULT_USERS.find(u => u.email === parsed.email);
        return match || parsed;
      }
      return DEFAULT_USERS[0]; // Logged in as Owner by default for full preview
    } catch {
      return DEFAULT_USERS[0];
    }
  });

  const [plans, setPlans] = useState<Plan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_plans`);
      return saved ? JSON.parse(saved) : DEFAULT_PLANS;
    } catch {
      return DEFAULT_PLANS;
    }
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_investments`);
      return saved ? JSON.parse(saved) : DEFAULT_INVESTMENTS;
    } catch {
      return DEFAULT_INVESTMENTS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
      return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
    } catch {
      return DEFAULT_TRANSACTIONS;
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_announcements`);
      return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
    } catch {
      return DEFAULT_ANNOUNCEMENTS;
    }
  });

  const [inquiries, setInquiries] = useState<SupportInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_inquiries`);
      return saved ? JSON.parse(saved) : DEFAULT_INQUIRIES;
    } catch {
      return DEFAULT_INQUIRIES;
    }
  });

  // Persistent storage sync
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
      if (currentUser) {
        const updated = users.find(u => u.id === currentUser.id);
        if (updated) {
          localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(updated));
        }
      }
    } catch {}
  }, [users, currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_plans`, JSON.stringify(plans));
    } catch {}
  }, [plans]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_investments`, JSON.stringify(investments));
    } catch {}
  }, [investments]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_announcements`, JSON.stringify(announcements));
    } catch {}
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  // Keep currentUser synced
  useEffect(() => {
    if (currentUser) {
      const fresh = users.find(u => u.id === currentUser.id);
      if (fresh && JSON.stringify(fresh) !== JSON.stringify(currentUser)) {
        setCurrentUser(fresh);
      }
    }
  }, [users, currentUser]);

  const isOwnerOrAdmin =
    currentUser?.role === 'superadmin' ||
    currentUser?.role === 'admin' ||
    currentUser?.email === 'inam909800@gmail.com';

  const login = (email: string, _password?: string) => {
    const trimmed = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === trimmed);
    if (!user) {
      return { success: false, message: 'No registered farmer account found with this email.' };
    }
    if (user.status === 'suspended') {
      return { success: false, message: 'This account has been suspended by administration.' };
    }
    setCurrentUser(user);
    localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(user));
    return { success: true, message: `Welcome back, ${user.name}!` };
  };

  const quickLoginAsOwner = () => {
    const owner = users.find(u => u.email === 'inam909800@gmail.com') || DEFAULT_USERS[0];
    setCurrentUser(owner);
    localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(owner));
  };

  const quickLoginAsUser = () => {
    const investor = users.find(u => u.email === 'tariq.invest@example.com') || DEFAULT_USERS[1];
    setCurrentUser(investor);
    localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(investor));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(`${STORAGE_KEY}_currentUser`);
  };

  const register = (
    name: string,
    email: string,
    _password?: string,
    referralCode?: string,
    jazzcashNumber?: string
  ) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    let referredBy: string | undefined = undefined;
    if (referralCode) {
      const match = users.find(u => u.referralCode.toLowerCase() === referralCode.trim().toLowerCase());
      if (match) {
        referredBy = match.referralCode;
        setUsers(prev => prev.map(u => u.id === match.id ? { ...u, referralCount: u.referralCount + 1 } : u));
      }
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim() || 'Flock Farmer',
      email: trimmedEmail,
      role: trimmedEmail === 'inam909800@gmail.com' ? 'superadmin' : 'user',
      balance: 100, // Rs. 100 starter welcome bonus
      eggBalance: 5,
      eggRatePerUnit: settings.eggUnitPricePkr,
      eggRatePerUsd: settings.eggUnitPricePkr,
      totalInvested: 0,
      totalWithdrawn: 0,
      referralCode: `NAVA-${Math.floor(1000 + Math.random() * 9000)}`,
      referredBy,
      referralEarnings: 0,
      referralCount: 0,
      createdAt: new Date().toISOString(),
      status: 'active',
      jazzcashNumber: jazzcashNumber?.trim() || ''
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Registration successful! Rs. 100 welcome bonus credited.' };
  };

  // STEP: USER SELECTS PLAN -> JAZZCASH DEPOSIT -> SUBMITS TID -> PENDING
  const submitJazzCashPlanDeposit = (planId: string, tid: string, senderNumber: string, method: string = 'JazzCash') => {
    if (!currentUser) {
      return { success: false, message: 'Please log in to activate a poultry plan.' };
    }

    const plan = plans.find(p => p.id === planId);
    if (!plan) {
      return { success: false, message: 'Selected plan is not available.' };
    }

    if (!tid || tid.trim().length < 6) {
      return { success: false, message: `Please enter a valid Transaction ID (TID) from ${method}.` };
    }

    if (!senderNumber || senderNumber.trim().length < 10) {
      return { success: false, message: `Please enter your sender ${method} mobile number (e.g. 03001234567).` };
    }

    const cleanTid = tid.trim();
    const cleanSender = senderNumber.trim();

    // 1. Create a Pending Investment Record
    const newInvestment: Investment = {
      id: `inv-${Date.now()}`,
      userId: currentUser.id,
      planId: plan.id,
      planName: plan.name,
      henCount: plan.henCount,
      amount: plan.pricePkr,
      dailyReturn: plan.dailyReturnPkr,
      dailyEggYield: plan.dailyEggYieldEstimate,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000).toISOString(),
      durationDays: plan.durationDays,
      daysCompleted: 0,
      totalEarned: 0,
      eggsHarvested: 0,
      status: 'pending', // PENDING ADMIN APPROVAL
      tid: cleanTid,
      senderNumber: cleanSender,
      paymentMethod: method
    };

    // 2. Create a Pending Transaction Record for Admin Review
    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      type: 'deposit',
      amount: plan.pricePkr,
      method,
      tid: cleanTid,
      txHash: cleanTid,
      senderNumber: cleanSender,
      planId: plan.id,
      planName: plan.name,
      status: 'pending', // PENDING
      createdAt: new Date().toISOString()
    };

    setInvestments(prev => [newInvestment, ...prev]);
    setTransactions(prev => [newTx, ...prev]);

    return {
      success: true,
      message: `Deposit for ${plan.name} submitted with TID ${cleanTid}! Status is PENDING. Admin will review and activate your plan shortly.`
    };
  };

  // Generic deposit request (e.g. from general deposit modal)
  const requestDeposit = (amount: number, method?: string, txHashOrTid?: string, senderNumber?: string) => {
    if (!currentUser) return { success: false, message: 'Please log in to submit deposit.' };
    const cleanMethod = method || 'JazzCash';
    const cleanTid = txHashOrTid || `TID-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const newTx: Transaction = {
      id: `tx-dep-${Date.now()}`,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      type: 'deposit',
      amount,
      method: cleanMethod,
      tid: cleanTid,
      txHash: cleanTid,
      senderNumber: senderNumber || currentUser.phone || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);
    return {
      success: true,
      message: `Deposit request of ${settings.currencySymbol}${amount.toLocaleString()} via ${cleanMethod} submitted with TID ${cleanTid}! Admin will review and credit shortly.`
    };
  };

  // Direct investment from user's current account balance
  const investInPlan = (planId: string, amount?: number) => {
    if (!currentUser) return { success: false, message: 'Please log in to activate flock.' };
    const plan = plans.find(p => p.id === planId);
    if (!plan) return { success: false, message: 'Plan not found.' };
    const cost = amount || plan.pricePkr;
    if (currentUser.balance < cost) {
      return { success: false, message: `Insufficient balance (${settings.currencySymbol}${currentUser.balance.toLocaleString()}). Please deposit via JazzCash or Easypaisa.` };
    }

    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, balance: u.balance - cost, totalInvested: u.totalInvested + cost } : u));

    const newInv: Investment = {
      id: `inv-${Date.now()}`,
      userId: currentUser.id,
      planId: plan.id,
      planName: plan.name,
      henCount: plan.henCount,
      amount: cost,
      dailyReturn: plan.dailyReturnPkr,
      dailyEggYield: plan.dailyEggYieldEstimate,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + plan.durationDays * 24 * 60 * 60 * 1000).toISOString(),
      durationDays: plan.durationDays,
      daysCompleted: 0,
      totalEarned: 0,
      eggsHarvested: 0,
      status: 'active',
      lastHarvestDate: new Date().toISOString()
    };

    const newTx: Transaction = {
      id: `tx-inv-${Date.now()}`,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      type: 'investment',
      amount: cost,
      method: 'Account Balance',
      planId: plan.id,
      planName: plan.name,
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    setInvestments(prev => [newInv, ...prev]);
    setTransactions(prev => [newTx, ...prev]);
    return { success: true, message: `Flock plan ${plan.name} activated successfully from account balance!` };
  };

  // STEP: ADMIN APPROVES DEPOSIT -> PLAN BECOMES ACTIVE -> APPEARS IN USER DASHBOARD
  const approveDepositAndActivatePlan = (transactionId: string) => {
    const tx = transactions.find(t => t.id === transactionId);
    if (!tx || tx.status !== 'pending') {
      return { success: false, message: 'Transaction not found or already processed.' };
    }

    // 1. Find matching pending investment for this user & TID/plan
    let activatedPlanName = tx.planName || 'Poultry Plan';
    let hadPendingInvestment = false;
    setInvestments(prev => prev.map(inv => {
      if (inv.userId === tx.userId && (inv.tid === tx.tid || inv.planId === tx.planId) && inv.status === 'pending') {
        activatedPlanName = inv.planName;
        hadPendingInvestment = true;
        return {
          ...inv,
          status: 'active',
          startDate: new Date().toISOString(),
          lastHarvestDate: new Date().toISOString()
        };
      }
      return inv;
    }));

    // If there was no pending investment (e.g. general wallet deposit), credit user wallet balance
    setUsers(prev => prev.map(u => {
      if (u.id === tx.userId) {
        return {
          ...u,
          balance: hadPendingInvestment ? u.balance : u.balance + tx.amount,
          totalInvested: hadPendingInvestment ? u.totalInvested + tx.amount : u.totalInvested
        };
      }
      // If referred, credit tier 1 referral bonus in PKR
      const targetUser = users.find(usr => usr.id === tx.userId);
      if (targetUser?.referredBy && u.referralCode === targetUser.referredBy) {
        const bonus = (tx.amount * settings.referralTier1Percent) / 100;
        return {
          ...u,
          balance: u.balance + bonus,
          referralEarnings: u.referralEarnings + bonus
        };
      }
      return u;
    }));

    // 3. Mark transaction as completed / approved
    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'completed',
          approvedAt: new Date().toISOString()
        };
      }
      return t;
    }));

    return {
      success: true,
      message: `Deposit of ${settings.currencySymbol}${tx.amount.toLocaleString()} approved! ${hadPendingInvestment ? `Plan ${activatedPlanName} is now ACTIVE in user dashboard.` : `Balance credited to user.`}`
    };
  };

  const approveDeposit = (transactionId: string) => {
    return approveDepositAndActivatePlan(transactionId);
  };

  const rejectDeposit = (transactionId: string, reason: string) => {
    const tx = transactions.find(t => t.id === transactionId);
    if (!tx || tx.status !== 'pending') return;

    // Mark investment as cancelled
    setInvestments(prev => prev.map(inv => {
      if (inv.userId === tx.userId && (inv.tid === tx.tid || inv.planId === tx.planId) && inv.status === 'pending') {
        return {
          ...inv,
          status: 'cancelled'
        };
      }
      return inv;
    }));

    // Mark transaction as rejected
    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'rejected',
          rejectionReason: reason || 'Transaction could not be verified on JazzCash/Easypaisa'
        };
      }
      return t;
    }));
  };

  const collectDailyEggs = () => {
    if (!currentUser) {
      return { success: false, count: 0, valuePkr: 0, message: 'Please log in to harvest eggs.' };
    }

    const activeInvs = investments.filter(inv => inv.userId === currentUser.id && inv.status === 'active');

    let totalEggYield = 0;
    let totalPkrEarned = 0;

    if (activeInvs.length > 0) {
      activeInvs.forEach(inv => {
        totalEggYield += inv.dailyEggYield;
        totalPkrEarned += inv.dailyReturn;
      });
    } else {
      // Baseline free trial reward: 1 egg = Rs. 35
      totalEggYield = 1;
      totalPkrEarned = settings.eggUnitPricePkr || 35;
    }

    // Credit user balance and egg balance
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          eggBalance: u.eggBalance + totalEggYield,
          balance: u.balance + totalPkrEarned
        };
      }
      return u;
    }));

    // Update active investments harvest record
    setInvestments(prev => prev.map(inv => {
      if (inv.userId === currentUser.id && inv.status === 'active') {
        return {
          ...inv,
          totalEarned: inv.totalEarned + inv.dailyReturn,
          eggsHarvested: inv.eggsHarvested + inv.dailyEggYield,
          daysCompleted: Math.min(inv.durationDays, inv.daysCompleted + 1),
          lastHarvestDate: new Date().toISOString()
        };
      }
      return inv;
    }));

    // Log harvest transaction
    const newTx: Transaction = {
      id: `tx-hrv-${Date.now()}`,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      type: 'egg_harvest',
      amount: totalPkrEarned,
      eggCount: totalEggYield,
      method: 'Automated Daily Egg Collection',
      status: 'completed',
      createdAt: new Date().toISOString()
    };

    setTransactions(prev => [newTx, ...prev]);

    return {
      success: true,
      count: totalEggYield,
      valuePkr: totalPkrEarned,
      message: `Collected ${totalEggYield} fresh Grade-A eggs! Credited ${settings.currencySymbol}${totalPkrEarned} to your wallet.`
    };
  };

  const requestWithdrawal = (
    amountPkr: number,
    method: string,
    destinationAccount: string,
    accountTitle?: string
  ) => {
    if (!currentUser) {
      return { success: false, message: 'Please log in to submit a withdrawal.' };
    }
    const minWth = settings.minWithdrawalPkr || settings.minWithdrawal || 200;
    if (amountPkr < minWth) {
      return { success: false, message: `Minimum withdrawal is ${settings.currencySymbol}${minWth}.` };
    }
    if (currentUser.balance < amountPkr) {
      return { success: false, message: `Insufficient balance. Available: ${settings.currencySymbol}${currentUser.balance.toLocaleString()}` };
    }
    if (!destinationAccount.trim()) {
      return { success: false, message: 'Please provide your JazzCash or Bank account number.' };
    }

    // Deduct immediately
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, balance: u.balance - amountPkr } : u));

    const newTx: Transaction = {
      id: `tx-wth-${Date.now()}`,
      userId: currentUser.id,
      userEmail: currentUser.email,
      userName: currentUser.name,
      type: 'withdrawal',
      amount: amountPkr,
      method,
      walletAddress: `${destinationAccount.trim()}${accountTitle ? ` (${accountTitle.trim()})` : ''}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setTransactions(prev => [newTx, ...prev]);

    return {
      success: true,
      message: `Withdrawal request for ${settings.currencySymbol}${amountPkr.toLocaleString()} via ${method} submitted! Admin will transfer to ${destinationAccount}.`
    };
  };

  const approveWithdrawal = (transactionId: string) => {
    const tx = transactions.find(t => t.id === transactionId);
    if (!tx || tx.status !== 'pending' || tx.type !== 'withdrawal') return;

    setUsers(prev => prev.map(u => {
      if (u.id === tx.userId) {
        return {
          ...u,
          totalWithdrawn: u.totalWithdrawn + tx.amount
        };
      }
      return u;
    }));

    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'completed',
          approvedAt: new Date().toISOString()
        };
      }
      return t;
    }));
  };

  const rejectWithdrawal = (transactionId: string, reason: string) => {
    const tx = transactions.find(t => t.id === transactionId);
    if (!tx || tx.status !== 'pending' || tx.type !== 'withdrawal') return;

    // Refund back to user
    setUsers(prev => prev.map(u => {
      if (u.id === tx.userId) {
        return {
          ...u,
          balance: u.balance + tx.amount
        };
      }
      return u;
    }));

    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'rejected',
          rejectionReason: reason || 'Invalid recipient JazzCash/Easypaisa details'
        };
      }
      return t;
    }));
  };

  const submitSupportInquiry = (name: string, email: string, subject: string, message: string) => {
    const newInq: SupportInquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    setInquiries(prev => [newInq, ...prev]);
    return { success: true, message: 'Inquiry ticket received! Our Lahore agro-desk will respond shortly.' };
  };

  // ADMIN METHODS
  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      eggUnitPrice: newSettings.eggUnitPricePkr ?? newSettings.eggUnitPrice ?? prev.eggUnitPrice,
      minDeposit: newSettings.minDepositPkr ?? newSettings.minDeposit ?? prev.minDeposit,
      minWithdrawal: newSettings.minWithdrawalPkr ?? newSettings.minWithdrawal ?? prev.minWithdrawal,
      paymentMethods: {
        ...prev.paymentMethods,
        ...(newSettings.paymentMethods || {})
      }
    }));
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, ...updates } : u)));
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      eggRatePerUnit: userData.eggRatePerUnit ?? settings.eggUnitPricePkr,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const updatePlan = (planId: string, updates: Partial<Plan>) => {
    setPlans(prev => prev.map(p => (p.id === planId ? { ...p, ...updates } : p)));
  };

  const addPlan = (planData: Omit<Plan, 'id'>) => {
    const newPlan: Plan = {
      ...planData,
      id: `plan-${Date.now()}`,
      minDeposit: planData.pricePkr,
      maxDeposit: planData.pricePkr * 10
    };
    setPlans(prev => [...prev, newPlan]);
  };

  const deletePlan = (planId: string) => {
    setPlans(prev => prev.filter(p => p.id !== planId));
  };

  const addAnnouncement = (ann: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const updateInquiryStatus = (id: string, status: SupportInquiry['status'], reply?: string) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return {
          ...inq,
          status,
          replyNote: reply || inq.replyNote
        };
      }
      return inq;
    }));
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_settings`);
    localStorage.removeItem(`${STORAGE_KEY}_users`);
    localStorage.removeItem(`${STORAGE_KEY}_currentUser`);
    localStorage.removeItem(`${STORAGE_KEY}_plans`);
    localStorage.removeItem(`${STORAGE_KEY}_investments`);
    localStorage.removeItem(`${STORAGE_KEY}_transactions`);
    localStorage.removeItem(`${STORAGE_KEY}_announcements`);
    localStorage.removeItem(`${STORAGE_KEY}_inquiries`);

    setSettings(DEFAULT_SETTINGS);
    setUsers(DEFAULT_USERS);
    setCurrentUser(DEFAULT_USERS[0]);
    setPlans(DEFAULT_PLANS);
    setInvestments(DEFAULT_INVESTMENTS);
    setTransactions(DEFAULT_TRANSACTIONS);
    setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    setInquiries(DEFAULT_INQUIRIES);
  };

  return (
    <FarmContext.Provider
      value={{
        currentUser,
        users,
        plans,
        investments,
        transactions,
        announcements,
        inquiries,
        settings,
        isOwnerOrAdmin,
        login,
        quickLoginAsOwner,
        quickLoginAsUser,
        logout,
        register,
        submitJazzCashPlanDeposit,
        requestDeposit,
        investInPlan,
        collectDailyEggs,
        requestWithdrawal,
        submitSupportInquiry,
        updateSettings,
        updateUser,
        addUser,
        deleteUser,
        updatePlan,
        addPlan,
        deletePlan,
        approveDepositAndActivatePlan,
        approveDeposit,
        rejectDeposit,
        approveWithdrawal,
        rejectWithdrawal,
        addAnnouncement,
        deleteAnnouncement,
        toggleAnnouncement,
        updateInquiryStatus,
        resetAllData
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
