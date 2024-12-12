import React from 'react';
import Sidenav from '@/components/layout/desktop/nav';
import TopBar from '@/components/layout/desktop/top-bar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BalanceHistory from '@/components/dashboard/BalanceHistory';
import ExpenseStatistics from '@/components/dashboard/ExpenseStatistics';
import WeeklyActivity from '@/components/dashboard/WeeklyActivity';
import QuickTransfer from "@/components/dashboard/QuickTransfer";
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import CreditCard from '@/components/dashboard/CreditCard';
import MasterCardLogo from '@/components/dashboard/MasterCardLogo';
import EMVChip from '@/components/dashboard/EMVChip';
import EMVChipBlack from '@/components/dashboard/EMVChipBlack';

  export default function Dashboard() {
    const weeklyData = [
      { name: 'Sat', deposit: 200, withdraw: 400 },
      { name: 'Sun', deposit: 100, withdraw: 300 },
      { name: 'Mon', deposit: 250, withdraw: 300 },
      { name: 'Tue', deposit: 350, withdraw: 450 },
      { name: 'Wed', deposit: 250, withdraw: 150 },
      { name: 'Thu', deposit: 230, withdraw: 400 },
      { name: 'Fri', deposit: 320, withdraw: 400 },
    ];
  
    const balanceHistoryData = [
      { month: 'Jul', value: 200 },
      { month: 'Aug', value: 400 },
      { month: 'Sep', value: 600 },
      { month: 'Oct', value: 300 },
      { month: 'Nov', value: 500 },
      { month: 'Dec', value: 200 },
      { month: 'Jan', value: 400 },
    ];
  
    const expenseData = [
      { name: 'Entertainment', value: 30, color: '#312E81' },
      { name: 'Bill Expense', value: 15, color: '#F97316' },
      { name: 'Investment', value: 20, color: '#4F46E5' },
      { name: 'Others', value: 35, color: '#000000' }
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
          svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 10h20"/>
            </svg>
          )
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
          svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 6.5C20.5 7.5 19.1 11.1 18.4 13C17.7 14.9 16 16 14.1 16H12.5L11.4 22.7C11.3 23 11.1 23.2 10.8 23.2H7.5C7.2 23.2 7 22.9 7.1 22.6L8.2 16H5.9C5.6 16 5.4 15.7 5.5 15.4L8.5 1.8C8.6 1.5 8.8 1.3 9.1 1.3H15.5C18.4 1.3 20.5 3.6 20.5 6.5Z"/>
            </svg>
          )
        }
      },
      {
        id: 3,
        title: "Jemi Wilson",
        date: "21 January 2021",
        amount: "5,400",
        type: "credit",
        icon: {
          bg: "#E7FFF3",
          color: "#35C28F",
          svg: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v12m-6-6h12"/>
            </svg>
          )
        }
      }
    ];

    const quickTransferUserData = [
      { name: 'Livia Bator', title: 'CEO', initial: 'L', avatarUrl: 'https://picsum.photos/id/64/96/96' },
      { name: 'Randy Press', title: 'Director', initial: 'R' }, // Will use default avatar
      { name: 'Workman', title: 'Designer', initial: 'W', avatarUrl: 'https://picsum.photos/id/64/96/96' }
    ];

    const cardsData = [
      {
        balance: "5,756",
        holder: "Eddy Cusuma",
        validThru: "12/22",
        cardNumber: "3778 **** **** 1234",
        ChipImage: EMVChip,
        theme: {
          bgColor: "bg-[#31304D]",
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
                    ChipImage={card.ChipImage}
                    theme={card.theme}
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
                  <CardContent className="p-0 flex items-center justify-center h-full"> {/* Added flex centering */}
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