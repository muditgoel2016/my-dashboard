import { NextRequest } from 'next/server'

import * as formValidationUtil from '@/app/services/otherServices/formValidationUtil'
import * as settingsHandlerService from '@/services/endpointHandlerServices/settings/settingsHandlerService'

import { GET, POST, PUT } from './route'

jest.mock('@/services/endpointHandlerServices/settings/settingsHandlerService')
jest.mock('@/app/services/otherServices/formValidationUtil')

interface FormField {
  label: string;
  defaultValue: string;
  type: 'text' | 'email' | 'password' | 'date';
  name: keyof FormFieldNames;
}

interface FormFieldNames {
  yourName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ProfileImage {
  type: 'image';
  defaultValue: string;
  label: string;
}

interface SettingsData {
  profileImage?: ProfileImage;
  formFields: FormField[];
}

describe('Settings API Route', () => {
  const mockRequest = new NextRequest(new Request('http://localhost:3000/api/settings'))
  
  const mockSettingsData: SettingsData = {
    profileImage: {
      type: 'image',
      defaultValue: '/default-profile.png',
      label: 'Profile Picture'
    },
    formFields: [
      {
        label: 'Your Name',
        defaultValue: 'John Doe',
        type: 'text',
        name: 'yourName'
      },
      {
        label: 'Email',
        defaultValue: 'john.doe@example.com',
        type: 'email',
        name: 'email'
      }
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET Method', () => {
    it('should return settings data with correct status and headers on successful request', async () => {
      jest.spyOn(settingsHandlerService, 'getSettingsData')
          .mockResolvedValue(mockSettingsData)

      const response = await GET(mockRequest)
      const data = await response.json()

      expect(data).toEqual(mockSettingsData)
      expect(response.status).toBe(200)
      expect(response.headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=30')
    })

    it('should return 404 when settings data source is not found', async () => {
      jest.spyOn(settingsHandlerService, 'getSettingsData')
          .mockRejectedValue(new Error('Settings data source not found'))

      const response = await GET(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data).toEqual({ error: 'Settings data source not found' })
    })

    it('should return 500 for general errors', async () => {
      jest.spyOn(settingsHandlerService, 'getSettingsData')
          .mockRejectedValue(new Error('Unknown error'))

      const response = await GET(mockRequest)
      expect(response.status).toBe(500)
    })
  })

  describe('POST Method', () => {
    const mockFormData = new FormData()
    mockFormData.append('yourName', 'John Doe')
    mockFormData.append('email', 'john.doe@example.com')

    it('should successfully update settings with valid data', async () => {
      jest.spyOn(settingsHandlerService, 'getSettingsData')
          .mockResolvedValue(mockSettingsData)
      jest.spyOn(settingsHandlerService, 'updateSettingsData')
          .mockResolvedValue({ success: true })
      jest.spyOn(formValidationUtil, 'validateFieldExternal')
          .mockReturnValue(null)

      const request = new NextRequest(
        new Request('http://localhost:3000/api/settings', {
          method: 'POST',
          body: mockFormData
        })
      )

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should reject invalid file types', async () => {
      const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' })
      const formData = new FormData()
      formData.append('profileImage', invalidFile)

      const request = new NextRequest(
        new Request('http://localhost:3000/api/settings', {
          method: 'POST',
          body: formData
        })
      )

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid file type')
    })

    it('should validate form fields and return errors for invalid data', async () => {
      jest.spyOn(settingsHandlerService, 'getSettingsData')
          .mockResolvedValue(mockSettingsData)
      jest.spyOn(formValidationUtil, 'validateFieldExternal')
          .mockReturnValue('Invalid field')

      const request = new NextRequest(
        new Request('http://localhost:3000/api/settings', {
          method: 'POST',
          body: mockFormData
        })
      )

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.errors).toBeDefined()
    })
  })

  describe('PUT Method', () => {
    it('should validate a single field successfully', async () => {
      jest.spyOn(formValidationUtil, 'validateFieldExternal')
          .mockReturnValue(null)

      const request = new NextRequest(
        new Request('http://localhost:3000/api/settings', {
          method: 'PUT',
          body: JSON.stringify({
            field: 'email',
            value: 'valid@email.com'
          })
        })
      )

      const response = await PUT(request)
      const data = await response.json()

      expect(data.isValid).toBe(true)
      expect(data.field).toBe('email')
    })

    it('should return validation errors for invalid fields', async () => {
      jest.spyOn(formValidationUtil, 'validateFieldExternal')
          .mockReturnValue('Invalid email format')

      const request = new NextRequest(
        new Request('http://localhost:3000/api/settings', {
          method: 'PUT',
          body: JSON.stringify({
            field: 'email',
            value: 'invalid-email'
          })
        })
      )

      const response = await PUT(request)
      const data = await response.json()

      expect(data.isValid).toBe(false)
      expect(data.error).toBe('Invalid email format')
    })
  })
})