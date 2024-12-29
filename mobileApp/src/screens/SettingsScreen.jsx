import React, {useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {
  List,
  Switch,
  Text,
  useTheme,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import {useTaskContext} from '../context/TaskContext';
import {startLocationOptions} from '../constants/settings';
import BiometricSetup from '../components/settings/BiometricSetup';
import ShareManagement from '../components/settings/ShareManagement';
import StartLocationPicker from '../components/settings/StartLocationPicker';
import {settingsStyles} from './styles/settingsStyles';

/**
 * Settings Screen Component for Taskiah app
 * Allows users to configure app preferences and manage sharing settings
 * @component
 * @returns {React.ReactElement} Settings screen UI
 */
const SettingsScreen = () => {
  const theme = useTheme();
  const styles = settingsStyles(theme);
  const {user, updateUserPreferences} = useAuth();
  const {sharedLists} = useTaskContext();

  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [biometricsEnabled, setBiometricsEnabled] = useState(
    user?.preferences?.biometricsEnabled || false,
  );

  const handleStartLocationChange = useCallback(
    location => {
      updateUserPreferences({
        ...user.preferences,
        startLocation: location,
      });
      setLocationPickerVisible(false);
    },
    [user?.preferences, updateUserPreferences],
  );

  const handleBiometricsToggle = useCallback(async () => {
    const newValue = !biometricsEnabled;
    setBiometricsEnabled(newValue);
    await updateUserPreferences({
      ...user.preferences,
      biometricsEnabled: newValue,
    });
  }, [biometricsEnabled, user?.preferences, updateUserPreferences]);

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>App Preferences</List.Subheader>

        <List.Item
          title="Start Location"
          description={
            startLocationOptions[
              user?.preferences?.startLocation || 'dashboard'
            ].label
          }
          left={props => <List.Icon {...props} icon="navigation" />}
          onPress={() => setLocationPickerVisible(true)}
        />

        <List.Item
          title="Biometric Authentication"
          description="Use fingerprint or face ID to secure the app"
          left={props => <List.Icon {...props} icon="fingerprint" />}
          right={() => (
            <Switch
              value={biometricsEnabled}
              onValueChange={handleBiometricsToggle}
            />
          )}
        />
      </List.Section>

      <ShareManagement sharedLists={sharedLists} />

      <Portal>
        <StartLocationPicker
          visible={locationPickerVisible}
          currentLocation={user?.preferences?.startLocation || 'dashboard'}
          onDismiss={() => setLocationPickerVisible(false)}
          onSelect={handleStartLocationChange}
        />
      </Portal>

      <BiometricSetup enabled={biometricsEnabled} onSetupComplete={() => {}} />
    </ScrollView>
  );
};

export default SettingsScreen;
