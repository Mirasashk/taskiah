/**
 * Validates a password string against the following criteria:
 * - At least 8 characters long
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 *
 * @param {string} password - The password string to validate
 * @returns {boolean} True if password meets all criteria, false otherwise
 */
export const validatePassword = password => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validates an email address string
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
