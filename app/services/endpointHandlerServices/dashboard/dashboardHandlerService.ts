export function getBalanceHistoryData() {
  return [
    { month: 'Jul', value: 200 },
    { month: 'Aug', value: 400 },
    { month: 'Sep', value: 600 },
    { month: 'Oct', value: 300 },
    { month: 'Nov', value: 500 },
    { month: 'Dec', value: 200 },
    { month: 'Jan', value: 400 },
  ]
}


export function getCardsData() {
  return [
    {
      id: 1,
      balance: "5,756",
      holder: "Eddy Cusuma",
      validThru: "12/22",
      cardNumber: "3778 **** **** 1234",
      theme: {
        bgColor: "bg-[#31304D]",
        textPrimaryColor: "text-white",
      }
    },
    {
      id: 2,
      balance: "3,210",
      holder: "John Doe",
      validThru: "11/23",
      cardNumber: "1234 **** **** 5678",
      theme: {
        bgColor: "bg-[#f8faff]",
        textPrimaryColor: "text-[#1a1f36]",
      }
    },
  ];
}

export function getExpenseStatisticsData() {
  return [
    { name: 'Entertainment', value: 30, color: '#312E81' },
    { name: 'Bill Expense', value: 15, color: '#F97316' },
    { name: 'Investment', value: 20, color: '#4F46E5' },
    { name: 'Others', value: 35, color: '#000000' }
  ]
 }

 export function getQuickTransferUsersData() {
  return [
    { name: 'Livia Bator', title: 'CEO', initial: 'L', avatarUrl: 'https://picsum.photos/id/64/96/96' },
    { name: 'Randy Press', title: 'Director', initial: 'R' },
    { name: 'Workman', title: 'Designer', initial: 'W', avatarUrl: 'https://picsum.photos/id/64/96/96' }
  ]
 }

 export function getTransactionsData() {
  return [
    {
      id: 1,
      title: "Deposit from my Card",
      date: "28 January 2021",
      amount: "850",
      type: "debit",
      icon: {
        bg: "#FFF7EA",
        color: "#FFB545"
      }
    },
    {
      id: 2,
      title: "Deposit Paypal",
      date: "25 January 2021",
      amount: "2,500",
      type: "credit",
      icon: {
        bg: "#EFF4FF",
        color: "#316FF6"
      }
    },
    {
      id: 3,
      title: "Jemi Wilson",
      date: "21 January 2021",
      amount: "5,400",
      type: "credit",
      icon: {
        bg: "#E7FFF3",
        color: "#35C28F"
      }
    }
  ]
 }

 export function getWeeklyActivityData() {
  return [
    { name: 'Sat', deposit: 200, withdraw: 400 },
    { name: 'Sun', deposit: 100, withdraw: 300 },
    { name: 'Mon', deposit: 250, withdraw: 300 },
    { name: 'Tue', deposit: 350, withdraw: 450 },
    { name: 'Wed', deposit: 250, withdraw: 150 },
    { name: 'Thu', deposit: 230, withdraw: 400 },
    { name: 'Fri', deposit: 320, withdraw: 400 },
  ]
 }
 
 
 
 