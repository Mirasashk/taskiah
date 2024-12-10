module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'module:react-native-dotenv'],
    },
  },
};
