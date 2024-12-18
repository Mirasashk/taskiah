module.exports = {
	presets: [
		'module:@react-native/babel-preset',
		'nativewind/babel',
		'@babel/preset-env',
	],
	plugins: [
		'react-native-reanimated/plugin',
		['@babel/plugin-transform-private-methods', {loose: true}],
		['@babel/plugin-transform-class-properties', {loose: true}],
		['@babel/plugin-transform-private-property-in-object', {loose: true}],
		['@babel/plugin-transform-runtime', {loose: true}],
		['@babel/plugin-transform-modules-commonjs', {loose: true}],
		['@babel/plugin-transform-react-jsx'],
	],
	env: {
		production: {
			plugins: [
				'react-native-paper/babel',
				'module:react-native-dotenv',
				'react-native-reanimated/plugin',
			],
		},
	},
};
