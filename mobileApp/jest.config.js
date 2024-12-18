module.exports = {
	preset: 'react-native',
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?react-native|@react-native(-community)?)|react-native-paper|@react-native-community/cli-platform-android|@react-native-community/cli-platform-ios',
	],
};
