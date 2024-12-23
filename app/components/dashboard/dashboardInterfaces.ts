// Interfaces for BalanceHistory.ts
export interface BalanceHistoryData {
  month: string;
  value: number;
}

export interface BalanceHistoryProps {
  data: BalanceHistoryData[];
  height?: number;
  gradientColor?: string;
  lineColor?: string;
  title?: string; // Add title prop for accessibility
  description?: string; // Add description prop for accessibility
}

// Interfaces for CreditCard.ts
import type { ReactNode } from 'react';

export interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
  labelColor: string;
  valueColor: string;
  creditProviderLogo?: ReactNode;
  border?: {
    enabled: boolean;
    value?: string;
  };
  gradients?: {
    overall?: {
      enabled: boolean;
      value: string;
    };
    footer?: {
      enabled: boolean;
      value: string;
    };
  };
  separator?: {
    enabled: boolean;
    value?: string;
  };
}

export interface Card {
  id: number;
  balance: string;
  holder: string;
  validThru: string;
  cardNumber: string;
  theme: CardTheme;
  labels?: {
    balance: string;
    cardHolder: string;
    validThru: string;
  };
}

export interface CreditCardProps {
  card: Card;
  ChipImage?: React.ComponentType;
  width?: string;
  height?: string;
  className?: string;
  onCardClick?: () => void;
}

// Interfaces for ExpenseStatistics.ts
export interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

export interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

export interface ExpenseStatisticsProps {
  data: ExpenseData[];
}

// Interfaces for QuickTransfer.ts
export interface User {
  name: string;
  title: string;
  avatarUrl: string;
}

export interface QuickTransferProps {
  users: User[];
  defaultAmount?: string;
  onSend?: (amount: string) => Promise<void>;
}

// Interfaces for RecentTransactions.ts
export interface TransactionIcon {
  bg: string;
  color: string;
}

export interface Transaction {
  id: string | number;
  title: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number | string;
  depositMode: 'card' | 'paypal' | 'cash';
  icon: TransactionIcon;
}

export interface RecentTransactionsProps {
  transactions: Transaction[];
}

// Interfaces for WeeklyActivity.ts
export interface ActivityData {
  name: string;
  deposit: number;
  withdraw: number;
}

export interface WeeklyActivityProps {
  data: ActivityData[];
}
