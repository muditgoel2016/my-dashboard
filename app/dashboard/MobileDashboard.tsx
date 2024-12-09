// app/dashboard/MobileDashboard.tsx
'use client'
import { useState } from 'react'
import TopBar from '@/components/layout/mobile/top-bar'
import MobileNav from '@/components/layout/mobile/nav'

export default function MobileDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
      <main className="px-4 py-6 pb-24"> {/* Added pb-24 for bottom nav spacing */}
        {/* Credit Card Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">My Cards</h2>
            <div className="bg-gray-800 text-white rounded-xl p-4">
              <div className="flex justify-between mb-4">
                <p className="text-sm opacity-80">Balance</p>
                <div className="w-12 h-8">
                  <img src="/api/placeholder/32/32" alt="chip" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-4">$5,756</p>
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
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    📄
                  </div>
                  <div>
                    <p className="font-medium">Deposit from my Card</p>
                    <p className="text-sm text-gray-500">28 January 2021</p>
                  </div>
                </div>
                <span className="text-red-500">-$850</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    🅿️
                  </div>
                  <div>
                    <p className="font-medium">Deposit Paypal</p>
                    <p className="text-sm text-gray-500">25 January 2021</p>
                  </div>
                </div>
                <span className="text-green-500">+$2,500</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  )
}