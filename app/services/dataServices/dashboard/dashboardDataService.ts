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
 * @param endpoint - API endpoint to fetch from
 * @returns Promise with the typed response data
 * @throws DashboardAPIError if the request fails
 */
async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/dashboard/${endpoint}`);
    
    if (!response.ok) {
      throw new DashboardAPIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        endpoint
      );
    }
    
    return response.json();
  } catch (error) {
    if (error instanceof DashboardAPIError) {
      throw error;
    }
    throw new DashboardAPIError(
      'Failed to fetch data',
      500,
      endpoint
    );
  }
}

/**
 * Dashboard data service for fetching various dashboard-related data
 */
export const dashboardDataService = {
  /**
   * Fetches balance history data
   */
  getBalanceHistoryData: (): Promise<BalanceHistoryItem[]> => 
    fetchData<BalanceHistoryItem[]>('balanceHistory'),

  /**
   * Fetches cards data
   */
  getCardsData: (): Promise<Card[]> => 
    fetchData<Card[]>('cards'),

  /**
   * Fetches expense statistics data
   */
  getExpenseStatisticsData: (): Promise<ExpenseStatistic[]> => 
    fetchData<ExpenseStatistic[]>('expenseStatistics'),

  /**
   * Fetches quick transfer users data
   */
  getQuickTransferUsersData: (): Promise<QuickTransferUser[]> => 
    fetchData<QuickTransferUser[]>('quickTransferUsers'),

  /**
   * Fetches transactions data
   */
  getTransactionsData: (): Promise<Transaction[]> => 
    fetchData<Transaction[]>('transactions'),

  /**
   * Fetches weekly activity data
   */
  getWeeklyActivityData: (): Promise<WeeklyActivity[]> => 
    fetchData<WeeklyActivity[]>('weeklyActivity'),
} as const;

// Type for the entire service
export type DashboardDataService = typeof dashboardDataService;