import { useState } from 'react';
import TopBar from '@/components/layout/mobile/top-bar';
import MobileNav from '@/components/layout/mobile/nav';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const EMVChip = ({ className = "" }) => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={className}>
    <rect width="34.7713" height="34.7713" fill="url(#pattern0_14_1323)" />
    <defs>
      <pattern id="pattern0_14_1323" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_14_1323" transform="scale(0.01)"/>
      </pattern>
      <image id="image0_14_1323" width="100" height="100" xlinkHref="data:image/png;base64,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"/>
    </defs>
  </svg>
);

export default function MobileDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <div className="snap-center shrink-0 first:pl-4 last:pr-4">
                <Card className="w-72 bg-gray-800 text-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-sm opacity-80">Balance</p>
                        <h2 className="text-2xl font-bold">$5,756</h2>
                      </div>
                      <div className="w-10 h-10">
                        <EMVChip className="w-full h-full" />
                      </div>
                    </div>
                    <p className="text-lg tracking-wider mb-4">3778 **** **** 1234</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-80">CARD HOLDER</p>
                        <p>Eddy Cusuma</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-80">VALID THRU</p>
                        <p>12/22</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Additional cards would go here */}
            </div>
          </div>
        </div>

        {/* Recent Transaction */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Transaction</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                  📄
                </div>
                <div>
                  <p className="font-medium">Deposit from my Card</p>
                  <p className="text-sm text-gray-500">28 January 2021</p>
                </div>
              </div>
              <span className="text-red-500 font-medium">-$850</span>
            </div>
            <div className="bg-white p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  🅿️
                </div>
                <div>
                  <p className="font-medium">Deposit Paypal</p>
                  <p className="text-sm text-gray-500">25 January 2021</p>
                </div>
              </div>
              <span className="text-green-500 font-medium">+$2,500</span>
            </div>
          </div>
        </div>

{/* Weekly Activity */}
<div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <div>
            <div className="flex gap-6 mb-4 justify-end">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4F46E5]"></div>
                <span className="text-sm">Deposit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-black"></div>
                <span className="text-sm">Withdraw</span>
              </div>
            </div>
            <BarChart width={340} height={200} data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="withdraw" fill="#000000" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deposit" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </div>
        </div>

        {/* Expense Statistics */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Expense Statistics</h2>
          <div className="flex flex-col items-center">
            <PieChart width={250} height={250}>
              <Pie
                data={expenseData}
                cx={125}
                cy={125}
                outerRadius={100}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {expenseData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Transfer */}
        <div className="bg-white p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Quick Transfer</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              {quickTransferData.map((person, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Avatar className="w-12 h-12 mb-2">
                    <AvatarImage src={`/api/placeholder/48/48`} />
                    <AvatarFallback>{person.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                </div>
              ))}
              <button className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Write amount" 
                className="bg-gray-50"
                defaultValue="$25.50"
              />
              <Button className="bg-gray-900 text-white px-6">
                Send
                <svg className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}