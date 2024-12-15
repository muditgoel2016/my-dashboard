import { useState } from 'react';
import TopBar from '@/app/components/shared/mobile/top-bar';
import MobileNav from '@/app/components/shared/mobile/nav';
import { Button } from "@/app/components/shared/common/button";
import CreditCard from '@/app/components/dashboard/CreditCard';
import RecentTransactions from '@/app/components/dashboard/RecentTransactions';
import WeeklyActivity from '@/app/components/dashboard/WeeklyActivity';
import ExpenseStatistics from '@/app/components/dashboard/ExpenseStatistics';
import QuickTransfer from '@/app/components/dashboard/QuickTransfer';
import EMVChip from '@/app/components/dashboard/EMVChip';
import MasterCardLogo from '@/app/components/dashboard/MasterCardLogo';
import EMVChipBlack from '@/app/components/dashboard/EMVChipBlack';
import BalanceHistory from '@/app/components/dashboard/BalanceHistory';

export default function MobileDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cardsData = [
    {
      balance: "5,756",
      holder: "Eddy Cusuma",
      validThru: "12/22",
      cardNumber: "3778 **** **** 1234",
      ChipImage: EMVChip,
      theme: {
        bgColor: "bg-gray-800",
        textPrimaryColor: "text-white",
        textSecondaryColor: "text-white",
        creditProviderLogo: <MasterCardLogo fillColor="white" />
      }
    },
    {
      balance: "5,756",
      holder: "Eddy Cusuma",
      validThru: "12/22",
      cardNumber: "3778 **** **** 1234",
      ChipImage: EMVChipBlack,
      theme: {
        bgColor: "bg-[#f8faff]",
        textPrimaryColor: "text-[#1a1f36]",
        textSecondaryColor: "text-[#1a1f36]",
        creditProviderLogo: <MasterCardLogo fillColor="#1a1f36" />
      }
    }
  ];

  const transactionsData = [
    {
      id: 1,
      title: "Deposit from my Card",
      date: "28 January 2021",
      amount: "850",
      type: "debit",
      icon: {
        bg: "#FFF7EA",
        color: "#FFB545",
        svg: "📄"
      }
    },
    {
      id: 2,
      title: "Deposit Paypal",
      date: "25 January 2021",
      amount: "2,500",
      type: "credit",
      icon: {
        bg: "#EFF4FF",
        color: "#316FF6",
        svg: "🅿️"
      }
    }
  ];

  const weeklyData = [
    { name: 'Sat', deposit: 200, withdraw: 400 },
    { name: 'Sun', deposit: 100, withdraw: 300 },
    { name: 'Mon', deposit: 250, withdraw: 300 },
    { name: 'Tue', deposit: 350, withdraw: 450 },
    { name: 'Wed', deposit: 250, withdraw: 150 },
    { name: 'Thu', deposit: 230, withdraw: 400 },
    { name: 'Fri', deposit: 320, withdraw: 400 },
  ];

  const expenseData = [
    { name: 'Entertainment', value: 30, color: '#312E81' },
    { name: 'Bill Expense', value: 15, color: '#F97316' },
    { name: 'Investment', value: 20, color: '#4F46E5' },
    { name: 'Others', value: 35, color: '#000000' }
  ];

  const quickTransferData = [
    { name: 'Livia Bator', role: 'CEO' },
    { name: 'Randy Press', role: 'Director' },
    { name: 'Workman', role: 'Designer' }
  ];

  const balanceHistoryData = [
    { month: 'Jul', value: 200 },
    { month: 'Aug', value: 400 },
    { month: 'Sep', value: 600 },
    { month: 'Oct', value: 300 },
    { month: 'Nov', value: 500 },
    { month: 'Dec', value: 200 },
    { month: 'Jan', value: 400 }
  ];

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
                    <CreditCard {...card} />
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
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <WeeklyActivity data={weeklyData} />
        </div>

        {/* Expense Statistics */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Expense Statistics</h2>
          <div className="flex flex-col items-center">
            <ExpenseStatistics data={expenseData} />
          </div>
        </div>

        {/* Quick Transfer */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Quick Transfer</h2>
          <QuickTransfer
            users={quickTransferData.map(person => ({
              name: person.name,
              title: person.role,
              initial: person.name[0],
              avatarUrl: `/api/placeholder/48/48`
            }))}
            defaultAmount="$25.50"
          />
        </div>

        {/* Balance History */}
{/* Balance History */}
<div className="bg-white p-4 rounded-xl">
  <h2 className="text-lg font-semibold mb-4">Balance History</h2>
  <div className="overflow-x-auto">
    <div className="min-w-[340px]">
      <BalanceHistory data={balanceHistoryData} />
    </div>
  </div>
</div>
      </main>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}