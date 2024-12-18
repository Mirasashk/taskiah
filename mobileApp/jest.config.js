module.exports = {
	preset: 'react-native',
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?react-native|@react-native(-community)?)|react-native-paper|@react-native-community/cli-platform-android|@react-native-community/cli-platform-ios',
	],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/jest/',
		'jest/setupApiMocks.js',
	],
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
		'!src/**/*.test.{js,jsx}',
		'!src/assets/**',
		'!src/**/__tests__/**',
		'!**/node_modules/**',
	],
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
