import React, { useMemo } from 'react';

import { Card, CardContent } from '@/app/components/shared/common/card';

interface TransactionIcon {
  bg: string;
  color: string;
  svg: React.ReactNode;
}

interface Transaction {
  id: string | number;
  icon: TransactionIcon;
  title: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number | string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getIconStyles = useMemo(() => {
    return transactions.reduce((styles, transaction) => ({
      ...styles,
      [transaction.id]: {
        container: { backgroundColor: transaction.icon.bg },
        icon: { color: transaction.icon.color }
      }
    }), {});
  }, [transactions]);

  return (
    <Card className='flex-1 rounded-[25px] bg-white'>
      <CardContent className='h-[235px] relative'>
        {/* Add a wrapper div with padding that doesn't scroll */}
        <div className='absolute inset-0 p-6'>
          {/* Make the scrollable area respect the padding bounds */}
          <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'>
            <div className='flex flex-col gap-4'>
              {transactions.map((transaction) => (
                <div key={transaction.id} className='flex items-center'>
                  {/* Icon Container */}
                  <div className='flex-none w-12 h-12'>
                    <div 
                      className='w-full h-full rounded-full flex items-center justify-center'
                      style={getIconStyles[transaction.id].container}>
                      <div style={getIconStyles[transaction.id].icon}>
                        {transaction.icon.svg}
                      </div>
                    </div>
                  </div>

                  {/* Title and Date Container */}
                  <div className='flex-1 ml-3'>
                    <p className='font-medium text-[#1A1F36]'>{transaction.title}</p>
                    <p className='text-sm text-[#718EBF]'>{transaction.date}</p>
                  </div>

                  {/* Amount Container */}
                  <div className='flex-none'>
                    <span 
                      className={`font-medium ${
                        transaction.type === 'credit' ? 'text-[#35C28F]' : 'text-[#F23838]'
                      }`}>
                      {transaction.type === 'credit' ? '+ ' : '- '}${transaction.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;