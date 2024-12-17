import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  CircleDollarSign,
  Users,
  LineChart,
  CreditCard,
  PiggyBank,
  Wrench,
  Award,
  Settings,
  CheckSquare
} from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Nav: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>('/pages/dashboard');

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    const path = window.location.pathname;
    setActivePath(path);
  }, []);

  const menuItems: MenuItem[] = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/pages/dashboard' },
    { icon: <CircleDollarSign size={20} />, label: 'Transactions', href: '/pages/transactions' },
    { icon: <Users size={20} />, label: 'Accounts', href: '/pages/accounts' },
    { icon: <LineChart size={20} />, label: 'Investments', href: '/pages/investments' },
    { icon: <CreditCard size={20} />, label: 'Credit Cards', href: '/pages/creditCards' },
    { icon: <PiggyBank size={20} />, label: 'Loans', href: '/pages/loans' },
    { icon: <Wrench size={20} />, label: 'Services', href: '/pages/services' },
    { icon: <Award size={20} />, label: 'My Privileges', href: '/pages/privileges' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/pages/settings' }
  ];

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-gray-900">Soar Task</span>
      </div>

      <nav className="px-3 py-2">
        {menuItems.map((item) => {
          const isActive = mounted && activePath === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors mb-1 relative
                ${isActive 
                  ? 'text-gray-900 font-medium hover:bg-gray-50' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              onClick={() => setActivePath(item.href)}
            >
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-1 bg-gray-900 rounded-r" />
              )}
              <span className={isActive ? 'text-gray-900' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;