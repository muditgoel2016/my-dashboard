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
import { useDashboard } from '@/app/contexts/DashboardContext';

// Error fallback elements
const cardsErrorFallback = <div role="alert">Error loading cards section</div>;
const transactionsErrorFallback = <div role="alert">Error loading transactions</div>;
const weeklyActivityErrorFallback = <div role="alert">Error loading weekly activity</div>;
const expenseStatisticsErrorFallback = <div role="alert">Error loading expense statistics</div>;
const quickTransferErrorFallback = <div role="alert">Error loading quick transfer</div>;
const balanceHistoryErrorFallback = <div role="alert">Error loading balance history</div>;

// Loading fallback elements
const loadingFallback = (
  <div
    className="animate-pulse h-[400px] bg-gray-100 rounded-[25px]"
    role="status"
    aria-busy="true"
    aria-label="Loading content"
  />
);

// Lazy loaded components
const BalanceHistory = dynamic(
  () => import('@/app/components/dashboard/BalanceHistory'),
  { ssr: false, loading: () => loadingFallback }
);

const ExpenseStatistics = dynamic(
  () => import('@/app/components/dashboard/ExpenseStatistics'),
  { ssr: false, loading: () => loadingFallback }
);

const WeeklyActivity = dynamic(
  () => import('@/app/components/dashboard/WeeklyActivity'),
  { ssr: false, loading: () => loadingFallback }
);

// Memoized Section Components
const CardSection = React.memo(function CardSection({ cardsData }: { cardsData: any[] }) {
  return (
    <div
      className="flex flex-col basis-2/3 rounded-lg overflow-hidden"
      role="region"
      aria-label="Credit Cards Overview"
    >
      <div className="p-3 flex justify-between items-center bg-inherit">
        <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">My Cards</h2>
        <Link
          href="/pages/creditCards"
          className="text-[17px] font-semibold leading-[20.57px] text-[#343C6A] hover:scale-105 active:scale-100 hover:underline transition-all duration-200 cursor-pointer text-right underline-offset-2"
          aria-label="View all credit cards"
        >
          See All
        </Link>
      </div>
      <div
        className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
        role="region"
        aria-label="Credit cards carousel"
      >
        <div
          className="flex gap-6 snap-x snap-mandatory"
          role="list"
          aria-label="Available credit cards"
        >
          {cardsData.map((card) => {
            const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;

            const cardWithLogo = {
              ...card,
              theme: {
                ...card.theme,
                creditProviderLogo: (
                  <MasterCardLogo
                    fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'}
                  />
                ),
              },
            };

            return (
              <div
                key={card.id}
                className="snap-center shrink-0 first:pl-4 last:pr-4"
                role="listitem"
                aria-label={`Credit card ending in ${card.lastFourDigits}`}
              >
                <CreditCard card={cardWithLogo} ChipImage={ChipImage} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const Dashboard: React.FC = () => {
  const {
    cards,
    transactions,
    weeklyActivity,
    expenses,
    quickTransferUsers,
    balanceHistory,
    isLoading,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 flex" role="application" aria-label="Dashboard">
      <Sidenav />
      <div className="ml-64 w-[80%] flex-1">
        <TopBar />
        <main className="p-8" role="main" aria-label="Dashboard content">
          <div className="flex flex-col space-y-6">
            {/* First Row */}
            <div className="flex gap-6" role="region" aria-label="Cards and Transactions">
              <ErrorBoundary fallback={cardsErrorFallback}>
                {!isLoading && cards ? <CardSection cardsData={cards} /> : loadingFallback}
              </ErrorBoundary>

              <ErrorBoundary fallback={transactionsErrorFallback}>
                <div
                  className="flex flex-col basis-1/3 rounded-lg overflow-hidden"
                  role="region"
                  aria-label="Recent Transactions"
                >
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">
                      Recent Transactions
                    </h2>
                  </div>
                  <Suspense fallback={loadingFallback}>
                    {!isLoading && transactions && <RecentTransactions transactions={transactions} />}
                  </Suspense>
                </div>
              </ErrorBoundary>
            </div>

            {/* Second Row */}
            <div className="flex gap-6" role="region" aria-label="Activity and Statistics">
              <ErrorBoundary fallback={weeklyActivityErrorFallback}>
                <div
                  className="flex flex-col basis-2/3 rounded-lg overflow-hidden"
                  role="region"
                  aria-label="Weekly Activity Overview"
                >
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">
                      Weekly Activity
                    </h2>
                  </div>
                  <Card className="flex-1 rounded-[25px]">
                    <CardContent className="h-[calc(100%-48px)]">
                      <Suspense fallback={loadingFallback}>
                        {!isLoading && weeklyActivity && (
                          <div className="pt-4">
                            <WeeklyActivity data={weeklyActivity} />
                          </div>
                        )}
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback={expenseStatisticsErrorFallback}>
                <div
                  className="flex flex-col basis-1/3 rounded-lg overflow-hidden"
                  role="region"
                  aria-label="Expense Statistics Overview"
                >
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">
                      Expense Statistics
                    </h2>
                  </div>
                  <Card className="flex-1 rounded-[25px]">
                    <CardContent className="h-[400px] flex items-center justify-center">
                      <Suspense fallback={loadingFallback}>
                        {!isLoading && expenses && (
                          <ExpenseStatistics data={expenses} />
                        )}
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>
            </div>

            {/* Third Row */}
            <div className="flex gap-6" role="region" aria-label="Transfer and Balance History">
              <ErrorBoundary fallback={quickTransferErrorFallback}>
                <div
                  className="flex flex-col basis-1/3 rounded-lg overflow-hidden"
                  role="region"
                  aria-label="Quick Transfer Section"
                >
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">
                      Quick Transfer
                    </h2>
                  </div>
                  <Card className="flex-1 rounded-[25px]">
                    <CardContent className="p-0 flex items-center justify-center h-full">
                      {!isLoading && quickTransferUsers && (
                        <QuickTransfer users={quickTransferUsers} defaultAmount="525.50" />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback={balanceHistoryErrorFallback}>
                <div
                  className="flex flex-col basis-2/3 rounded-lg overflow-hidden"
                  role="region"
                  aria-label="Balance History Overview"
                >
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-[22px] font-semibold leading-[20.57px] text-[#343C6A]">
                      Balance History
                    </h2>
                  </div>
                  <Card className="flex-1 rounded-[25px]">
                    <CardContent className="h-[calc(100%-48px)]">
                      <Suspense fallback={loadingFallback}>
                        {!isLoading && balanceHistory && (
                          <BalanceHistory data={balanceHistory} />
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
