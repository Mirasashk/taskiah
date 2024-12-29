import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Dialog, Portal, Button, Text} from 'react-native-paper';
import ReactNativeBiometrics from 'react-native-biometrics';
import PropTypes from 'prop-types';

/**
 * Component for handling biometric authentication setup
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.enabled - Whether biometric auth is enabled
 * @param {Function} props.onSetupComplete - Callback when setup is complete
 */
const BiometricSetup = ({enabled, onSetupComplete}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const {available} = await rnBiometrics.isSensorAvailable();
      setIsAvailable(available);
      if (enabled && available && !showDialog) {
        setShowDialog(true);
      }
    } catch (error) {
      console.error('Biometric check failed:', error);
    }
  };

  const handleBiometricSetup = async () => {
    try {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Confirm your identity',
      });

      if (success) {
        onSetupComplete(true);
      }
    } catch (error) {
      console.error('Biometric setup failed:', error);
    } finally {
      setShowDialog(false);
    }
  };

  if (!isAvailable || !enabled) return null;

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
        <Dialog.Title>Setup Biometric Authentication</Dialog.Title>
        <Dialog.Content>
          <Text>
            Would you like to set up biometric authentication for added
            security?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowDialog(false)}>Skip</Button>
          <Button onPress={handleBiometricSetup}>Setup</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

BiometricSetup.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onSetupComplete: PropTypes.func.isRequired,
};

export default BiometricSetup;
