import {useContext} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import userService from '../services/userApi';
import {getUniqueId} from 'react-native-device-info';
import {useAuth} from '../context/AuthContext';

// Initialize RNBiometrics
const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true});

/**
 * Custom hook to handle biometric logic
 * @returns {Object} Biometric state and handlers
 * @param {Object} setupBiometric - Biometric setup function
 * @param {Object} getAvaialableBiometric - Biometric available function
 * @param {Object} createBiometric - Biometric create function
 * @param {Object} biometricKeysExist - Biometric keys exist function
 * @param {Object} deleteBiometric - Biometric delete function
 * @param {Object} createSignature - Biometric signature create function
 * @param {Object} simplePrompt - Biometric simple prompt function
 */
export const useBiometric = () => {
  const {loginWithBiometric, setLoading} = useAuth();

  let payload;

  const handleBiometric = async (result, userId) => {
    payload = await userService.getBioChallenge();
    if (result && payload) {
      const token = await createSignature();
      loginWithBiometric(token);
    } else {
      await createBiometricPrompt().then(result => {
        if (result) {
          createBiometric(userId);
        }
      });
    }
  };

  const getAvaialableBiometric = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      return {available, biometryType};
    } catch (error) {
      console.error('Biometric sensor check failed:', error);
      return false;
    }
  };

  const createBiometric = async userId => {
    const deviceId = await getUniqueId();

    return rnBiometrics
      .createKeys()
      .then(async resultObject => {
        const {publicKey} = resultObject;
        await userService.sendPublicKeyToServer(publicKey, userId, deviceId);
      })
      .catch(() => {
        console.log('could not create keys');
      });
  };

  const biometricKeysExist = async () => {
    return rnBiometrics
      .biometricKeysExist()
      .then(resultObject => {
        const {keysExist} = resultObject;
        if (keysExist) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        console.log('could not check for keys');
        return false;
      });
  };

  const deleteBiometric = async () => {
    return rnBiometrics
      .deleteKeys()
      .then(resultObject => {
        const {keysDeleted} = resultObject;

        if (keysDeleted) {
          console.log('Successful deletion');
        } else {
          console.log(
            'Unsuccessful deletion because there were no keys to delete',
          );
        }
      })
      .catch(() => {
        console.log('deletion failed');
      });
  };

  const createSignature = async () => {
    const deviceId = await getUniqueId();
    const result = await rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload.challenge,
      })
      .then(async resultObject => {
        const {success, signature} = resultObject;
        if (success) {
          return await userService.verifySignatureWithServer(
            signature,
            payload.challenge,
            deviceId,
          );
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });

    return result.token;
  };

  const createBiometricPrompt = async () => {
    return rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint to setup'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
          return true;
        } else {
          console.log('user cancelled biometric prompt');
          return false;
        }
      })
      .catch(() => {
        console.log('biometrics failed');
        return false;
      });
  };

  const simplePrompt = async () => {
    return rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  return {
    handleBiometric,
    getAvaialableBiometric,
    createBiometric,
    biometricKeysExist,
    deleteBiometric,
    createSignature,
    createBiometricPrompt,
    simplePrompt,
  };
};
