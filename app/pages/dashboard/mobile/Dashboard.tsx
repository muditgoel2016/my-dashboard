import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import QuickTransfer from '@/app/components/dashboard/QuickTransfer';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';
import { useDashboardData } from '@/pages/dashboard/useDashboardData';

// Keep dynamic imports as is
const WeeklyActivity = dynamic(() => import('@/app/components/dashboard/WeeklyActivity'), { ssr: false });
const ExpenseStatistics = dynamic(() => import('@/app/components/dashboard/ExpenseStatistics'), { ssr: false });
const BalanceHistory = dynamic(() => import('@/app/components/dashboard/BalanceHistory'), { ssr: false });
const loadingFallback = (
  <div className='animate-pulse h-[200px] w-full bg-gray-200 rounded-lg'></div>
);

const errorFallback = (section: string) => (
  <div className='text-red-500'>Error loading {section}</div>
);

// Types
interface DashboardData {
  cardsData?: any[];
  transactionsData?: any[];
  weeklyData?: any[];
  expenseData?: any[];
  quickTransferUserData?: any[];
  balanceHistoryData?: any[];
}

interface SSRConfig {
  CARDS_SSR_ENABLED: boolean;
  TRANSACTIONS_SSR_ENABLED: boolean;
  WEEKLY_SSR_ENABLED: boolean;
  EXPENSE_SSR_ENABLED: boolean;
  QUICK_TRANSFER_SSR_ENABLED: boolean;
  BALANCE_HISTORY_SSR_ENABLED: boolean;
}

interface MobileDashboardProps {
  initialData: DashboardData;
  ssrConfig: SSRConfig;
}

/**
 * Renders the mobile dashboard layout with progressive loading
 * @param root0
 * @param root0.initialData
 * @param root0.ssrConfig
 */
const MobileDashboard: React.FC<MobileDashboardProps> = ({ initialData, ssrConfig }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { dashboardData, loadingState, errors } = useDashboardData({
    initialData,
    ssrConfig
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className='px-4 py-6 pb-24 space-y-6'>
        {/* My Cards Section */}
        <div>
          <div className='p-3 flex justify-between items-center'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>My Cards</h2>
            <Link
              href='/pages/creditCards'
              className='text-[14px] font-semibold text-[#343C6A] hover:underline'>
              See All
            </Link>
          </div>
          {!loadingState.cards && dashboardData.cardsData ? (
            <div className='relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-4'>
              <div className='flex gap-4 snap-x snap-mandatory'>
                {dashboardData.cardsData.map((card, index) => {
                  const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;
                  const creditProviderLogo = (
                    <MasterCardLogo
                      fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'}/>
                  );

                  return (
                    <div key={index} className='snap-center shrink-0 first:pl-4 last:pr-4'>
                      <div className='w-72'>
                        <CreditCard
                          balance={card.balance}
                          holder={card.holder}
                          validThru={card.validThru}
                          cardNumber={card.cardNumber}
                          ChipImage={ChipImage}
                          theme={{ ...card.theme, creditProviderLogo }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : loadingFallback}
        </div>

        {/* Recent Transactions */}
        <ErrorBoundary fallback={errorFallback('Recent Transactions')}>
          <div>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>Recent Transactions</h2>
            </div>
            <Suspense fallback={loadingFallback}>
              {!loadingState.transactions && dashboardData.transactionsData && (
                <RecentTransactions transactions={dashboardData.transactionsData} />
              )}
            </Suspense>
          </div>
        </ErrorBoundary>

        {/* Weekly Activity */}
        <ErrorBoundary fallback={errorFallback('Weekly Activity')}>
          <div>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>Weekly Activity</h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              <Suspense fallback={loadingFallback}>
                {!loadingState.weekly && dashboardData.weeklyData && (
                  <WeeklyActivity data={dashboardData.weeklyData} />
                )}
              </Suspense>
            </div>
          </div>
        </ErrorBoundary>

        {/* Expense Statistics */}
        <ErrorBoundary fallback={errorFallback('Expense Statistics')}>
          <div>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>Expense Statistics</h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              <Suspense fallback={loadingFallback}>
                {!loadingState.expense && dashboardData.expenseData && (
                  <ExpenseStatistics data={dashboardData.expenseData} />
                )}
              </Suspense>
            </div>
          </div>
        </ErrorBoundary>

        {/* Quick Transfer */}
        <ErrorBoundary fallback={errorFallback('Quick Transfer')}>
          <div>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>Quick Transfer</h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              {!loadingState.quickTransfer && dashboardData.quickTransferUserData && (
                <QuickTransfer users={dashboardData.quickTransferUserData} defaultAmount='525.50' />
              )}
            </div>
          </div>
        </ErrorBoundary>

        {/* Balance History */}
        <ErrorBoundary fallback={errorFallback('Balance History')}>
          <div>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>Balance History</h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              <Suspense fallback={loadingFallback}>
                {!loadingState.balanceHistory && dashboardData.balanceHistoryData && (
                  <BalanceHistory data={dashboardData.balanceHistoryData} />
                )}
              </Suspense>
            </div>
          </div>
        </ErrorBoundary>
      </main>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
};

export default MobileDashboard;