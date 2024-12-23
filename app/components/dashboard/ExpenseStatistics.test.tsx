import { render } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import type { ExpenseData } from './dashboardInterfaces'
import ExpenseStatistics from './ExpenseStatistics'

// Mock Recharts components
jest.mock('recharts', () => ({
  PieChart: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='pie-chart' {...props}>
      {children}
    </div>
  ),
  Pie: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div data-testid='pie' {...props}>
      {children}
    </div>
  ),
  Cell: (props: any) => <div data-testid='pie-cell' {...props} />
}))

describe('ExpenseStatistics Component', () => {
  const mockData: ExpenseData[] = [
    { name: 'Shopping', value: 450, color: '#FF6B6B' },
    { name: 'Transportation', value: 300, color: '#4ECDC4' },
    { name: 'Entertainment', value: 250, color: '#45B7D1' }
  ]

  const renderComponent = (props = { data: mockData }) => {
    return render(<ExpenseStatistics {...props} />)
  }

  it('renders the chart with correct structure', () => {
    const { getByTestId, getByRole } = renderComponent()

    expect(getByTestId('pie-chart')).toBeInTheDocument()
    expect(getByTestId('pie')).toBeInTheDocument()
    expect(getByRole('img')).toBeInTheDocument()
  })

  it('creates correct number of segments based on data', () => {
    const { getAllByTestId } = renderComponent()

    const segments = getAllByTestId('pie-cell')
    expect(segments).toHaveLength(mockData.length)
  })

  it('applies proper accessibility attributes to chart wrapper', () => {
    const { getByRole } = renderComponent()

    const chart = getByRole('img', { name: 'Expense Statistics Chart' })
    expect(chart).toHaveAttribute('aria-roledescription', 'A pie chart showing expense distribution')
    
    // Verify the aria-details contains percentage information for each category
    const ariaDetails = chart.getAttribute('aria-details')
    mockData.forEach(item => {
      const totalValue = mockData.reduce((sum, entry) => sum + entry.value, 0)
      const percentage = ((item.value / totalValue) * 100).toFixed(0)
      expect(ariaDetails).toContain(`${item.name}: ${percentage}%`)
    })
  })

  it('renders screen reader text with correct data', () => {
    const { getByText } = renderComponent()

    expect(getByText('Expense Statistics')).toBeInTheDocument()
    
    mockData.forEach(item => {
      expect(getByText(new RegExp(item.name))).toBeInTheDocument()
    })
  })

  it('calculates and displays correct percentages', () => {
    const totalValue = mockData.reduce((sum, item) => sum + item.value, 0)
    const { container } = renderComponent()

    mockData.forEach(item => {
      const percentage = ((item.value / totalValue) * 100).toFixed(0)
      expect(container.textContent).toContain(`${percentage}%`)
    })
  })

  it('handles empty data gracefully', () => {
    const { container } = renderComponent({ data: [] })
    
    const chart = container.querySelector('[data-testid="pie"]')
    expect(chart).toBeInTheDocument()
    expect(chart?.children).toHaveLength(0)
  })

  it('uses correct colors from data', () => {
    const { getAllByTestId } = renderComponent()

    const cells = getAllByTestId('pie-cell')
    cells.forEach((cell, index) => {
      expect(cell).toHaveAttribute('fill', mockData[index].color)
    })
  })

  it('maintains proper chart dimensions', () => {
    const { getByTestId } = renderComponent()

    const pieChart = getByTestId('pie-chart')
    expect(pieChart).toHaveAttribute('width', '400')
    expect(pieChart).toHaveAttribute('height', '300')
  })

  it('renders pie configuration correctly', () => {
    const { getByTestId } = renderComponent()

    const pie = getByTestId('pie')
    expect(pie).toHaveAttribute('cx', '50%')
    expect(pie).toHaveAttribute('cy', '50%')
    expect(pie).toHaveAttribute('outerRadius', '140')
    expect(pie).toHaveAttribute('innerRadius', '0')
    expect(pie).toHaveAttribute('paddingAngle', '5')
  })
})