// app/services/dataServices/dashboard/dashboardDataService.ts

async function fetchData(endpoint: string) {
  const response = await fetch(`/api/dashboard/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const dashboardDataService = {
  getBalanceHistoryData: () => fetchData('balanceHistory'),
  getCardsData: () => fetchData('cards'),
  getExpenseStatisticsData: () => fetchData('expenseStatistics'),
  getQuickTransferUsersData: () => fetchData('quickTransferUsers'),
  getTransactionsData: () => fetchData('transactions'),
  getWeeklyActivityData: () => fetchData('weeklyActivity'),
};