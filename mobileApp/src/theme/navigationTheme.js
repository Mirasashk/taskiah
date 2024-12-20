/**
 * @param {import('react-native-paper').Theme} theme
 * @returns {Object} Navigation screen options
 */
export const getDefaultScreenOptions = theme => ({
  headerShown: false,
  contentStyle: {
    backgroundColor: theme.colors.surfaceContainerHigh,
  },
});
