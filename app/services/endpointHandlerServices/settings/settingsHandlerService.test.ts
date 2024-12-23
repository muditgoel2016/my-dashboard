import fs from 'fs/promises'
import path from 'path'

import { getSettingsData, updateSettingsData } from './settingsHandlerService'

jest.mock('fs/promises')
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: (...args: string[]) => args.join('/')
}))

describe('Settings Handler Service', () => {
  const mockSettingsData = {
    profileImage: {
      type: 'image' as const,
      defaultValue: '/uploads/default-profile.jpg',
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
        label: 'Email',
        defaultValue: 'john@example.com',
        type: 'email' as const,
        name: 'email'
      }
    ]
  }

  beforeEach(() => {
    jest.resetAllMocks()
    ;(fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockSettingsData))
  })

  describe('getSettingsData', () => {
    it('successfully retrieves and parses settings data', async () => {
      const result = await getSettingsData()
      
      expect(result).toEqual(mockSettingsData)
      expect(fs.readFile).toHaveBeenCalledWith(
        expect.stringContaining('data/settings.json'),
        'utf8'
      )
    })

    it('handles missing settings file appropriately', async () => {
      const error = new Error('File not found')
      ;(error as NodeJS.ErrnoException).code = 'ENOENT'
      ;(fs.readFile as jest.Mock).mockRejectedValue(error)

      await expect(getSettingsData()).rejects.toThrow('Settings data source not found')
    })

    it('handles JSON parsing errors correctly', async () => {
      ;(fs.readFile as jest.Mock).mockResolvedValue('invalid json')

      await expect(getSettingsData()).rejects.toThrow('Failed to parse settings data source')
    })

    it('handles general read errors appropriately', async () => {
      ;(fs.readFile as jest.Mock).mockRejectedValue(new Error('Unknown error'))

      await expect(getSettingsData()).rejects.toThrow('Failed to read settings data source')
    })
  })

  describe('updateSettingsData', () => {
    const mockFormFields = {
      yourName: 'Jane Doe',
      email: 'jane@example.com'
    }

    beforeEach(() => {
      ;(fs.writeFile as jest.Mock).mockResolvedValue(undefined)
      ;(fs.access as jest.Mock).mockResolvedValue(undefined)
      ;(fs.mkdir as jest.Mock).mockResolvedValue(undefined)
    })

    it('successfully updates form fields without profile image', async () => {
      const result = await updateSettingsData(mockFormFields)

      expect(result.formFields).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'yourName', defaultValue: 'Jane Doe' }),
          expect.objectContaining({ name: 'email', defaultValue: 'jane@example.com' })
        ])
      )
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('data/settings.json'),
        expect.any(String),
        'utf8'
      )
    })

    it('handles profile image upload correctly', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      const arrayBuffer = new ArrayBuffer(4)
      jest.spyOn(mockFile, 'arrayBuffer').mockResolvedValue(arrayBuffer)

      await updateSettingsData(mockFormFields, mockFile)

      expect(fs.access).toHaveBeenCalledWith(expect.stringContaining('public/uploads'))
      expect(fs.writeFile).toHaveBeenCalledTimes(2) // One for image, one for settings
      expect(fs.writeFile).toHaveBeenCalledWith(
        expect.stringMatching(/uploads\/profile-\d+\.jpg$/),
        expect.any(Buffer)
      )
    })

    it('creates uploads directory if it does not exist', async () => {
      ;(fs.access as jest.Mock).mockRejectedValue(new Error('Directory not found'))
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      jest.spyOn(mockFile, 'arrayBuffer').mockResolvedValue(new ArrayBuffer(4))

      await updateSettingsData(mockFormFields, mockFile)

      expect(fs.mkdir).toHaveBeenCalledWith(
        expect.stringContaining('public/uploads'),
        { recursive: true }
      )
    })

    it('preserves existing field values when partial update is provided', async () => {
      const partialUpdate = { yourName: 'Jane Doe' }

      const result = await updateSettingsData(partialUpdate)

      result.formFields.forEach(field => {
        if (field.name === 'yourName') {
          expect(field.defaultValue).toBe('Jane Doe')
        } else {
          expect(field.defaultValue).toBe(mockSettingsData.formFields.find(
            f => f.name === field.name
          ).defaultValue)
        }
      })
    })

    it('handles file operation errors appropriately', async () => {
      ;(fs.writeFile as jest.Mock).mockRejectedValue(new Error('Write failed'))

      await expect(updateSettingsData(mockFormFields))
        .rejects
        .toThrow('Failed to update settings data')
    })
  })
})