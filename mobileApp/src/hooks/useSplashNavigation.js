import {useEffect} from 'react';
import {ROUTES, TIMING} from '../config/constants';

/**
 * Custom hook to handle splash screen navigation logic
 * @param {Object} navigation - Navigation object provided by React Navigation
 */
export const useSplashNavigation = navigation => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.LANDING);
    }, TIMING.SPLASH_SCREEN_DELAY);

    return () => clearTimeout(timer);
  }, [navigation]);
};
