import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import QuickTransfer from '@/app/components/dashboard/QuickTransfer';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';
import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService';

// Dynamic imports with SSR disabled
const WeeklyActivity = dynamic(() => import('@/app/components/dashboard/WeeklyActivity'), { ssr: false });
const ExpenseStatistics = dynamic(() => import('@/app/components/dashboard/ExpenseStatistics'), { ssr: false });
const BalanceHistory = dynamic(() => import('@/app/components/dashboard/BalanceHistory'), { ssr: false });

/**
 *
 */
export default function MobileDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [quickTransferData, setQuickTransferData] = useState([]);
  const [balanceHistoryData, setBalanceHistoryData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [cards, transactions, weekly, expense, quickTransfer, balanceHistory] = await Promise.all([
          dashboardDataService.getCardsData(),
          dashboardDataService.getTransactionsData(),
          dashboardDataService.getWeeklyActivityData(),
          dashboardDataService.getExpenseStatisticsData(),
          dashboardDataService.getQuickTransferUsersData(),
          dashboardDataService.getBalanceHistoryData()
        ]);

        setCardsData(cards);
        setTransactionsData(transactions);
        setWeeklyData(weekly);
        setExpenseData(expense);
        setQuickTransferData(quickTransfer);
        setBalanceHistoryData(balanceHistory);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className='px-4 py-6 pb-24 space-y-6'>
        {/* My Cards Section */}
        <div>
          <div className='p-3 flex justify-between items-center bg-inherit'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
              My Cards
            </h2>
            <Link 
              href='/pages/creditCards' 
              className='text-[14px] font-semibold leading-[20.57px] text-[#343C6A] 
                       hover:scale-105 active:scale-100
                       hover:underline transition-all duration-200 
                       cursor-pointer text-right underline-offset-2'>
              See All
            </Link>
          </div>
          <div className='relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pb-4'>
            <div className='flex gap-4 snap-x snap-mandatory'>
              {cardsData.map((card, index) => (
                <div key={index} className='snap-center shrink-0 first:pl-4 last:pr-4'>
                  <div className='w-72'>
                    <CreditCard
                      key={index}
                      balance={card.balance}
                      holder={card.holder}
                      validThru={card.validThru}
                      cardNumber={card.cardNumber}
                      ChipImage={card.theme.bgColor === 'bg-[#31304D]' ? EMVChip : EMVChipBlack}
                      theme={{
                        ...card.theme,
                        creditProviderLogo: <MasterCardLogo fillColor={card.theme.bgColor === 'bg-[#31304D]' ? 'white' : '#1a1f36'} />
                      }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Transaction */}
        <div>
          <div className='p-3 flex justify-between items-center bg-inherit'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
              Recent Transaction
            </h2>
          </div>
          <RecentTransactions transactions={transactionsData} />
        </div>

        {/* Weekly Activity */}
        <div>
          <div className='p-3 flex justify-between items-center bg-inherit'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
              Weekly Activity
            </h2>
          </div>
          <div className='bg-white p-4 rounded-xl'>
            <WeeklyActivity data={weeklyData} />
          </div>
        </div>

        {/* Expense Statistics */}
        <div>
          <div className='p-3 flex justify-between items-center bg-inherit'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
              Expense Statistics
            </h2>
          </div>
          <div className='bg-white p-4 rounded-xl'>
            <div className='flex flex-col items-center'>
              <ExpenseStatistics data={expenseData} />
            </div>
          </div>
        </div>

        {/* Quick Transfer */}
        <div>
          <div className='p-3 flex justify-between items-center bg-inherit'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
              Quick Transfer
            </h2>
          </div>
          <div className='bg-white p-4 rounded-xl'>
            <QuickTransfer
              users={quickTransferData}
              defaultAmount='525.50'/>
          </div>
        </div>

        {/* Balance History */}
        <div>
          <div className='p-3 flex justify-between items-center bg-inherit'>
            <h2 className='text-[16px] font-semibold leading-[20.57px] text-[#343C6A]'>
              Balance History
            </h2>
          </div>
          <div className='bg-white p-4 rounded-xl'>
            <div className='overflow-x-auto'>
              <div className='min-w-[340px]'>
                <BalanceHistory data={balanceHistoryData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}