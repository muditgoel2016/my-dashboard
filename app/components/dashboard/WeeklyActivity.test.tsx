import { render } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import type { ActivityData } from './dashboardInterfaces'
import WeeklyActivity from './WeeklyActivity'

// Mock Recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='responsive-container'>{children}</div>
  ),
  BarChart: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='bar-chart' {...props}>{children}</div>
  ),
  Bar: (props: any) => <div data-testid='bar' {...props} />,
  CartesianGrid: (props: any) => <div data-testid='cartesian-grid' {...props} />,
  XAxis: (props: any) => <div data-testid='x-axis' {...props} />,
  YAxis: (props: any) => <div data-testid='y-axis' {...props} />,
  Legend: (props: any) => <div data-testid='legend' {...props} />
}))

describe('WeeklyActivity Component', () => {
  const mockActivityData: ActivityData[] = [
    { name: 'Mon', deposit: 400, withdraw: 300 },
    { name: 'Tue', deposit: 300, withdraw: 200 },
    { name: 'Wed', deposit: 500, withdraw: 400 },
    { name: 'Thu', deposit: 200, withdraw: 150 },
    { name: 'Fri', deposit: 450, withdraw: 350 }
  ]

  const renderComponent = (props = { data: mockActivityData }) => {
    return render(<WeeklyActivity {...props} />)
  }

  it('renders the chart container with proper structure', () => {
    const { getByTestId, getByRole } = renderComponent()

    expect(getByTestId('responsive-container')).toBeInTheDocument()
    expect(getByTestId('bar-chart')).toBeInTheDocument()
    expect(getByRole('img', { name: 'Weekly Activity Chart' })).toBeInTheDocument()
  })

  it('implements proper accessibility attributes', () => {
    const { getByRole } = renderComponent()

    const chart = getByRole('img', { name: 'Weekly Activity Chart' })
    expect(chart).toHaveAttribute('aria-roledescription', 'A bar chart comparing weekly deposits and withdrawals')
    
    const ariaDetails = chart.getAttribute('aria-details')
    expect(ariaDetails).toContain('Weekly activity chart showing deposits and withdrawals')
    mockActivityData.forEach(item => {
      expect(ariaDetails).toContain(`${item.name}: Deposit $${item.deposit}, Withdraw $${item.withdraw}`)
    })
  })

  it('renders chart components with correct configurations', () => {
    const { getByTestId } = renderComponent()

    const barChart = getByTestId('bar-chart')
    expect(barChart).toHaveAttribute('barCategoryGap', '20%')
    expect(barChart).toHaveAttribute('maxBarSize', '15')
  })

  it('applies correct axis configurations', () => {
    const { getByTestId } = renderComponent()

    const xAxis = getByTestId('x-axis')
    expect(xAxis).toHaveAttribute('dataKey', 'name')
    expect(xAxis).toHaveAttribute('aria-label', 'Days of the week')

    const yAxis = getByTestId('y-axis')
    expect(yAxis).toHaveAttribute('aria-label', 'Amount in dollars')
  })

  it('renders deposit and withdrawal bars with correct properties', () => {
    const { getAllByTestId } = renderComponent()

    const bars = getAllByTestId('bar')
    expect(bars).toHaveLength(2) // One for deposits, one for withdrawals

    const [depositBar, withdrawalBar] = bars
    expect(depositBar).toHaveAttribute('name', 'Deposit')
    expect(depositBar).toHaveAttribute('fill', '#396AFF')
    expect(withdrawalBar).toHaveAttribute('name', 'Withdraw')
    expect(withdrawalBar).toHaveAttribute('fill', '#232323')
  })

  it('generates correct legend content', () => {
    const { getByTestId } = renderComponent()

    const legend = getByTestId('legend')
    expect(legend).toHaveAttribute('align', 'right')
    expect(legend).toHaveAttribute('verticalAlign', 'top')
    expect(legend).toHaveAttribute('role', 'list')
  })

  it('maintains chart margins and dimensions', () => {
    const { getByTestId } = renderComponent()

    const container = getByTestId('responsive-container')
    expect(container).toHaveAttribute('height', '300')
    expect(container).toHaveAttribute('width', '100%')
  })

  it('applies correct grid styling', () => {
    const { getByTestId } = renderComponent()

    const grid = getByTestId('cartesian-grid')
    expect(grid).toHaveAttribute('strokeDasharray', '3 3')
    expect(grid).toHaveAttribute('vertical', 'false')
    expect(grid).toHaveAttribute('stroke', '#E5E7EB')
  })

  it('handles empty data gracefully', () => {
    const { getByRole } = renderComponent({ data: [] })

    const chart = getByRole('img', { name: 'Weekly Activity Chart' })
    expect(chart).toBeInTheDocument()
    const summary = chart.getAttribute('aria-details')
    expect(summary).toBe('Weekly activity chart showing deposits and withdrawals. ')
  })

  it('formats legend text correctly', () => {
    const { getByText } = renderComponent()

    const depositLabel = getByText('Deposit')
    const withdrawLabel = getByText('Withdraw')

    expect(depositLabel).toHaveAttribute('aria-label', 'Deposit data series')
    expect(withdrawLabel).toHaveAttribute('aria-label', 'Withdraw data series')
  })
})