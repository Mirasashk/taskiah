import {validatePassword, validateEmail} from '../validation';

describe('Validation Utils', () => {
  describe('validatePassword', () => {
    it('should return true for valid passwords', () => {
      expect(validatePassword('Password123')).toBe(true);
      expect(validatePassword('SecurePass1')).toBe(true);
    });

    it('should return false for passwords without uppercase letters', () => {
      expect(validatePassword('password123')).toBe(false);
    });

    it('should return false for passwords without lowercase letters', () => {
      expect(validatePassword('PASSWORD123')).toBe(false);
    });

    it('should return false for passwords without numbers', () => {
      expect(validatePassword('PasswordTest')).toBe(false);
    });

    it('should return false for passwords shorter than 8 characters', () => {
      expect(validatePassword('Pass1')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('test@domain')).toBe(false);
    });
  });
});
