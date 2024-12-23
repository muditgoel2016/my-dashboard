import React from 'react'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreditCard, { defaultCardTheme, defaultCardLabels } from './CreditCard'
import type { Card } from './dashboardInterfaces'

describe('CreditCard Component', () => {
  const mockChipImage = () => <div data-testid="chip-image">Chip</div>
  const mockProviderLogo = () => <div data-testid="provider-logo">Logo</div>

  const defaultCard: Card = {
    id: 1,
    balance: '5,000.00',
    holder: 'John Doe',
    validThru: '12/25',
    cardNumber: '4532123456781234',
    theme: {
      ...defaultCardTheme,
      creditProviderLogo: mockProviderLogo()
    }
  }

  const renderCard = (props = {}) => {
    return render(
      <CreditCard
        card={defaultCard}
        ChipImage={mockChipImage}
        {...props}
      />
    )
  }

  it('renders card with correct basic content and structure', () => {
    const { getByText, getByLabelText } = renderCard()

    expect(getByText(defaultCardLabels.balance)).toBeInTheDocument()
    expect(getByText(`$${defaultCard.balance}`)).toBeInTheDocument()
    expect(getByText(defaultCard.holder)).toBeInTheDocument()
    expect(getByText(defaultCard.validThru)).toBeInTheDocument()
    expect(getByLabelText(/Credit card ending in/)).toBeInTheDocument()
  })

  it('applies proper formatting to card number', () => {
    const { getByText } = renderCard()
    const formattedNumber = '4532 1234 5678 1234'
    expect(getByText(formattedNumber)).toBeInTheDocument()
  })

  it('handles click events correctly', () => {
    const onCardClick = jest.fn()
    const { getByRole } = renderCard({ onCardClick })

    const card = getByRole('region')
    act(() => {
      card.click()
    })
    expect(onCardClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard navigation appropriately', () => {
    const onCardClick = jest.fn()
    const { getByRole } = renderCard({ onCardClick })

    const card = getByRole('region')
    act(() => {
      card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    })
    expect(onCardClick).toHaveBeenCalledTimes(1)

    act(() => {
      card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    })
    expect(onCardClick).toHaveBeenCalledTimes(2)
  })

  it('renders with custom dimensions', () => {
    const customWidth = 'w-[400px]'
    const customHeight = 'h-[300px]'
    const { container } = renderCard({
      width: customWidth,
      height: customHeight
    })

    const content = container.querySelector('.flex.flex-col')
    expect(content).toHaveClass(customWidth, customHeight)
  })

  it('applies theme styles correctly', () => {
    const customTheme = {
      ...defaultCardTheme,
      bgColor: 'bg-custom-color',
      textPrimaryColor: 'text-custom-color',
      gradients: {
        overall: {
          enabled: true,
          value: 'custom-gradient'
        },
        footer: {
          enabled: true,
          value: 'custom-footer-gradient'
        }
      }
    }

    const customCard = {
      ...defaultCard,
      theme: customTheme
    }

    const { container } = renderCard({ card: customCard })
    expect(container.firstChild).toHaveClass('custom-gradient')
  })

  it('implements proper accessibility attributes', () => {
    const { getByRole, getAllByRole } = renderCard()

    expect(getByRole('region')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Credit card ending in 1234')
    )
    expect(getAllByRole('group')).toHaveLength(3)
  })

  it('handles separator visibility based on theme', () => {
    const themeWithoutSeparator = {
      ...defaultCardTheme,
      separator: {
        enabled: false,
        value: ''
      }
    }

    const cardWithoutSeparator = {
      ...defaultCard,
      theme: themeWithoutSeparator
    }

    const { container: containerWithSeparator } = renderCard()
    const { container: containerWithoutSeparator } = renderCard({
      card: cardWithoutSeparator
    })

    expect(containerWithSeparator.querySelector('.border-t')).toBeInTheDocument()
    expect(containerWithoutSeparator.querySelector('.border-t')).not.toBeInTheDocument()
  })

  it('applies hover effects correctly', () => {
    const { container } = renderCard()

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('transition-all')
  })
})