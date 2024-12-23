import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import BalanceHistory from './BalanceHistory'
import { BalanceHistoryProps } from './dashboardInterfaces'

jest.mock('recharts', () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="chart-line" />,
  CartesianGrid: () => <div data-testid="chart-grid" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Area: () => <div data-testid="chart-area" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}))

describe('BalanceHistory Component', () => {
  const defaultProps: BalanceHistoryProps = {
    data: [
      { month: 'Jan', value: 500 },
      { month: 'Feb', value: 600 },
      { month: 'Mar', value: 750 }
    ],
    height: 300,
    gradientColor: '#4F46E5',
    lineColor: '#4F46E5',
    title: 'Balance History',
    description: 'Line chart showing balance history over time'
  }

  it('renders successfully with default props', () => {
    const { getByRole, getByTestId } = render(<BalanceHistory {...defaultProps} />)

    expect(getByRole('figure')).toBeInTheDocument()
    expect(getByTestId('line-chart')).toBeInTheDocument()
    expect(getByTestId('chart-line')).toBeInTheDocument()
    expect(getByTestId('chart-grid')).toBeInTheDocument()
  })

  it('returns null when data array is empty', () => {
    const { container } = render(<BalanceHistory {...defaultProps} data={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('applies correct accessibility attributes', () => {
    const { getByRole } = render(<BalanceHistory {...defaultProps} />)

    const figure = getByRole('figure')
    expect(figure).toHaveAttribute('aria-label', defaultProps.title)
    expect(figure).toHaveAttribute('aria-roledescription', defaultProps.description)
  })

  it('renders with custom height', () => {
    const customHeight = 500
    const { getByTestId } = render(<BalanceHistory {...defaultProps} height={customHeight} />)

    const container = getByTestId('responsive-container')
    expect(container).toHaveAttribute('height', customHeight.toString())
  })

  it('renders with custom colors', () => {
    const customProps = {
      ...defaultProps,
      gradientColor: '#FF0000',
      lineColor: '#00FF00'
    }
    
    const { container } = render(<BalanceHistory {...customProps} />)
    
    const gradient = container.querySelector('linearGradient stop')
    expect(gradient).toHaveAttribute('stop-color', customProps.gradientColor)
  })

  it('handles custom title and description', () => {
    const customProps = {
      ...defaultProps,
      title: 'Custom Title',
      description: 'Custom Description'
    }
    
    const { getByRole } = render(<BalanceHistory {...customProps} />)
    
    const figure = getByRole('figure')
    expect(figure).toHaveAttribute('aria-label', customProps.title)
    expect(figure).toHaveAttribute('aria-roledescription', customProps.description)
  })

  it('preserves margin constants', () => {
    const { getByTestId } = render(<BalanceHistory {...defaultProps} />)
    
    const chart = getByTestId('line-chart')
    expect(chart).toHaveAttribute('margin', expect.stringContaining('20'))
    expect(chart).toHaveAttribute('margin', expect.stringContaining('30'))
    expect(chart).toHaveAttribute('margin', expect.stringContaining('10'))
  })

  it('renders all required chart components', () => {
    const { getByTestId, getAllByTestId } = render(<BalanceHistory {...defaultProps} />)

    expect(getByTestId('line-chart')).toBeInTheDocument()
    expect(getByTestId('chart-line')).toBeInTheDocument()
    expect(getByTestId('chart-grid')).toBeInTheDocument()
    expect(getByTestId('x-axis')).toBeInTheDocument()
    expect(getByTestId('y-axis')).toBeInTheDocument()
    expect(getAllByTestId('chart-area')).toHaveLength(2)
  })
})