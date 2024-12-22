// Types and Interfaces
interface BalanceHistoryItem {
  month: string;
  value: number;
}

// Extended interfaces
interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
  labelColor: string;
  valueColor: string;
  border?: {
    enabled: boolean;
    value?: string;
  };
  gradients?: {
    overall?: {
      enabled: boolean;
      value: string;
    };
    footer?: {
      enabled: boolean;
      value: string;
    };
  };
  separator?: {
    enabled: boolean;
    value?: string;
  };
}

interface Card {
  id: number;
  balance: string;
  holder: string;
  validThru: string;
  cardNumber: string;
  theme: CardTheme;
  labels?: {     // Optional labels object for customization
    balance: string;
    cardHolder: string;
    validThru: string;
  };
}

interface ExpenseStatistic {
  name: string;
  value: number;
  color: string;
}

interface QuickTransferUser {
  name: string;
  title: string;
  initial: string;
  avatarUrl?: string;
}

interface TransactionIcon {
  bg: string;
  color: string;
}

interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: string;
  type: 'credit' | 'debit';
  icon: TransactionIcon;
}

interface WeeklyActivity {
  name: string;
  deposit: number;
  withdraw: number;
}

/**
 * Retrieves balance history data
 * @returns Array of balance history items with month and value
 */
export function getBalanceHistoryData(): BalanceHistoryItem[] {
  return [
    { month: 'Jul', value: 200 },
    { month: 'Aug', value: 400 },
    { month: 'Sep', value: 600 },
    { month: 'Oct', value: 300 },
    { month: 'Nov', value: 500 },
    { month: 'Dec', value: 200 },
    { month: 'Jan', value: 400 },
  ];
}

/**
 * Retrieves credit cards data
 * @returns Array of card objects with their details and themes
 */
// Extended CardTheme interface with new properties
interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
  labelColor: string;
  valueColor: string;
  gradients?: {
    overall?: {
      enabled: boolean;
      value: string;
    };
    footer?: {
      enabled: boolean;
      value: string;
    };
  };
  separator?: {
    enabled: boolean;
    value?: string;
  };
}

// Updated cards data with new theme properties
/**
 *
 */
export function getCardsData(): Card[] {
  return [
    {
      id: 1,
      balance: '5,756',
      holder: 'Eddy Cusuma',
      validThru: '12/22',
      cardNumber: '3778 **** **** 1234',
      theme: {
        bgColor: 'bg-[#31304D]',
        textPrimaryColor: 'text-white',
        labelColor: 'text-white/70',
        valueColor: 'text-white',
        border: {
          enabled: false,
        },
        gradients: {
          overall: {
            enabled: true,
            value: 'bg-[linear-gradient(107.38deg,#5B5A6F_2.61%,#000000_101.2%)]'
          },
          footer: {
            enabled: true,
            value: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%)]'
          }
        },
        separator: {
          enabled: false
        }
      }
    },
    {
      id: 2,
      balance: '3,210',
      holder: 'John Doe',
      validThru: '11/23',
      cardNumber: '1234 **** **** 5678',
      theme: {
        bgColor: 'bg-[#FFF]',
        textPrimaryColor: 'text-[#343C6A]',
        labelColor: 'text-[#718EBF]',
        valueColor: 'text-[#343C6A]',
        border: {
          enabled: true,
          value: 'border border-[#DFEAF2]'
        },
        gradients: {
          overall: {
            enabled: false,
            value: ''
          },
          footer: {
            enabled: false,
            value: ''
          }
        },
        separator: {
          enabled: true,
          value: 'border-t border-[#DFEAF2]'
        }
      }
    },
    {
      id: 3,
      balance: '8,924',
      holder: 'Jane Smith',
      validThru: '09/24',
      cardNumber: '4321 **** **** 8765',
      theme: {
        bgColor: 'bg-[#FFFAE6]',
        textPrimaryColor: 'text-[#D97706]',
        labelColor: 'text-[#D97706]/70',
        valueColor: 'text-[#D97706]',
        border: {
          enabled: true,
          value: 'border border-[#EAB308]/20'
        },
        gradients: {
          overall: {
            enabled: false,
            value: ''
          },
          footer: {
            enabled: false,
            value: ''
          }
        },
        separator: {
          enabled: true,
          value: 'border-t border-[#EAB308]/20'
        }
      }
    },
    {
      id: 4,
      balance: '4,564',
      holder: 'Alice Brown',
      validThru: '01/25',
      cardNumber: '8765 **** **** 4321',
      theme: {
        bgColor: 'bg-[#E6FFFA]',
        textPrimaryColor: 'text-[#059669]',
        labelColor: 'text-[#059669]/70',
        valueColor: 'text-[#059669]',
        border: {
          enabled: true,
          value: 'border border-[#059669]/20'
        },
        gradients: {
          overall: {
            enabled: false,
            value: ''
          },
          footer: {
            enabled: false,
            value: ''
          }
        },
        separator: {
          enabled: true,
          value: 'border-t border-[#059669]/20'
        }
      }
    },
    {
      id: 5,
      balance: '7,832',
      holder: 'Bob Martin',
      validThru: '06/26',
      cardNumber: '5678 **** **** 9012',
      theme: {
        bgColor: 'bg-[#E0E7FF]',
        textPrimaryColor: 'text-[#4338CA]',
        labelColor: 'text-[#4338CA]/70',
        valueColor: 'text-[#4338CA]',
        border: {
          enabled: true,
          value: 'border border-[#4338CA]/20'
        },
        gradients: {
          overall: {
            enabled: false,
            value: ''
          },
          footer: {
            enabled: false,
            value: ''
          }
        },
        separator: {
          enabled: true,
          value: 'border-t border-[#4338CA]/20'
        }
      }
    }
  ];
}

/**
 * Retrieves expense statistics data
 * @returns Array of expense statistics with category name, value and color
 */
export function getExpenseStatisticsData(): ExpenseStatistic[] {
  return [
    { name: 'Entertainment', value: 30, color: '#312E81' },
    { name: 'Bill Expense', value: 15, color: '#F97316' },
    { name: 'Investment', value: 20, color: '#4F46E5' },
    { name: 'Others', value: 35, color: '#000000' }
  ];
}

/**
 * Retrieves quick transfer users data
 * @returns Array of user objects with their details
 */
export function getQuickTransferUsersData(): QuickTransferUser[] {
  return [
    { name: 'Livia Bator', title: 'CEO', initial: 'L', avatarUrl: 'https://picsum.photos/id/64/96/96' },
    { name: 'Randy Press', title: 'Director', initial: 'R' },
    { name: 'Workman', title: 'Designer', initial: 'W', avatarUrl: 'https://picsum.photos/id/64/96/96' },
    { name: 'Sarah Chen', title: 'Tech Lead', initial: 'S', avatarUrl: 'https://picsum.photos/id/65/96/96' },
    { name: 'Mike Johnson', title: 'Developer', initial: 'M', avatarUrl: 'https://picsum.photos/id/66/96/96' },
    { name: 'Diana Park', title: 'Product Manager', initial: 'D' },
    { name: 'Alex Rodriguez', title: 'UX Designer', initial: 'A', avatarUrl: 'https://picsum.photos/id/67/96/96' },
    { name: 'Emma Wilson', title: 'Marketing', initial: 'E', avatarUrl: 'https://picsum.photos/id/68/96/96' },
    { name: 'Tom Anderson', title: 'Sales Lead', initial: 'T' },
    { name: 'Nina Patel', title: 'CFO', initial: 'N', avatarUrl: 'https://picsum.photos/id/69/96/96' },
    { name: 'James Lee', title: 'CTO', initial: 'J', avatarUrl: 'https://picsum.photos/id/70/96/96' },
    { name: 'Maria Garcia', title: 'HR Manager', initial: 'M' }
  ]
}

/**
 * Retrieves transaction history data
 * @returns Array of transaction objects with their details
 */
export function getTransactionsData(): Transaction[] {
  return [
    {
      id: 1,
      title: 'Deposit from my Card',
      date: '28 January 2021',
      amount: '850',
      type: 'debit',
      icon: {
        bg: '#FFF7EA',
        color: '#FFB545'
      }
    },
    {
      id: 2,
      title: 'Deposit Paypal',
      date: '25 January 2021',
      amount: '2,500',
      type: 'credit',
      icon: {
        bg: '#EFF4FF',
        color: '#316FF6'
      }
    },
    {
      id: 3,
      title: 'Jemi Wilson',
      date: '21 January 2021',
      amount: '5,400',
      type: 'credit',
      icon: {
        bg: '#E7FFF3',
        color: '#35C28F'
      }
    },
    {
      id: 4,
      title: 'Netflix Subscription',
      date: '20 January 2021',
      amount: '14.99',
      type: 'debit',
      icon: {
        bg: '#FFE7E7',
        color: '#F23838'
      }
    },
    {
      id: 5,
      title: 'Salary Deposit',
      date: '19 January 2021',
      amount: '4,750',
      type: 'credit',
      icon: {
        bg: '#E7FFF3',
        color: '#35C28F'
      }
    },
    {
      id: 6,
      title: 'Amazon Purchase',
      date: '18 January 2021',
      amount: '239.50',
      type: 'debit',
      icon: {
        bg: '#FFF7EA',
        color: '#FFB545'
      }
    },
    {
      id: 7,
      title: 'Client Payment',
      date: '17 January 2021',
      amount: '1,200',
      type: 'credit',
      icon: {
        bg: '#EFF4FF',
        color: '#316FF6'
      }
    },
    {
      id: 8,
      title: 'Grocery Shopping',
      date: '15 January 2021',
      amount: '156.85',
      type: 'debit',
      icon: {
        bg: '#FFE7E7',
        color: '#F23838'
      }
    },
    {
      id: 9,
      title: 'Freelance Payment',
      date: '14 January 2021',
      amount: '980',
      type: 'credit',
      icon: {
        bg: '#E7FFF3',
        color: '#35C28F'
      }
    },
    {
      id: 10,
      title: 'Uber Rides',
      date: '13 January 2021',
      amount: '42.50',
      type: 'debit',
      icon: {
        bg: '#FFF7EA',
        color: '#FFB545'
      }
    },
    {
      id: 11,
      title: 'Investment Return',
      date: '12 January 2021',
      amount: '3,200',
      type: 'credit',
      icon: {
        bg: '#EFF4FF',
        color: '#316FF6'
      }
    },
    {
      id: 12,
      title: 'Phone Bill',
      date: '10 January 2021',
      amount: '89.99',
      type: 'debit',
      icon: {
        bg: '#FFE7E7',
        color: '#F23838'
      }
    },
    {
      id: 13,
      title: 'Consulting Fee',
      date: '08 January 2021',
      amount: '2,800',
      type: 'credit',
      icon: {
        bg: '#E7FFF3',
        color: '#35C28F'
      }
    },
    {
      id: 14,
      title: 'Gym Membership',
      date: '05 January 2021',
      amount: '75',
      type: 'debit',
      icon: {
        bg: '#FFE7E7',
        color: '#F23838'
      }
    },
    {
      id: 15,
      title: 'Bonus Payment',
      date: '03 January 2021',
      amount: '1,500',
      type: 'credit',
      icon: {
        bg: '#E7FFF3',
        color: '#35C28F'
      }
    }
  ];
}

/**
 * Retrieves weekly activity data
 * @returns Array of weekly activity items with deposits and withdrawals
 */
export function getWeeklyActivityData(): WeeklyActivity[] {
  return [
    { name: 'Sat', deposit: 200, withdraw: 400 },
    { name: 'Sun', deposit: 100, withdraw: 300 },
    { name: 'Mon', deposit: 250, withdraw: 300 },
    { name: 'Tue', deposit: 350, withdraw: 450 },
    { name: 'Wed', deposit: 250, withdraw: 150 },
    { name: 'Thu', deposit: 230, withdraw: 400 },
    { name: 'Fri', deposit: 320, withdraw: 400 },
  ];
}