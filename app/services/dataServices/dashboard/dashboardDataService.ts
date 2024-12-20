// Import types from your handler service
interface BalanceHistoryItem {
  month: string;
  value: number;
}

interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
}

interface Card {
  id: number;
  balance: string;
  holder: string;
  validThru: string;
  cardNumber: string;
  theme: CardTheme;
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

interface Transaction {
  id: number;
  title: string;
  date: string;
  amount: string;
  type: 'credit' | 'debit';
  icon: {
    bg: string;
    color: string;
  };
}

interface WeeklyActivity {
  name: string;
  deposit: number;
  withdraw: number;
}

// Custom error class for API errors
class DashboardAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'DashboardAPIError';
  }
}

/**
 * Fetches data from the dashboard API
 * @param serverSideCall - Whether the call is made from server side
 * @param endpoint - API endpoint to fetch from
 * @returns Promise with the typed response data
 * @throws DashboardAPIError if the request fails
 */
async function fetchData<T>(serverSideCall: boolean, endpoint: string): Promise<T> {
  try {
    const url = serverSideCall
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/dashboard/${endpoint}`
      : `/api/dashboard/${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new DashboardAPIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        endpoint
      );
    }
    
    return response.json();
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    if (error instanceof DashboardAPIError) {
      throw error;
    }
    throw new DashboardAPIError('Failed to fetch data', 500, endpoint);
  }
}

export const dashboardDataService = {
  getBalanceHistoryData: (serverSideCall: boolean = false): Promise<BalanceHistoryItem[]> => 
    fetchData<BalanceHistoryItem[]>(serverSideCall, 'balanceHistory'),

  getCardsData: (serverSideCall: boolean = false): Promise<Card[]> => 
    fetchData<Card[]>(serverSideCall, 'cards'),

  getExpenseStatisticsData: (serverSideCall: boolean = false): Promise<ExpenseStatistic[]> => 
    fetchData<ExpenseStatistic[]>(serverSideCall, 'expenseStatistics'),

  getQuickTransferUsersData: (serverSideCall: boolean = false): Promise<QuickTransferUser[]> => 
    fetchData<QuickTransferUser[]>(serverSideCall, 'quickTransferUsers'),

  getTransactionsData: (serverSideCall: boolean = false): Promise<Transaction[]> => 
    fetchData<Transaction[]>(serverSideCall, 'transactions'),

  getWeeklyActivityData: (serverSideCall: boolean = false): Promise<WeeklyActivity[]> => 
    fetchData<WeeklyActivity[]>(serverSideCall, 'weeklyActivity'),
} as const;
export type DashboardDataService = typeof dashboardDataService;