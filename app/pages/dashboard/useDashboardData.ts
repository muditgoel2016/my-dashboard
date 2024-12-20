import { useState, useEffect } from 'react';
import { dashboardDataService } from '@/services/dataServices/dashboard/dashboardDataService';

interface SSRConfig {
  CARDS_SSR_ENABLED: boolean;
  TRANSACTIONS_SSR_ENABLED: boolean;
  WEEKLY_SSR_ENABLED: boolean;
  EXPENSE_SSR_ENABLED: boolean;
  QUICK_TRANSFER_SSR_ENABLED: boolean;
  BALANCE_HISTORY_SSR_ENABLED: boolean;
}

interface DashboardData {
  cardsData?: any[];
  transactionsData?: any[];
  weeklyData?: any[];
  expenseData?: any[];
  quickTransferUserData?: any[];
  balanceHistoryData?: any[];
}

interface LoadingState {
  cards: boolean;
  transactions: boolean;
  weekly: boolean;
  expense: boolean;
  quickTransfer: boolean;
  balanceHistory: boolean;
}

interface ErrorState {
  cards: Error | null;
  transactions: Error | null;
  weekly: Error | null;
  expense: Error | null;
  quickTransfer: Error | null;
  balanceHistory: Error | null;
}

interface UseDashboardDataProps {
  initialData: DashboardData;
  ssrConfig: SSRConfig;
}

export const useDashboardData = ({ initialData, ssrConfig }: UseDashboardDataProps) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialData);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    cards: !ssrConfig.CARDS_SSR_ENABLED,
    transactions: !ssrConfig.TRANSACTIONS_SSR_ENABLED,
    weekly: !ssrConfig.WEEKLY_SSR_ENABLED,
    expense: !ssrConfig.EXPENSE_SSR_ENABLED,
    quickTransfer: !ssrConfig.QUICK_TRANSFER_SSR_ENABLED,
    balanceHistory: !ssrConfig.BALANCE_HISTORY_SSR_ENABLED
  });
  const [errors, setErrors] = useState<ErrorState>({
    cards: null,
    transactions: null,
    weekly: null,
    expense: null,
    quickTransfer: null,
    balanceHistory: null
  });

  useEffect(() => {
    const fetchCards = async () => {
      if (!ssrConfig.CARDS_SSR_ENABLED) {
        try {
          const data = await dashboardDataService.getCardsData(false);
          setDashboardData(prev => ({ ...prev, cardsData: data }));
        } catch (err) {
          setErrors(prev => ({ 
            ...prev, 
            cards: err instanceof Error ? err : new Error('Failed to fetch cards data') 
          }));
        } finally {
          setLoadingState(prev => ({ ...prev, cards: false }));
        }
      }
    };

    const fetchTransactions = async () => {
      if (!ssrConfig.TRANSACTIONS_SSR_ENABLED) {
        try {
          const data = await dashboardDataService.getTransactionsData(false);
          setDashboardData(prev => ({ ...prev, transactionsData: data }));
        } catch (err) {
          setErrors(prev => ({ 
            ...prev, 
            transactions: err instanceof Error ? err : new Error('Failed to fetch transactions data') 
          }));
        } finally {
          setLoadingState(prev => ({ ...prev, transactions: false }));
        }
      }
    };

    const fetchWeekly = async () => {
      if (!ssrConfig.WEEKLY_SSR_ENABLED) {
        try {
          const data = await dashboardDataService.getWeeklyActivityData(false);
          setDashboardData(prev => ({ ...prev, weeklyData: data }));
        } catch (err) {
          setErrors(prev => ({ 
            ...prev, 
            weekly: err instanceof Error ? err : new Error('Failed to fetch weekly data') 
          }));
        } finally {
          setLoadingState(prev => ({ ...prev, weekly: false }));
        }
      }
    };

    const fetchExpense = async () => {
      if (!ssrConfig.EXPENSE_SSR_ENABLED) {
        try {
          const data = await dashboardDataService.getExpenseStatisticsData(false);
          setDashboardData(prev => ({ ...prev, expenseData: data }));
        } catch (err) {
          setErrors(prev => ({ 
            ...prev, 
            expense: err instanceof Error ? err : new Error('Failed to fetch expense data') 
          }));
        } finally {
          setLoadingState(prev => ({ ...prev, expense: false }));
        }
      }
    };

    const fetchQuickTransfer = async () => {
      if (!ssrConfig.QUICK_TRANSFER_SSR_ENABLED) {
        try {
          const data = await dashboardDataService.getQuickTransferUsersData(false);
          setDashboardData(prev => ({ ...prev, quickTransferUserData: data }));
        } catch (err) {
          setErrors(prev => ({ 
            ...prev, 
            quickTransfer: err instanceof Error ? err : new Error('Failed to fetch quick transfer data') 
          }));
        } finally {
          setLoadingState(prev => ({ ...prev, quickTransfer: false }));
        }
      }
    };

    const fetchBalanceHistory = async () => {
      if (!ssrConfig.BALANCE_HISTORY_SSR_ENABLED) {
        try {
          const data = await dashboardDataService.getBalanceHistoryData(false);
          setDashboardData(prev => ({ ...prev, balanceHistoryData: data }));
        } catch (err) {
          setErrors(prev => ({ 
            ...prev, 
            balanceHistory: err instanceof Error ? err : new Error('Failed to fetch balance history') 
          }));
        } finally {
          setLoadingState(prev => ({ ...prev, balanceHistory: false }));
        }
      }
    };

    // Start all fetches independently
    void fetchCards();
    void fetchTransactions();
    void fetchWeekly();
    void fetchExpense();
    void fetchQuickTransfer();
    void fetchBalanceHistory();

  }, [ssrConfig]);

  return {
    dashboardData,
    loadingState,
    errors,
    // Helper to check if a specific data type is ready
    isDataReady: (key: keyof DashboardData) => {
      const loadingKey = key.replace('Data', '') as keyof LoadingState;
      return !loadingState[loadingKey] && !errors[loadingKey] && !!dashboardData[key];
    }
  };
};