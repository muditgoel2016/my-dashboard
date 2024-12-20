// app/services/hooks/useDashboardData.ts
import { useState, useEffect } from 'react';
import { dashboardDataService } from '@/services/dataServices/dashboard/dashboardDataService';

// Types
interface DashboardData {
  weeklyData: any[];
  balanceHistoryData: any[];
  expenseData: any[];
  transactionsData: any[];
  quickTransferUserData: any[];
  cardsData: any[];
}

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        const [cards, transactions, weekly, expense, quickTransfer, balanceHistory] = await Promise.all([
          dashboardDataService.getCardsData(),
          dashboardDataService.getTransactionsData(),
          dashboardDataService.getWeeklyActivityData(),
          dashboardDataService.getExpenseStatisticsData(),
          dashboardDataService.getQuickTransferUsersData(),
          dashboardDataService.getBalanceHistoryData(),
        ]);

        setDashboardData({
          cardsData: cards,
          transactionsData: transactions,
          weeklyData: weekly,
          expenseData: expense,
          quickTransferUserData: quickTransfer,
          balanceHistoryData: balanceHistory,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDashboardData();
  }, []);

  return { dashboardData, isLoading, error };
};
