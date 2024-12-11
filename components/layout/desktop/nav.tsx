import React from 'react';
import {
  Home,
  Users,
  Settings,
  CircleDollarSign,
} from 'lucide-react';

const Nav: React.FC = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <CircleDollarSign size={20} />, label: 'Transactions', href: '/transactions' },
    { icon: <Users size={20} />, label: 'Accounts', href: '/accounts' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0 px-3 py-6">
      <div className="flex items-center gap-2 px-4 mb-8">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <span className="text-white font-bold">S</span>
        </div>
        <span className="text-xl font-semibold">Soar Task</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
