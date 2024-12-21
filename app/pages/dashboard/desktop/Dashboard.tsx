import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import QuickTransfer from '@/app/components/dashboard/QuickTransfer';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import { Card, CardContent } from '@/app/components/shared/common/card';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { useDashboardData } from '@/pages/dashboard/useDashboardData';

// Error fallback elements
const cardsErrorFallback = <div>Error loading cards section</div>;
const transactionsErrorFallback = <div>Error loading transactions</div>;
const weeklyActivityErrorFallback = <div>Error loading weekly activity</div>;
const expenseStatisticsErrorFallback = <div>Error loading expense statistics</div>;
const quickTransferErrorFallback = <div>Error loading quick transfer</div>;
const balanceHistoryErrorFallback = <div>Error loading balance history</div>;

// Loading fallback elements
const loadingFallback = <div className='animate-pulse h-[400px] bg-gray-100 rounded-[25px]' />;

// Lazy loaded components
const BalanceHistory = dynamic(
  () => import('@/app/components/dashboard/BalanceHistory'),
  {
    ssr: false,
    loading: () => loadingFallback
  }
);

const ExpenseStatistics = dynamic(
  () => import('@/app/components/dashboard/ExpenseStatistics'),
  {
    ssr: false,
    loading: () => loadingFallback
  }
);

const WeeklyActivity = dynamic(
  () => import('@/app/components/dashboard/WeeklyActivity'),
  {
    ssr: false,
    loading: () => loadingFallback
  }
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

interface DashboardProps {
  initialData: DashboardData;
  ssrConfig: SSRConfig;
}

// Memoized Section Components
const CardSection = React.memo(function CardSection({ 
  cardsData 
}: { 
  cardsData: any[] 
}) {
  return (
    <div className='flex flex-col basis-2/3 rounded-lg overflow-hidden'>
      <div className='p-3 flex justify-between items-center bg-inherit'>
        <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>My Cards</h2>
        <Link
          href='/pages/creditCards'
          className='text-[17px] font-semibold leading-[20.57px] text-[#343C6A] hover:scale-105 active:scale-100 hover:underline transition-all duration-200 cursor-pointer text-right underline-offset-2'>
          See All
        </Link>
      </div>
      <div className='relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'>
        <div className='flex gap-6 snap-x snap-mandatory'>
          {cardsData.map((card) => {
            const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;
            
            // Add creditProviderLogo to the card theme
            const cardWithLogo = {
              ...card,
              theme: {
                ...card.theme,
                creditProviderLogo: (
                  <MasterCardLogo 
                    fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'} 
                  />
                )
              }
            };

            return (
              <div key={card.id} className='snap-center shrink-0 first:pl-4 last:pr-4'>
                <CreditCard
                  card={cardWithLogo}
                  ChipImage={ChipImage}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

/**
 * Dashboard Component
 * Displays the dashboard, including credit cards, transactions, and various activity sections.
 * @param root0
 * @param root0.initialData
 * @param root0.ssrConfig
 */
const Dashboard: React.FC<DashboardProps> = ({ initialData, ssrConfig }) => {
  const { dashboardData, loadingState, errors } = useDashboardData({
    initialData,
    ssrConfig
  });

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <Sidenav />
      <div className='ml-64 w-[80%] flex-1'>
        <TopBar />
        <main className='p-8'>
          <div className='flex flex-col space-y-6'>
            {/* First Row */}
            <div className='flex gap-6'>
              <ErrorBoundary fallback={cardsErrorFallback}>
                {!loadingState.cards && dashboardData.cardsData ? (
                  <CardSection cardsData={dashboardData.cardsData} />
                ) : (
                  loadingFallback
                )}
              </ErrorBoundary>

              <ErrorBoundary fallback={transactionsErrorFallback}>
                <div className='flex flex-col basis-1/3 rounded-lg overflow-hidden'>
                  <div className='p-3 flex justify-between items-center bg-inherit'>
                    <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                      Recent Transactions
                    </h2>
                  </div>
                  <Suspense fallback={loadingFallback}>
                    {!loadingState.transactions && dashboardData.transactionsData && (
                      <RecentTransactions transactions={dashboardData.transactionsData} />
                    )}
                  </Suspense>
                </div>
              </ErrorBoundary>
            </div>

            {/* Second Row */}
            <div className='flex gap-6'>
              <ErrorBoundary fallback={weeklyActivityErrorFallback}>
                <div className='flex flex-col basis-2/3 rounded-lg overflow-hidden'>
                  <div className='p-3 flex justify-between items-center bg-inherit'>
                    <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                      Weekly Activity
                    </h2>
                  </div>
                  <Card className='flex-1 rounded-[25px]'>
                    <CardContent className='h-[calc(100%-48px)]'>
                      <Suspense fallback={loadingFallback}>
                        {!loadingState.weekly && dashboardData.weeklyData && (
                          <div className='pt-4'>
                            <WeeklyActivity data={dashboardData.weeklyData} />
                          </div>
                        )}
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback={expenseStatisticsErrorFallback}>
                <div className='flex flex-col basis-1/3 rounded-lg overflow-hidden'>
                  <div className='p-3 flex justify-between items-center bg-inherit'>
                    <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                      Expense Statistics
                    </h2>
                  </div>
                  <Card className='flex-1 rounded-[25px]'>
                    <CardContent className='h-[400px] flex items-center justify-center'>
                      <Suspense fallback={loadingFallback}>
                        {!loadingState.expense && dashboardData.expenseData && (
                          <ExpenseStatistics data={dashboardData.expenseData} />
                        )}
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>
            </div>

            {/* Third Row */}
            <div className='flex gap-6'>
              <ErrorBoundary fallback={quickTransferErrorFallback}>
                <div className='flex flex-col basis-1/3 rounded-lg overflow-hidden'>
                  <div className='p-3 flex justify-between items-center bg-inherit'>
                    <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                      Quick Transfer
                    </h2>
                  </div>
                  <Card className='flex-1 rounded-[25px]'>
                    <CardContent className='p-0 flex items-center justify-center h-full'>
                      {!loadingState.quickTransfer && dashboardData.quickTransferUserData && (
                        <QuickTransfer 
                          users={dashboardData.quickTransferUserData} 
                          defaultAmount='525.50'/>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback={balanceHistoryErrorFallback}>
                <div className='flex flex-col basis-2/3 rounded-lg overflow-hidden'>
                  <div className='p-3 flex justify-between items-center bg-inherit'>
                    <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                      Balance History
                    </h2>
                  </div>
                  <Card className='flex-1 rounded-[25px]'>
                    <CardContent className='h-[calc(100%-48px)]'>
                      <Suspense fallback={loadingFallback}>
                        {!loadingState.balanceHistory && dashboardData.balanceHistoryData && (
                          <BalanceHistory data={dashboardData.balanceHistoryData} />
                        )}
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;