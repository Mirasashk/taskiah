import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PullToRefresh from '../components/PullToRefresh';

const ExampleScreen: React.FC = () => {
	const handleRefresh = async () => {
		// Add your refresh logic here
		// For example: refetch data, update state, etc.
		await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
	};

	return (
		<PullToRefresh onRefresh={handleRefresh}>
			<View style={styles.container}>
				<Text>Pull down to refresh this screen!</Text>
			</View>
		</PullToRefresh>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ExampleScreen;
