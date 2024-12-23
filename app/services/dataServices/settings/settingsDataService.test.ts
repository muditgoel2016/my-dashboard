import { settingsDataService, SettingsAPIError } from './settingsDataService'

describe('Settings Data Service', () => {
  const originalFetch = global.fetch
  const mockBaseUrl = 'http://localhost:3000'

  beforeAll(() => {
    process.env.NEXT_PUBLIC_BASE_URL = mockBaseUrl
  })

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    global.fetch = originalFetch
    delete process.env.NEXT_PUBLIC_BASE_URL
  })

  describe('Successful Data Fetching', () => {
    it('fetches settings data with correct structure and types', async () => {
      const mockSettingsData = {
        profileImage: {
          type: 'image' as const,
          defaultValue: '/default-profile.jpg',
          label: 'Profile Picture'
        },
        formFields: [
          {
            label: 'Your Name',
            defaultValue: 'John Doe',
            type: 'text' as const,
            name: 'yourName'
          },
          {
            label: 'Email Address',
            defaultValue: 'john@example.com',
            type: 'email' as const,
            name: 'email'
          }
        ]
      }

      mockSuccessfulResponse(mockSettingsData)

      const result = await settingsDataService.getSettingsData()
      expect(result).toEqual(mockSettingsData)
      validateFetchCall('', false)
    })

    it('handles server-side calls with proper URL construction', async () => {
      const mockData = {
        profileImage: {
          type: 'image' as const,
          defaultValue: '/profile.jpg',
          label: 'Profile Picture'
        },
        formFields: []
      }
      mockSuccessfulResponse(mockData)

      await settingsDataService.getSettingsData(true)
      validateFetchCall('', true)
    })
  })

  describe('Error Handling', () => {
    it('handles HTTP errors by throwing SettingsAPIError', async () => {
      mockFailedResponse(404, 'Not Found')

      await expect(settingsDataService.getSettingsData())
        .rejects
        .toThrow(SettingsAPIError)
    })

    it('transforms network errors into SettingsAPIError', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))

      await expect(settingsDataService.getSettingsData())
        .rejects
        .toThrow(SettingsAPIError)
    })

    it('includes detailed error information in SettingsAPIError', async () => {
      mockFailedResponse(500, 'Server Error')

      try {
        await settingsDataService.getSettingsData()
      } catch (error) {
        expect(error).toBeInstanceOf(SettingsAPIError)
        expect(error.status).toBe(500)
        expect(error.endpoint).toBe('')
        expect(error.message).toContain('HTTP error')
      }
    })
  })

  describe('URL Construction', () => {
    it('uses relative URL for client-side calls', async () => {
      mockSuccessfulResponse({
        profileImage: {
          type: 'image' as const,
          defaultValue: '/profile.jpg',
          label: 'Profile'
        },
        formFields: []
      })
      
      await settingsDataService.getSettingsData(false)
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/settings',
        expect.any(Object)
      )
    })

    it('uses absolute URL with environment base for server-side calls', async () => {
      mockSuccessfulResponse({
        profileImage: {
          type: 'image' as const,
          defaultValue: '/profile.jpg',
          label: 'Profile'
        },
        formFields: []
      })
      
      await settingsDataService.getSettingsData(true)
      expect(global.fetch).toHaveBeenCalledWith(
        `${mockBaseUrl}/api/settings`,
        expect.any(Object)
      )
    })
  })
})

// Helper functions for testing
function mockSuccessfulResponse(data: any) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data)
  })
}

function mockFailedResponse(status: number, statusText: string) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
    statusText
  })
}

function validateFetchCall(endpoint: string, isServerSide: boolean) {
  const expectedUrl = isServerSide
    ? `${mockBaseUrl}/api/settings${endpoint}`
    : `/api/settings${endpoint}`

  expect(global.fetch).toHaveBeenCalledWith(
    expectedUrl,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}