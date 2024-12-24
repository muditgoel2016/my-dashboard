import { type NextPage } from 'next';
import { headers } from 'next/headers';

import { DashboardProvider } from '@/app/contexts/DashboardContext';
import { isMobileUserAgent } from '@/app/services/otherServices/utils';
import { dashboardDataService } from '@/services/dataServices/dashboard/dashboardDataService';

import ClientDashboard from './client';

interface DashboardData {
  cardsData?: any[];
  transactionsData?: any[];
  weeklyData?: any[];
  expenseData?: any[];
  quickTransferUserData?: any[];
  balanceHistoryData?: any[];
}

// Configuration flags for each data service
const CONFIG = {
  CARDS_SSR_ENABLED: true,
  TRANSACTIONS_SSR_ENABLED: true,
  WEEKLY_SSR_ENABLED: false, //should be kept false as ui library dosnt's support SSR
  EXPENSE_SSR_ENABLED: false, //should be kept false as ui library dosnt's support SSR
  QUICK_TRANSFER_SSR_ENABLED: true,
  BALANCE_HISTORY_SSR_ENABLED: false, //should be kept false as ui library dosnt's support SSR
} as const;

/**
 * Server Component for the Dashboard page.
 * @returns {Promise<any>} Dashboard page component with appropriate mobile/desktop view.
 */
const DashboardPage: NextPage = async (): Promise<any> => {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const initialIsMobile = isMobileUserAgent(userAgent);

  // Initialize dashboard data
  const preFetchedData: DashboardData = {};

  try {
    // Fetch cards data if SSR enabled
    if (CONFIG.CARDS_SSR_ENABLED) {
      try {
        const cards = await dashboardDataService.getCardsData(true);
        if (cards) {preFetchedData.cardsData = cards;}
      } catch (error) {
        console.error('Failed to fetch cards data:', error);
      }
    }

    // Fetch transactions data if SSR enabled
    if (CONFIG.TRANSACTIONS_SSR_ENABLED) {
      try {
        const transactions = await dashboardDataService.getTransactionsData(true);
        if (transactions) {preFetchedData.transactionsData = transactions;}
      } catch (error) {
        console.error('Failed to fetch transactions data:', error);
      }
    }

    // Fetch weekly activity data if SSR enabled
    if (CONFIG.WEEKLY_SSR_ENABLED) {
      try {
        const weekly = await dashboardDataService.getWeeklyActivityData(true);
        if (weekly) {preFetchedData.weeklyData = weekly;}
      } catch (error) {
        console.error('Failed to fetch weekly activity data:', error);
      }
    }

    // Fetch expense statistics data if SSR enabled
    if (CONFIG.EXPENSE_SSR_ENABLED) {
      try {
        const expense = await dashboardDataService.getExpenseStatisticsData(true);
        if (expense) {preFetchedData.expenseData = expense;}
      } catch (error) {
        console.error('Failed to fetch expense statistics data:', error);
      }
    }

    // Fetch quick transfer data if SSR enabled
    if (CONFIG.QUICK_TRANSFER_SSR_ENABLED) {
      try {
        const quickTransfer = await dashboardDataService.getQuickTransferUsersData(true);
        if (quickTransfer) {preFetchedData.quickTransferUserData = quickTransfer;}
      } catch (error) {
        console.error('Failed to fetch quick transfer data:', error);
      }
    }

    // Fetch balance history data if SSR enabled
    if (CONFIG.BALANCE_HISTORY_SSR_ENABLED) {
      try {
        const balanceHistory = await dashboardDataService.getBalanceHistoryData(true);
        if (balanceHistory) {preFetchedData.balanceHistoryData = balanceHistory;}
      } catch (error) {
        console.error('Failed to fetch balance history data:', error);
      }
    }

  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    // Continue with empty data
  }

  return (
    <DashboardProvider initialData={preFetchedData} ssrConfig={CONFIG}>
      <ClientDashboard initialIsMobile={initialIsMobile} />
    </DashboardProvider>
  );
};

export default DashboardPage;