import { 
  validateEmail, 
  validatePassword, 
  validatePostalCode, 
  validateDateOfBirth,
  validateFieldExternal 
} from './formValidationUtil'

describe('Form Validation Utilities', () => {
  describe('Email Validation', () => {
    it('validates required email field', () => {
      expect(validateEmail('')).toBe('Email is required.')
    })

    it('accepts valid email formats', () => {
      expect(validateEmail('test@example.com')).toBe('')
      expect(validateEmail('user.name@domain.co.uk')).toBe('')
      expect(validateEmail('user+label@domain.com')).toBe('')
    })

    it('rejects invalid email formats', () => {
      expect(validateEmail('invalid')).toBe('Invalid email format.')
      expect(validateEmail('invalid@')).toBe('Invalid email format.')
      expect(validateEmail('@domain.com')).toBe('Invalid email format.')
      expect(validateEmail('invalid@domain')).toBe('Invalid email format.')
      expect(validateEmail('invalid @domain.com')).toBe('Invalid email format.')
    })
  })

  describe('Password Validation', () => {
    it('validates required password field', () => {
      expect(validatePassword('')).toBe('Password is required.')
    })

    it('enforces minimum password length', () => {
      expect(validatePassword('short')).toBe('Password must be at least 8 characters.')
      expect(validatePassword('12345678')).toBe('')
      expect(validatePassword('longpassword')).toBe('')
    })
  })

  describe('Postal Code Validation', () => {
    it('validates required postal code field', () => {
      expect(validatePostalCode('')).toBe('Postal code is required.')
    })

    it('enforces exactly 5 digits', () => {
      expect(validatePostalCode('1234')).toBe('Postal code must be 5 digits.')
      expect(validatePostalCode('123456')).toBe('Postal code must be 5 digits.')
      expect(validatePostalCode('12345')).toBe('')
      expect(validatePostalCode('abcde')).toBe('Postal code must be 5 digits.')
    })
  })

  describe('Date of Birth Validation', () => {
    it('validates required date of birth field', () => {
      expect(validateDateOfBirth('')).toBe('Date of Birth is required.')
    })

    it('prevents future dates', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      expect(validateDateOfBirth(futureDate.toISOString())).toBe('Date of Birth cannot be in the future.')
    })

    it('accepts valid past dates', () => {
      const pastDate = new Date()
      pastDate.setFullYear(pastDate.getFullYear() - 20)
      expect(validateDateOfBirth(pastDate.toISOString())).toBe('')
    })

    it('accepts today as valid date', () => {
      const today = new Date()
      expect(validateDateOfBirth(today.toISOString())).toBe('')
    })
  })

  describe('External Field Validation', () => {
    it('routes to correct validator based on field name', () => {
      expect(validateFieldExternal('email', 'invalid@')).toBe('Invalid email format.')
      expect(validateFieldExternal('password', 'short')).toBe('Password must be at least 8 characters.')
      expect(validateFieldExternal('postalCode', '1234')).toBe('Postal code must be 5 digits.')
      expect(validateFieldExternal('dateOfBirth', '')).toBe('Date of Birth is required.')
    })

    it('handles default required field validation', () => {
      expect(validateFieldExternal('yourName', '')).toBe('yourName is required.')
      expect(validateFieldExternal('yourName', 'John Doe')).toBe('')
    })

    it('validates each field type correctly', () => {
      const testCases = [
        { field: 'email', value: 'test@example.com', expected: '' },
        { field: 'password', value: 'securepassword', expected: '' },
        { field: 'postalCode', value: '12345', expected: '' },
        { field: 'customField', value: 'some value', expected: '' }
      ]

      testCases.forEach(({ field, value, expected }) => {
        expect(validateFieldExternal(field, value)).toBe(expected)
      })
    })
  })
})