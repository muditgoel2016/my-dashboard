import React, { useState, useEffect } from 'react';
import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { Card, CardContent } from "@/app/components/shared/common/card";
import BalanceHistory from '@/app/components/dashboard/BalanceHistory';
import ExpenseStatistics from '@/app/components/dashboard/ExpenseStatistics';
import WeeklyActivity from '@/app/components/dashboard/WeeklyActivity';
import QuickTransfer from "@/app/components/dashboard/QuickTransfer";
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import CreditCard from '@/app/components/dashboard/CreditCard';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import EMVChip from '@/app/components/dashboard/EMVChip';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import { dashboardEndpointService } from '@/services/endpointServices/dashboard/dashboardEndpointService';

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
          dashboardEndpointService.getWeeklyActivityData(),
          dashboardEndpointService.getBalanceHistoryData(),
          dashboardEndpointService.getExpenseStatisticsData(),
          dashboardEndpointService.getTransactionsData(),
          dashboardEndpointService.getQuickTransferUsersData(),
          dashboardEndpointService.getCardsData(),
        ]);

        setWeeklyData(weekly);
        setBalanceHistoryData(balanceHistory);
        setExpenseData(expense);
        setTransactionsData(transactions);
        setQuickTransferUserData(quickTransfer);
        setCardsData(cards);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar />
        <main className="p-8">
          <div className="flex flex-col space-y-6">
            {/* First Row */}
            <div className="flex gap-6">
              {/* Cards Wrapper */}
              <div className="flex flex-col basis-2/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">My Cards</h2>
                  <span className="text-lg font-semibold hover:underline cursor-pointer">See All</span>
                </div>
                <div className="flex gap-6 h-[calc(100%-48px)]">
                  {cardsData.map((card, index) => (
                    <CreditCard
                      key={index}
                      balance={card.balance}
                      holder={card.holder}
                      validThru={card.validThru}
                      cardNumber={card.cardNumber}
                      ChipImage={card.theme.bgColor === "bg-[#31304D]" ? EMVChip : EMVChipBlack}
                      theme={{
                        ...card.theme,
                        creditProviderLogo: <MasterCardLogo fillColor={card.theme.bgColor === "bg-[#31304D]" ? "white" : "#1a1f36"} />
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Recent Transactions */}
              <div className="flex flex-col basis-1/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>
                </div>
                <RecentTransactions transactions={transactionsData} />
              </div>
            </div>
            {/* Second Row */}
            <div className="flex gap-6">
              {/* Weekly Activity */}
              <div className="flex flex-col basis-2/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Weekly Activity</h2>
                </div>
                <Card className="flex-1 rounded-[25px]">
                  <CardContent className="h-[calc(100%-48px)]">
                    <div className="pt-4">
                      <WeeklyActivity data={weeklyData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Expense Statistics */}
              <div className="flex flex-col basis-1/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Expense Statistics</h2>
                </div>
                <Card className="flex-1 rounded-[25px]">
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <ExpenseStatistics data={expenseData} />
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Third Row */}
            <div className="flex gap-6">
              {/* Quick Transfer */}
              <div className="flex flex-col basis-1/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Quick Transfer</h2>
                </div>
                <Card className="flex-1 rounded-[25px]">
                  <CardContent className="p-0 flex items-center justify-center h-full">
                    <QuickTransfer 
                      users={quickTransferUserData}
                      defaultAmount="$525.50"
                    />
                  </CardContent>
                </Card>
              </div>
              {/* Balance History */}
              <div className="flex flex-col basis-2/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Balance History</h2>
                </div>
                <Card className="flex-1 rounded-[25px]">
                  <CardContent className="h-[calc(100%-48px)]">
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