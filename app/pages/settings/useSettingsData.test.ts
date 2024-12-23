import { renderHook, act } from '@testing-library/react'
import { useSettingsData } from './useSettingsData'
import { settingsDataService } from '@/services/dataServices/settings/settingsDataService'
import { validateFieldExternal } from '@/services/otherServices/formValidationUtil'

jest.mock('@/services/dataServices/settings/settingsDataService')
jest.mock('@/services/otherServices/formValidationUtil')

describe('useSettingsData Hook', () => {
  const mockSettingsData = {
    formFields: [
      {
        name: 'fullName',
        label: 'Full Name',
        type: 'text',
        defaultValue: 'John Doe'
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        defaultValue: 'john@example.com'
      }
    ],
    profileImageData: {
      url: '/profile.jpg',
      alt: 'Profile Picture'
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(settingsDataService, 'getSettingsData').mockResolvedValue(mockSettingsData)
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('initializes with provided initial data when available', () => {
    const { result } = renderHook(() => useSettingsData({
      initialData: mockSettingsData,
      ssrConfig: { SETTINGS_SSR_ENABLED: true }
    }))

    expect(result.current.settingsData).toEqual(mockSettingsData)
    expect(result.current.formValues).toEqual({
      fullName: 'John Doe',
      email: 'john@example.com'
    })
    expect(settingsDataService.getSettingsData).not.toHaveBeenCalled()
  })

  it('fetches data when SSR is disabled and no initial data is provided', async () => {
    const { result } = renderHook(() => useSettingsData({
      initialData: null,
      ssrConfig: { SETTINGS_SSR_ENABLED: false }
    }))

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(settingsDataService.getSettingsData).toHaveBeenCalledWith(false)
    expect(result.current.settingsData).toEqual(mockSettingsData)
    expect(result.current.formValues).toEqual({
      fullName: 'John Doe',
      email: 'john@example.com'
    })
  })

  it('validates individual fields correctly', async () => {
    jest.spyOn(validateFieldExternal, 'call').mockImplementation((name, value) => {
      if (name === 'email' && !value.includes('@')) {
        return 'Invalid email format'
      }
      return ''
    })

    const { result } = renderHook(() => useSettingsData({
      initialData: mockSettingsData,
      ssrConfig: { SETTINGS_SSR_ENABLED: true }
    }))

    act(() => {
      result.current.validateField('email', 'invalid-email')
    })

    expect(result.current.formErrors.email).toBe('Invalid email format')
  })

  it('performs complete form validation', async () => {
    jest.spyOn(validateFieldExternal, 'call').mockImplementation((name, value) => {
      if (name === 'email' && !value.includes('@')) {
        return 'Invalid email format'
      }
      if (name === 'fullName' && value.length < 3) {
        return 'Name too short'
      }
      return ''
    })

    const { result } = renderHook(() => useSettingsData({
      initialData: mockSettingsData,
      ssrConfig: { SETTINGS_SSR_ENABLED: true }
    }))

    let isValid
    act(() => {
      isValid = result.current.validateForm()
    })

    expect(isValid).toBe(true)
    expect(result.current.formErrors).toEqual({
      fullName: '',
      email: ''
    })
  })

  it('updates form values correctly', () => {
    const { result } = renderHook(() => useSettingsData({
      initialData: mockSettingsData,
      ssrConfig: { SETTINGS_SSR_ENABLED: true }
    }))

    act(() => {
      result.current.setFormValues({
        ...result.current.formValues,
        fullName: 'Jane Doe'
      })
    })

    expect(result.current.formValues.fullName).toBe('Jane Doe')
  })

  it('handles errors during data fetching gracefully', async () => {
    const mockError = new Error('Failed to fetch settings')
    jest.spyOn(settingsDataService, 'getSettingsData').mockRejectedValue(mockError)

    const { result } = renderHook(() => useSettingsData({
      initialData: null,
      ssrConfig: { SETTINGS_SSR_ENABLED: false }
    }))

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(console.error).toHaveBeenCalledWith('Error fetching settings data:', mockError)
    expect(result.current.settingsData).toBeNull()
  })

  it('returns false for validateForm when no settings data is available', () => {
    const { result } = renderHook(() => useSettingsData({
      initialData: null,
      ssrConfig: { SETTINGS_SSR_ENABLED: false }
    }))

    let isValid
    act(() => {
      isValid = result.current.validateForm()
    })

    expect(isValid).toBe(false)
  })

  it('maintains empty form values for fields without default values', () => {
    const dataWithoutDefaults = {
      formFields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text'
        }
      ]
    }

    const { result } = renderHook(() => useSettingsData({
      initialData: dataWithoutDefaults,
      ssrConfig: { SETTINGS_SSR_ENABLED: true }
    }))

    expect(result.current.formValues.username).toBe('')
  })
})