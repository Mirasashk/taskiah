import {renderHook, act} from '@testing-library/react-hooks';
import {useSignupForm} from '../useSignupForm';

describe('useSignupForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should initialize with empty form data and errors', () => {
    const {result} = renderHook(() => useSignupForm(mockOnSubmit));

    expect(result.current.formData).toEqual({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
    });

    expect(result.current.errors).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  });

  it('should update form data when handleChange is called', () => {
    const {result} = renderHook(() => useSignupForm(mockOnSubmit));

    act(() => {
      result.current.handleChange('firstName', 'John');
    });

    expect(result.current.formData.firstName).toBe('John');
  });

  it('should validate email field', () => {
    const {result} = renderHook(() => useSignupForm(mockOnSubmit));

    act(() => {
      result.current.handleChange('email', 'invalid-email');
    });

    expect(result.current.errors.email).toBeTruthy();

    act(() => {
      result.current.handleChange('email', 'valid@email.com');
    });

    expect(result.current.errors.email).toBe('');
  });

  it('should validate password field', () => {
    const {result} = renderHook(() => useSignupForm(mockOnSubmit));

    act(() => {
      result.current.handleChange('password', 'weak');
    });

    expect(result.current.errors.password).toBeTruthy();

    act(() => {
      result.current.handleChange('password', 'StrongPass123');
    });

    expect(result.current.errors.password).toBe('');
  });

  it('should validate matching passwords', () => {
    const {result} = renderHook(() => useSignupForm(mockOnSubmit));

    act(() => {
      result.current.handleChange('password', 'StrongPass123');
      result.current.handleChange('confirmPassword', 'DifferentPass123');
    });

    expect(result.current.errors.confirmPassword).toBeTruthy();

    act(() => {
      result.current.handleChange('confirmPassword', 'StrongPass123');
    });

    expect(result.current.errors.confirmPassword).toBe('');
  });
});
