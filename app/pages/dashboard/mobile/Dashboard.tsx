import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '@/app/components/shared/mobile/top-bar';
import MobileNav from '@/app/components/shared/mobile/nav';
import { Button } from "@/app/components/shared/common/button";
import CreditCard from '@/app/components/dashboard/CreditCard';
import EMVChip from '@/app/components/dashboard/EMVChip';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import QuickTransfer from "@/app/components/dashboard/QuickTransfer";
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';

import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService';

// Dynamic imports with SSR disabled
const WeeklyActivity = dynamic(() => import('@/app/components/dashboard/WeeklyActivity'), { ssr: false });
const ExpenseStatistics = dynamic(() => import('@/app/components/dashboard/ExpenseStatistics'), { ssr: false });
const BalanceHistory = dynamic(() => import('@/app/components/dashboard/BalanceHistory'), { ssr: false });

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
    <div className="min-h-screen bg-gray-50">
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className="px-4 py-6 pb-24 space-y-6">
        {/* My Cards Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Cards</h2>
            <Button variant="link" className="text-indigo-600">See All</Button>
          </div>
          <div className="relative overflow-x-auto pb-4">
            <div className="flex gap-4 snap-x snap-mandatory">
              {cardsData.map((card, index) => (
                <div key={index} className="snap-center shrink-0 first:pl-4 last:pr-4">
                  <div className="w-72">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transaction */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Transaction</h2>
          <RecentTransactions transactions={transactionsData} />
        </div>

        {/* Weekly Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <div className="bg-white p-4 rounded-xl">
            <WeeklyActivity data={weeklyData} />
          </div>
        </div>

        {/* Expense Statistics */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Expense Statistics</h2>
          <div className="bg-white p-4 rounded-xl">
            <div className="flex flex-col items-center">
              <ExpenseStatistics data={expenseData} />
            </div>
          </div>
        </div>

        {/* Quick Transfer */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Transfer</h2>
          <div className="bg-white p-4 rounded-xl">
            <QuickTransfer
              users={quickTransferData}
              defaultAmount="$25.50"
            />
          </div>
        </div>

        {/* Balance History */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Balance History</h2>
          <div className="bg-white p-4 rounded-xl">
            <div className="overflow-x-auto">
              <div className="min-w-[340px]">
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