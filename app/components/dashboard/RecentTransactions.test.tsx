import React from 'react'
import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuickTransfer from './QuickTransfer'
import { useToast } from '@/services/otherServices/useToast'

// Mock dependencies
jest.mock('@/services/otherServices/useToast', () => ({
  useToast: jest.fn()
}))

jest.mock('lucide-react', () => ({
  Send: () => <div data-testid="send-icon">Send Icon</div>,
  Loader2: () => <div data-testid="loader-icon">Loader Icon</div>
}))

describe('QuickTransfer Component', () => {
  const mockToast = jest.fn()
  const mockUsers = [
    {
      name: 'John Doe',
      title: 'Software Engineer',
      avatarUrl: '/images/john.jpg'
    },
    {
      name: 'Jane Smith',
      title: 'Product Manager',
      avatarUrl: '/images/jane.jpg'
    }
  ]

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast })
    jest.clearAllMocks()
  })

  const renderComponent = (props = {}) => {
    return render(
      <QuickTransfer
        users={mockUsers}
        {...props}
      />
    )
  }

  it('renders component with initial state correctly', () => {
    const { getByRole, getByLabelText, getAllByRole } = renderComponent()

    expect(getByRole('region', { name: 'Quick Transfer Interface' })).toBeInTheDocument()
    expect(getByRole('listbox')).toBeInTheDocument()
    expect(getAllByRole('option')).toHaveLength(mockUsers.length)
    expect(getByLabelText('Transfer amount in dollars')).toHaveValue('525.50')
  })

  it('displays user information correctly', () => {
    const { getAllByRole, getByText } = renderComponent()

    mockUsers.forEach(user => {
      expect(getByText(user.name)).toBeInTheDocument()
      expect(getByText(user.title)).toBeInTheDocument()
    })

    const avatars = getAllByRole('img')
    expect(avatars).toHaveLength(mockUsers.length)
  })

  it('handles amount input changes', () => {
    const { getByLabelText } = renderComponent()
    const input = getByLabelText('Transfer amount in dollars')

    act(() => {
      input.setAttribute('value', '1000.00')
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(input).toHaveValue('1000.00')
  })

  it('validates amount correctly', async () => {
    const onSend = jest.fn()
    const { getByRole } = renderComponent({ onSend })
    
    const sendButton = getByRole('button', { name: /send transfer/i })

    act(() => {
      sendButton.click()
    })

    expect(onSend).toHaveBeenCalledWith('525.50')
    expect(mockToast).not.toHaveBeenCalledWith(expect.objectContaining({
      variant: 'destructive'
    }))
  })

  it('handles successful transfer', async () => {
    const onSend = jest.fn().mockResolvedValue(undefined)
    const { getByRole } = renderComponent({ onSend })

    const sendButton = getByRole('button', { name: /send transfer/i })

    await act(async () => {
      sendButton.click()
      await Promise.resolve()
    })

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Transfer Initiated',
      variant: 'success'
    }))
  })

  it('handles transfer failure', async () => {
    const error = new Error('Network error')
    const onSend = jest.fn().mockRejectedValue(error)
    const { getByRole } = renderComponent({ onSend })

    const sendButton = getByRole('button', { name: /send transfer/i })

    await act(async () => {
      sendButton.click()
      await Promise.resolve()
    })

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Transfer Failed',
      variant: 'destructive'
    }))
  })

  it('implements proper scroll behavior', () => {
    const { getByRole } = renderComponent()
    const scrollButton = getByRole('button', { name: /scroll to see more recipients/i })
    const scrollContainer = getByRole('listbox')

    Object.defineProperty(scrollContainer, 'scrollBy', {
      value: jest.fn()
    })

    act(() => {
      scrollButton.click()
    })

    expect(scrollContainer.scrollBy).toHaveBeenCalledWith({
      left: 240,
      behavior: 'smooth'
    })
  })

  it('handles loading state during transfer', async () => {
    const onSend = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    const { getByRole, getByTestId } = renderComponent({ onSend })

    const sendButton = getByRole('button', { name: /send transfer/i })

    await act(async () => {
      sendButton.click()
    })

    expect(getByTestId('loader-icon')).toBeInTheDocument()
    expect(sendButton).toBeDisabled()
  })

  it('maintains accessibility during disabled states', async () => {
    const onSend = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    const { getByRole, getByLabelText } = renderComponent({ onSend })

    await act(async () => {
      getByRole('button', { name: /send transfer/i }).click()
    })

    expect(getByLabelText('Transfer amount in dollars')).toBeDisabled()
    expect(getByRole('button', { name: /sending transfer/i })).toBeDisabled()
  })
})