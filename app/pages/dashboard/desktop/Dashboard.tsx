import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import QuickTransfer from '@/app/components/dashboard/QuickTransfer';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import { Card, CardContent } from '@/app/components/shared/common/card';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService';

const BalanceHistory = dynamic(() => import('@/app/components/dashboard/BalanceHistory'), { ssr: false });
const ExpenseStatistics = dynamic(() => import('@/app/components/dashboard/ExpenseStatistics'), { ssr: false });
const WeeklyActivity = dynamic(() => import('@/app/components/dashboard/WeeklyActivity'), { ssr: false });

/**
 *
 */
export default function Dashboard() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [balanceHistoryData, setBalanceHistoryData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [quickTransferUserData, setQuickTransferUserData] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [weekly, balanceHistory, expense, transactions, quickTransfer, cards] = await Promise.all([
          dashboardDataService.getWeeklyActivityData(),
          dashboardDataService.getBalanceHistoryData(),
          dashboardDataService.getExpenseStatisticsData(),
          dashboardDataService.getTransactionsData(),
          dashboardDataService.getQuickTransferUsersData(),
          dashboardDataService.getCardsData(),
        ]);

        setWeeklyData(weekly);
        setBalanceHistoryData(balanceHistory);
        setExpenseData(expense);
        setTransactionsData(transactions);
        setQuickTransferUserData(quickTransfer);
        setCardsData(cards);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <Sidenav />
      <div className='ml-64 flex-1'>
        <TopBar />
        <main className='p-8'>
          <div className='flex flex-col space-y-6'>
            {/* First Row */}
            <div className='flex gap-6'>
              {/* Cards Wrapper */}
              <div className='flex flex-col basis-2/3 rounded-lg overflow-hidden'>
                <div className='p-3 flex justify-between items-center bg-inherit'>
                  <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                    My Cards
                  </h2>
                  <Link 
                    href='/pages/creditCards' 
                    className='text-[17px] font-semibold leading-[20.57px] text-[#343C6A] 
                            hover:scale-105 active:scale-100
                            hover:underline transition-all duration-200 
                            cursor-pointer text-right underline-offset-2'>
                    See All
                  </Link>
                </div>
                <div className='relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'>
                  <div className='flex gap-6 snap-x snap-mandatory pb-4'>
                    {cardsData.map((card, index) => (
                      <div key={index} className='snap-center shrink-0 first:pl-4 last:pr-4'>
                        <CreditCard
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
                    ))}
                  </div>
                </div>
              </div>
              {/* Recent Transactions */}
              <div className='flex flex-col basis-1/3 rounded-lg overflow-hidden'>
                <div className='p-3 flex justify-between items-center bg-inherit'>
                  <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                    Recent Transactions
                  </h2>
                </div>
                <RecentTransactions transactions={transactionsData} />
              </div>
            </div>
            {/* Second Row */}
            <div className='flex gap-6'>
              {/* Weekly Activity */}
              <div className='flex flex-col basis-2/3 rounded-lg overflow-hidden'>
                <div className='p-3 flex justify-between items-center bg-inherit'>
                  <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                    Weekly Activity
                  </h2>
                </div>
                <Card className='flex-1 rounded-[25px]'>
                  <CardContent className='h-[calc(100%-48px)]'>
                    <div className='pt-4'>
                      <WeeklyActivity data={weeklyData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Expense Statistics */}
              <div className='flex flex-col basis-1/3 rounded-lg overflow-hidden'>
                <div className='p-3 flex justify-between items-center bg-inherit'>
                  <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                    Expense Statistics
                  </h2>
                </div>
                <Card className='flex-1 rounded-[25px]'>
                  <CardContent className='h-[400px] flex items-center justify-center'>
                    <ExpenseStatistics data={expenseData} />
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Third Row */}
            <div className='flex gap-6'>
              {/* Quick Transfer */}
              <div className='flex flex-col basis-1/3 rounded-lg overflow-hidden'>
                <div className='p-3 flex justify-between items-center bg-inherit'>
                  <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                    Quick Transfer
                  </h2>
                </div>
                <Card className='flex-1 rounded-[25px]'>
                  <CardContent className='p-0 flex items-center justify-center h-full'>
                    <QuickTransfer 
                      users={quickTransferUserData}
                      defaultAmount='525.50'/>
                  </CardContent>
                </Card>
              </div>
              {/* Balance History */}
              <div className='flex flex-col basis-2/3 rounded-lg overflow-hidden'>
                <div className='p-3 flex justify-between items-center bg-inherit'>
                  <h2 className='text-[22px] font-semibold leading-[20.57px] text-[#343C6A]'>
                    Balance History
                  </h2>
                </div>
                <Card className='flex-1 rounded-[25px]'>
                  <CardContent className='h-[calc(100%-48px)]'>
                    <BalanceHistory data={balanceHistoryData} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}