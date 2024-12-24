'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { dashboardDataService } from '@/services/dataServices/dashboard/dashboardDataService';
import type {
  BalanceHistoryData,
  Card,
  ExpenseData,
  User as QuickTransferUser,
  Transaction,
  ActivityData,
} from '@/app/components/dashboard/dashboardInterfaces';

interface DashboardState {
  balanceHistory: BalanceHistoryData[];
  cardsData: Card[];
  expenses: ExpenseData[];
  quickTransferUserData: QuickTransferUser[];
  transactionsData: Transaction[];
  weeklyActivity: ActivityData[];
  isLoading: boolean;
}

interface SSRConfig {
  CARDS_SSR_ENABLED: boolean;
  TRANSACTIONS_SSR_ENABLED: boolean;
  WEEKLY_SSR_ENABLED: boolean;
  EXPENSE_SSR_ENABLED: boolean;
  QUICK_TRANSFER_SSR_ENABLED: boolean;
  BALANCE_HISTORY_SSR_ENABLED: boolean;
}

interface DashboardContextData extends DashboardState {
  setBalanceHistory: (data: BalanceHistoryData[]) => void;
  setCards: (data: Card[]) => void;
  setExpenses: (data: ExpenseData[]) => void;
  setQuickTransferUsers: (data: QuickTransferUser[]) => void;
  setTransactions: (data: Transaction[]) => void;
  setWeeklyActivity: (data: ActivityData[]) => void;
  setIsLoading: (loading: boolean) => void;
  resetState: () => void;
}

interface DashboardProviderProps {
  children: React.ReactNode;
  initialData?: Partial<DashboardState>; // Allow partial data for server-side initialization
  ssrConfig: SSRConfig;
}

const initialState: DashboardState = {
  balanceHistory: [],
  cardsData: [],
  expenses: [],
  quickTransferUserData: [],
  transactionsData: [],
  weeklyActivity: [],
  isLoading: false,
};

const DashboardContext = createContext<DashboardContextData | undefined>(undefined);

export function DashboardProvider({ children, initialData = {}, ssrConfig }: DashboardProviderProps) {
  const [balanceHistory, setBalanceHistory] = useState(initialData.balanceHistory || []);
  const [cards, setCards] = useState(initialData.cardsData || []);
  const [expenses, setExpenses] = useState(initialData.expenses || []);
  const [quickTransferUsers, setQuickTransferUsers] = useState(initialData.quickTransferUserData || []);
  const [transactions, setTransactions] = useState(initialData.transactionsData || []);
  const [weeklyActivity, setWeeklyActivity] = useState(initialData.weeklyActivity || []);
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => {
    setBalanceHistory(initialState.balanceHistory);
    setCards(initialState.cardsData);
    setExpenses(initialState.expenses);
    setQuickTransferUsers(initialState.quickTransferUserData);
    setTransactions(initialState.transactionsData);
    setWeeklyActivity(initialState.weeklyActivity);
    setIsLoading(initialState.isLoading);
  };

  // Fetch client-side data based on SSR configuration
  useEffect(() => {
    const fetchClientSideData = async () => {
      setIsLoading(true);
      const fetchTasks = [];

      if (!ssrConfig.CARDS_SSR_ENABLED) {
        fetchTasks.push(
          dashboardDataService.getCardsData(false).then(setCards).catch(console.error)
        );
      }

      if (!ssrConfig.TRANSACTIONS_SSR_ENABLED) {
        fetchTasks.push(
          dashboardDataService.getTransactionsData(false).then(setTransactions).catch(console.error)
        );
      }

      if (!ssrConfig.WEEKLY_SSR_ENABLED) {
        fetchTasks.push(
          dashboardDataService.getWeeklyActivityData(false).then(setWeeklyActivity).catch(console.error)
        );
      }

      if (!ssrConfig.EXPENSE_SSR_ENABLED) {
        fetchTasks.push(
          dashboardDataService.getExpenseStatisticsData(false).then(setExpenses).catch(console.error)
        );
      }

      if (!ssrConfig.QUICK_TRANSFER_SSR_ENABLED) {
        fetchTasks.push(
          dashboardDataService.getQuickTransferUsersData(false).then(setQuickTransferUsers).catch(console.error)
        );
      }

      if (!ssrConfig.BALANCE_HISTORY_SSR_ENABLED) {
        fetchTasks.push(
          dashboardDataService.getBalanceHistoryData(false).then(setBalanceHistory).catch(console.error)
        );
      }

      await Promise.allSettled(fetchTasks);
      setIsLoading(false);
    };

    fetchClientSideData();
  }, [ssrConfig]);

  return (
    <DashboardContext.Provider
      value={{
        balanceHistory,
        cards,
        expenses,
        quickTransferUsers,
        transactions,
        weeklyActivity,
        isLoading,
        setBalanceHistory,
        setCards,
        setExpenses,
        setQuickTransferUsers,
        setTransactions,
        setWeeklyActivity,
        setIsLoading,
        resetState,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
