import { render, act } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import ProfileImagePicker from './ProfileImagePicker'

jest.mock('lucide-react', () => ({
  Pencil: () => <div data-testid='pencil-icon'>Edit Icon</div>
}))

describe('ProfileImagePicker Component', () => {
  const mockImageData = {
    defaultValue: '/default-profile.jpg',
    label: 'Profile Picture',
    type: 'image' as const
  }

  const mockOnImageChange = jest.fn()

  const renderComponent = (props = {}) => {
    return render(
      <ProfileImagePicker
        imageData={mockImageData}
        onImageChange={mockOnImageChange}
        {...props}/>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Clear any object URLs created during tests
    URL.revokeObjectURL = jest.fn()
    URL.createObjectURL = jest.fn().mockReturnValue('mock-preview-url')
  })

  it('renders component with initial image and label', () => {
    const { getByRole, getByText } = renderComponent()

    expect(getByRole('img')).toHaveAttribute('src', mockImageData.defaultValue)
    expect(getByText(mockImageData.label)).toBeInTheDocument()
  })

  it('handles file selection through button click', () => {
    const { getByRole } = renderComponent()
    const editButton = getByRole('button', { name: /change profile picture/i })
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      const input = document.querySelector('input[type="file"]')
      Object.defineProperty(input, 'files', {
        value: [file]
      })
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(mockOnImageChange).toHaveBeenCalledWith(file)
    expect(URL.createObjectURL).toHaveBeenCalledWith(file)
  })

  it('handles drag and drop functionality', () => {
    const { getByRole } = renderComponent()
    const dropZone = getByRole('region')
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      dropZone.dispatchEvent(new Event('dragover', { bubbles: true }))
    })

    act(() => {
      const dropEvent = new Event('drop', { bubbles: true })
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: { files: [file] }
      })
      dropZone.dispatchEvent(dropEvent)
    })

    expect(mockOnImageChange).toHaveBeenCalledWith(file)
    expect(URL.createObjectURL).toHaveBeenCalledWith(file)
  })

  it('implements keyboard navigation', () => {
    const { getByRole } = renderComponent()
    const editButton = getByRole('button')

    act(() => {
      editButton.focus()
      editButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    })

    const fileInput = document.querySelector('input[type="file"]')
    expect(document.activeElement).toBe(fileInput)
  })

  it('handles visual feedback during drag operations', () => {
    const { getByRole, container } = renderComponent()
    const dropZone = getByRole('region').firstChild as HTMLElement

    act(() => {
      dropZone.dispatchEvent(new Event('dragover', { bubbles: true }))
    })

    expect(dropZone).toHaveClass('ring-2')
    expect(dropZone).toHaveClass('ring-blue-500')

    act(() => {
      dropZone.dispatchEvent(new Event('dragleave', { bubbles: true }))
    })

    expect(dropZone).not.toHaveClass('ring-2')
  })

  it('implements proper accessibility attributes', () => {
    const { getByRole } = renderComponent()

    const region = getByRole('region')
    expect(region).toHaveAttribute('aria-label', 'Profile image uploader')

    const uploadButton = getByRole('button')
    expect(uploadButton).toHaveAttribute('aria-label', 'Change profile picture')

    const currentImage = getByRole('img')
    expect(currentImage).toHaveAttribute('aria-label', 'Current profile picture')
  })

  it('provides screen reader feedback for state changes', () => {
    const { getByRole, getByText } = renderComponent()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      const input = document.querySelector('input[type="file"]')
      Object.defineProperty(input, 'files', {
        value: [file]
      })
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    expect(getByText('New image selected')).toBeInTheDocument()

    const dropZone = getByRole('region').firstChild as HTMLElement
    act(() => {
      dropZone.dispatchEvent(new Event('dragover', { bubbles: true }))
    })

    expect(getByText('Drop image to upload')).toBeInTheDocument()
  })

  it('cleans up resources when unmounting', () => {
    const { unmount } = renderComponent()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })

    act(() => {
      const input = document.querySelector('input[type="file"]')
      Object.defineProperty(input, 'files', {
        value: [file]
      })
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    unmount()
    expect(URL.revokeObjectURL).toHaveBeenCalled()
  })
})