/**
 * Default screen options for the Task Navigator
 * @param {import('react-native-paper').Theme} theme - The current theme object
 * @returns {import('@react-navigation/native-stack').NativeStackNavigationOptions} Navigation options
 */
export const getDefaultScreenOptions = theme => ({
  headerShown: false,
  contentStyle: {
    backgroundColor: theme.colors.surfaceContainerHigh,
  },
});
