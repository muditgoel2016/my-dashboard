import React from 'react';
import Sidenav from '@/components/layout/side-nav';
import TopBar from '@/components/layout/top-bar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Area } from 'recharts';

const EMVChip = ({ className = "" }) => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
  <rect width="34.7713" height="34.7713" fill="url(#pattern0_14_1323)" />
  <defs>
  <pattern id="pattern0_14_1323" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlinkHref="#image0_14_1323" transform="scale(0.01)"/>
  </pattern>
  <image id="image0_14_1323" width="100" height="100" xlinkHref="data:image/png;base64,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"/>
  </defs>
  </svg>
  );
  
  const EMVChipBlack = ({ className = "" }) => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
  <rect width="34.7713" height="34.7713" fill="url(#pattern0_14_1343)"/>
  <defs>
  <pattern id="pattern0_14_1343" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlinkHref="#image0_14_1343" transform="scale(0.01)"/>
  </pattern>
  <image id="image0_14_1343" width="100" height="100" xlinkHref="data:image/png;base64,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"/>
  </defs>
  </svg>
  );

  const MasterCardLogo = ({ className = "" }) => (
    <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill="white" fillOpacity="0.5"/>
      <circle cx="29" cy="15" r="15" fill="white" fillOpacity="0.5"/>
    </svg>
  );
  
  // And for the dark version
  const MasterCardLogoDark = ({ className = "" }) => (
    <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill="#1a1f36" fillOpacity="0.5"/>
      <circle cx="29" cy="15" r="15" fill="#1a1f36" fillOpacity="0.5"/>
    </svg>
  );

  export default function DesktopDashboard() {
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
               {/* Dark Card */}
              <Card className="bg-[#31304D] text-white flex-1 rounded-2xl">
                <CardContent className="p-6 h-[235px] flex flex-col">
                  {/* Top Row - Balance and Chip */}
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="text-sm text-white">Balance</p>
                      <h2 className="text-2xl font-bold">$5,756</h2>
                    </div>
                    <div className="w-12 h-12">
                      <EMVChip className="w-full h-full" />
                    </div>
                  </div>

                  {/* Middle Row - Card Holder and Valid Info */}
                  <div className="flex-[2] flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white">CARD HOLDER</p>
                      <p className="font-medium">Eddy Cusuma</p>
                    </div>
                    <div>
                      <p className="text-xs text-white">VALID THRU</p>
                      <p className="font-medium">12/22</p>
                    </div>
                  </div>

                  {/* Bottom Row - Card Number and Logo */}
                  <div className="flex-1 flex justify-between items-center">
                    <p className="text-xl tracking-wider mb-4">3778 **** **** 1234</p>
                    <MasterCardLogo />
                  </div>
                </CardContent>
              </Card>

              {/* Light Card */}
              <Card className="flex-1 rounded-2xl bg-[#f8faff] border-[#e6efff]">
                <CardContent className="p-6 h-[235px] flex flex-col">
                  {/* Top Row - Balance and Chip */}
                  <div className="flex-1 flex justify-between">
                    <div>
                      <p className="text-sm text-[#1a1f36]">Balance</p>
                      <h2 className="text-2xl font-bold text-[#1a1f36]">$5,756</h2>
                    </div>
                    <div className="w-12 h-12">
                      <EMVChipBlack className="w-full h-full" />
                    </div>
                  </div>

                  {/* Middle Row - Card Holder and Valid Info */}
                  <div className="flex-[2] flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#1a1f36]">CARD HOLDER</p>
                      <p className="font-medium text-[#1a1f36]">Eddy Cusuma</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#1a1f36]">VALID THRU</p>
                      <p className="font-medium text-[#1a1f36]">12/22</p>
                    </div>
                  </div>

                  {/* Bottom Row - Card Number and Logo */}
                  <div className="flex-1 flex justify-between items-center">
                    <p className="text-xl tracking-wider mb-4">3778 **** **** 1234</p>
                    <MasterCardLogoDark />
                  </div>
                </CardContent>
              </Card>
                  </div>
                </div>
            {/* Recent Transactions */}
            <div className="flex flex-col basis-1/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>
                </div>
                <Card className="flex-1 rounded-2xl bg-white">
                  <CardContent className="p-6 h-[calc(100%-48px)] overflow-auto">
                    <div className="flex flex-col gap-4">
                      {transactionsData.map((transaction) => (
                        <div key={transaction.id} className="flex items-center">
                          {/* Icon Container */}
                          <div className="flex-none w-12 h-12">
                            <div 
                              className="w-full h-full rounded-full flex items-center justify-center"
                              style={{ backgroundColor: transaction.icon.bg }}
                            >
                              <div style={{ color: transaction.icon.color }}>
                                {transaction.icon.svg}
                              </div>
                            </div>
                          </div>

                          {/* Title and Date Container */}
                          <div className="flex-1 ml-3">
                            <p className="font-medium text-[#1A1F36]">{transaction.title}</p>
                            <p className="text-sm text-[#718EBF]">{transaction.date}</p>
                          </div>

                          {/* Amount Container */}
                          <div className="flex-none">
                            <span 
                              className={`font-medium ${
                                transaction.type === 'credit' ? 'text-[#35C28F]' : 'text-[#F23838]'
                              }`}
                            >
                              {transaction.type === 'credit' ? '+ ' : '- '}${transaction.amount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              </div>
              {/* Second Row */}
              <div className="flex gap-6">
                {/* Weekly Activity */}
                <div className="flex flex-col basis-2/3 rounded-lg overflow-hidden">
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-lg font-semibold">Weekly Activity</h2>
                  </div>
                  <Card className="flex-1 rounded-none">
                    <CardContent className="h-[calc(100%-48px)]">
                      <div className="pt-4">
                        <div className="flex gap-6 mb-4 justify-end">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#396AFF' }}></div>
                        <span className="text-sm">Deposit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#232323' }}></div>
                          <span className="text-sm">Withdraw</span>
                        </div>
                      </div>
                      <BarChart
                        width={600} // Adjust width as needed
                        height={300} // Adjust height as needed
                        data={weeklyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }} // Add spacing around the chart
                        barCategoryGap="50%" // Increase spacing between groups (days)
                      >
                        {/* Add horizontal grid lines */}
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 14, fill: '#6B7280' }} // Match font and color
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          ticks={[0, 100, 200, 300, 400, 500, 600]} // Set specific tick values
                          domain={[0, 600]} // Explicitly set the range
                          tick={{ fontSize: 14, fill: '#6B7280' }} // Match font and color
                        />
                        <Bar
                          dataKey="withdraw"
                          fill="#232323" // Black color for Withdraw bars
                          barSize={15} // Set bar thickness to 15px
                          radius={[10, 10, 10, 10]} // Rounded top and bottom corners
                        />
                        <Bar
                          dataKey="deposit"
                          fill="#396AFF" // Blue color for Deposit bars
                          barSize={15} // Set bar thickness to 15px
                          radius={[10, 10, 10, 10]} // Rounded top and bottom corners
                        />
                      </BarChart>
                      </div>
                    </CardContent>
                  </Card>
                </div>
  
                {/* Expense Statistics */}
                <div className="flex flex-col basis-1/3 rounded-lg overflow-hidden">
                  <div className="p-3 flex justify-between items-center bg-inherit">
                    <h2 className="text-lg font-semibold">Expense Statistics</h2>
                  </div>
                  <Card className="flex-1 rounded-none">
                    <CardContent className="h-[calc(100%-48px)]">
                    <PieChart width={300} height={300}>
                    <Pie
                      data={expenseData}
                      cx={150}
                      cy={150}
                      outerRadius={120}
                      dataKey="value"
                      labelLine={false} // Hide the label lines
                      paddingAngle={2} // Add gap between slices
                      label={({cx, cy, midAngle, innerRadius, outerRadius, percent, name}) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                        
                        return (
                          <text 
                            x={x} 
                            y={y} 
                            fill="white" 
                            textAnchor="middle" 
                            dominantBaseline="middle"
                          >
                            <tspan x={x} y={y-10}>{`${(percent * 100).toFixed(0)}%`}</tspan>
                            <tspan x={x} y={y+10}>{name}</tspan>
                          </text>
                        );
                      }}
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
                <Card className="flex-1 rounded-none">
                  <CardContent className="p-6 flex flex-col h-[calc(100%-48px)]">
                    {/* First Row - 2/3 of total height */}
                    <div className="flex gap-4 h-2/3 mb-4">
                      {/* Profile Section - 3/4 width */}
                      <div className="flex-[3] m-auto overflow-hidden">
                        <div className="flex gap-4 justify-around overflow-x-hidden">
                          {[
                            { name: 'Livia Bator', title: 'CEO', initial: 'L' },
                            { name: 'Randy Press', title: 'Director', initial: 'R' },
                            { name: 'Workman', title: 'Designer', initial: 'W' }
                          ].map((person, i) => (
                            <div key={i} className="flex flex-col items-center flex-shrink-0">
                              <Avatar className="w-12 h-12 mb-2">
                                <AvatarImage src={`/api/placeholder/48/48`} />
                                <AvatarFallback>{person.initial}</AvatarFallback>
                              </Avatar>
                              <p className="text-sm font-medium">{person.name}</p>
                              <p className="text-sm text-gray-500">{person.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scroll Arrow Section - 1/4 width */}
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M9 18l6-6-6-6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Second Row - 1/3 of total height */}
                    <div className="h-1/3">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 whitespace-nowrap">Write Amount</span>
                        <div className="flex flex-1 overflow-hidden rounded-full bg-gray-100">
                          <Input 
                            defaultValue="$525.50"
                            className="flex-1 h-12 text-lg border-none bg-transparent focus:ring-0" 
                          />
                          <Button className="h-12 px-8 rounded-full">
                            Send
                            <svg 
                              className="ml-2 w-4 h-4" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Balance History */}
              <div className="flex flex-col basis-2/3 rounded-lg overflow-hidden">
                <div className="p-3 flex justify-between items-center bg-inherit">
                  <h2 className="text-lg font-semibold">Balance History</h2>
                </div>
                <Card className="flex-1 rounded-none">
                  <CardContent className="h-[calc(100%-48px)]">
                    <LineChart 
                      width={800} 
                      height={300} 
                      data={balanceHistoryData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01}/>
                        </linearGradient>
                      </defs>
                      
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        horizontal={true} 
                        vertical={true}
                        stroke="#E5E7EB"
                      />

                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={true}
                        tickSize={8}
                        tick={{ fill: '#718EBF', fontSize: 14 }}
                        dy={10}
                        stroke="#718EBF"
                      />

                      <YAxis 
                        axisLine={false} 
                        tickLine={true}
                        tickSize={8}
                        tick={{ fill: '#718EBF', fontSize: 14 }}
                        tickCount={5}
                        domain={[0, 800]}
                        dx={-10}
                        stroke="#718EBF"
                      />

                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4F46E5"
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={false}
                      />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="false"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </LineChart>
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