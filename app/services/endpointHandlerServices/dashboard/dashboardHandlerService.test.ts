import {
  getBalanceHistoryData,
  getCardsData,
  getExpenseStatisticsData,
  getQuickTransferUsersData,
  getTransactionsData,
  getWeeklyActivityData
} from './dashboardHandlerService'

describe('Dashboard Handler Service', () => {
  describe('Balance History Data', () => {
    it('returns correctly structured balance history data', () => {
      const balanceHistory = getBalanceHistoryData()
      
      expect(Array.isArray(balanceHistory)).toBeTruthy()
      expect(balanceHistory.length).toBeGreaterThan(0)
      
      balanceHistory.forEach(item => {
        expect(item).toHaveProperty('month')
        expect(item).toHaveProperty('value')
        expect(typeof item.month).toBe('string')
        expect(typeof item.value).toBe('number')
      })
    })

    it('maintains chronological order of months', () => {
      const balanceHistory = getBalanceHistoryData()
      const months = balanceHistory.map(item => item.month)
      
      expect(months).toEqual(['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'])
    })
  })

  describe('Cards Data', () => {
    it('returns properly formatted card data with complete theme information', () => {
      const cards = getCardsData()
      
      expect(Array.isArray(cards)).toBeTruthy()
      
      cards.forEach(card => {
        expect(card).toMatchObject({
          id: expect.any(Number),
          balance: expect.any(String),
          holder: expect.any(String),
          validThru: expect.stringMatching(/^\d{2}\/\d{2}$/),
          cardNumber: expect.stringMatching(/^\d{4} \*{4} \*{4} \d{4}$/),
          theme: expect.objectContaining({
            bgColor: expect.any(String),
            textPrimaryColor: expect.any(String),
            labelColor: expect.any(String),
            valueColor: expect.any(String)
          })
        })

        expect(card.theme.border).toBeDefined()
        expect(card.theme.gradients).toBeDefined()
        expect(card.theme.separator).toBeDefined()
      })
    })

    it('ensures unique card IDs', () => {
      const cards = getCardsData()
      const cardIds = cards.map(card => card.id)
      const uniqueIds = new Set(cardIds)
      
      expect(uniqueIds.size).toBe(cards.length)
    })
  })

  describe('Expense Statistics Data', () => {
    it('returns valid expense statistics with proper color codes', () => {
      const expenses = getExpenseStatisticsData()
      
      expect(Array.isArray(expenses)).toBeTruthy()
      
      expenses.forEach(expense => {
        expect(expense).toMatchObject({
          name: expect.any(String),
          value: expect.any(Number),
          color: expect.stringMatching(/^#[\da-f]{6}$/i)
        })
      })
    })

    it('ensures total percentage adds up to 100', () => {
      const expenses = getExpenseStatisticsData()
      const total = expenses.reduce((sum, expense) => sum + expense.value, 0)
      
      expect(total).toBe(100)
    })
  })

  describe('Quick Transfer Users Data', () => {
    it('returns properly structured user data', () => {
      const users = getQuickTransferUsersData()
      
      expect(Array.isArray(users)).toBeTruthy()
      
      users.forEach(user => {
        expect(user).toMatchObject({
          name: expect.any(String),
          title: expect.any(String),
          initial: expect.stringMatching(/^[A-Z]$/)
        })

        if (user.avatarUrl) {
          expect(user.avatarUrl).toMatch(/^https:\/\/picsum\.photos\/id\/\d+\/96\/96$/)
        }
      })
    })

    it('generates correct initials from names', () => {
      const users = getQuickTransferUsersData()
      
      users.forEach(user => {
        expect(user.initial).toBe(user.name[0])
      })
    })
  })

  describe('Transactions Data', () => {
    it('returns transactions with valid structure and types', () => {
      const transactions = getTransactionsData()
      
      expect(Array.isArray(transactions)).toBeTruthy()
      
      transactions.forEach(transaction => {
        expect(transaction).toMatchObject({
          id: expect.any(Number),
          title: expect.any(String),
          date: expect.stringMatching(/^\d{2} [A-Za-z]+ \d{4}$/),
          amount: expect.any(String),
          type: expect.stringMatching(/^(credit|debit)$/),
          depositMode: expect.stringMatching(/^(card|paypal|cash)$/),
          icon: expect.objectContaining({
            bg: expect.stringMatching(/^#[A-Za-z\d]+$/),
            color: expect.stringMatching(/^#[A-Za-z\d]+$/)
          })
        })
      })
    })

    it('maintains chronological order of transactions', () => {
      const transactions = getTransactionsData()
      const dates = transactions.map(t => new Date(t.date))
      
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i] <= dates[i-1]).toBeTruthy()
      }
    })
  })

  describe('Weekly Activity Data', () => {
    it('returns properly structured weekly data', () => {
      const weeklyData = getWeeklyActivityData()
      
      expect(Array.isArray(weeklyData)).toBeTruthy()
      expect(weeklyData.length).toBe(7)
      
      weeklyData.forEach(day => {
        expect(day).toMatchObject({
          name: expect.stringMatching(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/),
          deposit: expect.any(Number),
          withdraw: expect.any(Number)
        })
      })
    })

    it('ensures all days of the week are represented', () => {
      const weeklyData = getWeeklyActivityData()
      const expectedDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      const actualDays = weeklyData.map(day => day.name)
      
      expect(actualDays).toEqual(expectedDays)
    })
  })
})