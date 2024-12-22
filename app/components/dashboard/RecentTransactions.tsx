import { CreditCard, RussianRuble, Coins } from 'lucide-react';
import React, { useMemo } from 'react';

import { Card, CardContent } from '@/app/components/shared/common/card';

interface TransactionIcon {
  bg: string;
  color: string;
}

interface Transaction {
  id: string | number;
  title: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number | string;
  depositMode: 'card' | 'paypal' | 'cash';
  icon: TransactionIcon;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getTransactionIcon = (depositMode: Transaction['depositMode']) => {
    switch (depositMode) {
      case 'card':
        return CreditCard;
      case 'paypal':
        return RussianRuble;
      case 'cash':
        return Coins;
      default:
        return Coins;
    }
  };

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
    <Card 
      className='flex-1 rounded-[25px] bg-white'
      role='region' 
      aria-label='Recent transactions'>
      <CardContent className='h-[235px] relative'>
        <div className='absolute inset-0 p-6'>
          <h2 className='sr-only'>Recent Transactions List</h2>
          <div 
            className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400'
            role='list'
            aria-label='Transactions'>
            <div className='flex flex-col gap-4'>
              {transactions.map((transaction) => {
                const IconComponent = getTransactionIcon(transaction.depositMode);
                const isCredit = transaction.type === 'credit';
                const amountLabel = `${isCredit ? 'Credit' : 'Debit'} of $${transaction.amount}`;
                
                return (
                  <div 
                    key={transaction.id} 
                    className='flex items-center'
                    role='listitem'
                    aria-label={`Transaction: ${transaction.title}`}>
                    {/* Icon Container */}
                    <div className='flex-none w-12 h-12'>
                      <div 
                        className='w-full h-full rounded-full flex items-center justify-center'
                        style={getIconStyles[transaction.id].container}
                        aria-hidden='true'>
                        <IconComponent 
                          className='w-6 h-6'
                          style={getIconStyles[transaction.id].icon}
                          aria-label={`${transaction.depositMode} transaction`}/>
                      </div>
                    </div>

                    {/* Title and Date Container */}
                    <div className='flex-1 ml-3'>
                      <p 
                        className='font-medium text-[#1A1F36]'
                        aria-label='Transaction title'>
                        {transaction.title}
                      </p>
                      <p 
                        className='text-sm text-[#718EBF]'
                        aria-label='Transaction date'>
                        {transaction.date}
                      </p>
                    </div>

                    {/* Amount Container */}
                    <div className='flex-none'>
                      <span 
                        className={`font-medium ${
                          isCredit ? 'text-[#35C28F]' : 'text-[#F23838]'
                        }`}
                        aria-label={amountLabel}>
                        {isCredit ? '+ ' : '- '}${transaction.amount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;