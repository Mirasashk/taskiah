import {renderHook} from '@testing-library/react-hooks';
import {useSplashNavigation} from '../useSplashNavigation';
import {ROUTES, TIMING} from '../../config/constants';

describe('useSplashNavigation', () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigation.replace.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('navigates to Landing screen after delay', () => {
    renderHook(() => useSplashNavigation(mockNavigation));

    jest.advanceTimersByTime(TIMING.SPLASH_SCREEN_DELAY);

    expect(mockNavigation.replace).toHaveBeenCalledWith(ROUTES.LANDING);
  });

  it('cleans up timer on unmount', () => {
    const {unmount} = renderHook(() => useSplashNavigation(mockNavigation));

    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
