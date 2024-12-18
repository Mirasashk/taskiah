import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import ScrollableRefresh from '../components/ScrollableRefresh';

const ExampleListScreen: React.FC = () => {
	const [data, setData] = React.useState<string[]>([
		'Item 1',
		'Item 2',
		'Item 3',
	]);

	const handleRefresh = async () => {
		// Refresh your data here
		await new Promise(resolve => setTimeout(resolve, 1000));
		setData(['Refreshed Item 1', 'Refreshed Item 2', 'Refreshed Item 3']);
	};

	return (
		<ScrollableRefresh onRefresh={handleRefresh}>
			<FlatList
				data={data}
				renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
				keyExtractor={item => item}
			/>
		</ScrollableRefresh>
	);
};

const styles = StyleSheet.create({
	item: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
});

export default ExampleListScreen;
