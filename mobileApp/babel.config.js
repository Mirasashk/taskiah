module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: ['react-native-reanimated/plugin'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'module:react-native-dotenv'],
    },
  },
};
