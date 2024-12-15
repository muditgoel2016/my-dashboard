// app/services/endpointServices/dashboard/dashboardEndpointService.ts

async function fetchData(endpoint: string) {
  const response = await fetch(`/api/dashboard/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const dashboardEndpointService = {
  getBalanceHistoryData: () => fetchData('balanceHistory'),
  getCardsData: () => fetchData('cards'),
  getExpenseStatisticsData: () => fetchData('expenseStatistics'),
  getQuickTransferUsersData: () => fetchData('quickTransferUsers'),
  getTransactionsData: () => fetchData('transactions'),
  getWeeklyActivityData: () => fetchData('weeklyActivity'),
};