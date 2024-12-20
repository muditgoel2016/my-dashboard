'use client';

import useMediaQuery from '@/app/services/otherServices/useMediaQuery';
import DesktopDashboard from './desktop/Dashboard';
import MobileDashboard from './mobile/Dashboard';

interface SSRConfig {
  CARDS_SSR_ENABLED: boolean;
  TRANSACTIONS_SSR_ENABLED: boolean;
  WEEKLY_SSR_ENABLED: boolean;
  EXPENSE_SSR_ENABLED: boolean;
  QUICK_TRANSFER_SSR_ENABLED: boolean;
  BALANCE_HISTORY_SSR_ENABLED: boolean;
}

interface DashboardData {
  cardsData?: any;
  transactionsData?: any;
  weeklyData?: any;
  expenseData?: any;
  quickTransferUserData?: any;
  balanceHistoryData?: any;
}

interface Props {
  initialIsMobile: boolean;
  initialDashboardData: DashboardData;
  ssrConfig: SSRConfig;
}

/**
 * Renders either mobile or desktop dashboard based on viewport size
 * @param initialIsMobile - Initial mobile state from server
 * @param initialDashboardData - Pre-fetched data from server
 * @param ssrConfig - Configuration for SSR-enabled data services
 */
const ClientDashboard = ({ 
  initialIsMobile, 
  initialDashboardData, 
  ssrConfig 
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)', initialIsMobile);

  const DashboardComponent = isMobile ? MobileDashboard : DesktopDashboard;
  
  return (
    <DashboardComponent 
      initialData={initialDashboardData} 
      ssrConfig={ssrConfig} 
    />
  );
};

export default ClientDashboard;