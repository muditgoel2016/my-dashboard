'use client';

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
import { useDashboard } from '@/app/contexts/DashboardContext';

// Keep dynamic imports as is
const WeeklyActivity = dynamic(() => import('@/app/components/dashboard/WeeklyActivity'), { ssr: false });
const ExpenseStatistics = dynamic(() => import('@/app/components/dashboard/ExpenseStatistics'), { ssr: false });
const BalanceHistory = dynamic(() => import('@/app/components/dashboard/BalanceHistory'), { ssr: false });

// Skeleton loaders with accessibility improvements
const cardSkeleton = (
  <div
    className='pl-4'
    role='status'
    aria-label='Loading credit card'>
    <div
      className='w-[350px] h-[235px] bg-gray-200 rounded-2xl animate-pulse'
      aria-hidden='true'/>
  </div>
);

const transactionsSkeleton = (
  <div
    className='space-y-4 p-4'
    role='status'
    aria-label='Loading transactions'>
    {[1, 2, 3].map((index) => (
      <div
        key={index}
        className='flex items-center justify-between'
        aria-hidden='true'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse' />
          <div className='space-y-2'>
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
            <div className='h-3 w-20 bg-gray-200 rounded animate-pulse' />
          </div>
        </div>
        <div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
      </div>
    ))}
  </div>
);

const chartSkeleton = (
  <div
    className='h-[200px] w-full bg-gray-200 rounded-xl animate-pulse'
    role='status'
    aria-label='Loading chart'
    aria-hidden='true'/>
);

const errorFallback = (section: string) => (
  <div
    className='text-red-500'
    role='alert'
    aria-live='polite'>
    Error loading {section}
  </div>
);

const Dashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
    <div
      className='min-h-screen bg-gray-50'
      role='application'
      aria-label='Mobile Dashboard'>
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main
        className='px-4 py-6 pb-24 space-y-6'
        role='main'
        aria-label='Dashboard Content'>
        {/* My Cards Section */}
        <ErrorBoundary fallback={errorFallback('Cards')}>
          <div role='region' aria-label='Credit Cards'>
            <div className='p-3 flex justify-between items-center'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>My Cards</h2>
              <Link
                href='/pages/creditCards'
                className='text-[14px] font-semibold text-[#343C6A] hover:underline'
                aria-label='View all credit cards'>
                See All
              </Link>
            </div>
            <div
              className='relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-4'
              role='region'
              aria-label='Credit cards carousel'>
              {!isLoading && cards ? (
                <div
                  className='flex gap-4 snap-x snap-mandatory'
                  role='list'
                  aria-label='Available credit cards'>
                  {cards.map((card) => {
                    const ChipImage = card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack;

                    const cardWithLogo = {
                      ...card,
                      theme: {
                        ...card.theme,
                        creditProviderLogo: (
                          <MasterCardLogo
                            fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'}/>
                        ),
                      },
                    };

                    return (
                      <div
                        key={card.id}
                        className='snap-center shrink-0 first:pl-4 last:pr-4'
                        role='listitem'
                        aria-label={`Credit card ending in ${card.lastFourDigits}`}>
                        <CreditCard card={cardWithLogo} ChipImage={ChipImage} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                cardSkeleton
              )}
            </div>
          </div>
        </ErrorBoundary>

        {/* Recent Transactions */}
        <ErrorBoundary fallback={errorFallback('Recent Transactions')}>
          <div role='region' aria-label='Recent Transactions'>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
                Recent Transactions
              </h2>
            </div>
            <Suspense fallback={transactionsSkeleton}>
              {!isLoading && transactions && (
                <RecentTransactions transactions={transactions} />
              )}
            </Suspense>
          </div>
        </ErrorBoundary>

        {/* Weekly Activity */}
        <ErrorBoundary fallback={errorFallback('Weekly Activity')}>
          <div role='region' aria-label='Weekly Activity'>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
                Weekly Activity
              </h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              <Suspense fallback={chartSkeleton}>
                {!isLoading && weeklyActivity && (
                  <WeeklyActivity data={weeklyActivity} />
                )}
              </Suspense>
            </div>
          </div>
        </ErrorBoundary>

        {/* Expense Statistics */}
        <ErrorBoundary fallback={errorFallback('Expense Statistics')}>
          <div role='region' aria-label='Expense Statistics'>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
                Expense Statistics
              </h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              <Suspense fallback={chartSkeleton}>
                {!isLoading && expenses && (
                  <ExpenseStatistics data={expenses} />
                )}
              </Suspense>
            </div>
          </div>
        </ErrorBoundary>

        {/* Quick Transfer */}
        <ErrorBoundary fallback={errorFallback('Quick Transfer')}>
          <div role='region' aria-label='Quick Transfer'>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
                Quick Transfer
              </h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              {!isLoading && quickTransferUsers && (
                <QuickTransfer users={quickTransferUsers} defaultAmount='525.50' />
              )}
            </div>
          </div>
        </ErrorBoundary>

        {/* Balance History */}
        <ErrorBoundary fallback={errorFallback('Balance History')}>
          <div role='region' aria-label='Balance History'>
            <div className='p-3'>
              <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
                Balance History
              </h2>
            </div>
            <div className='bg-white p-4 rounded-xl'>
              <Suspense fallback={chartSkeleton}>
                {!isLoading && balanceHistory && (
                  <BalanceHistory data={balanceHistory} />
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

export default Dashboard;
