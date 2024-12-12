import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Avatar, IconButton} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

const StatsCard = ({title, subtitle, icon}) => {
	const theme = useTheme();

	const styles = StyleSheet.create({
		container: {},
		card: {
			backgroundColor: theme.colors.surfaceContainerLow,
			borderRadius: 40,
		},
	});

	return (
		<View style={styles.container}>
			<Card mode="contained" elevation={1} style={styles.card}>
				<Card.Title
					title={title}
					subtitle={subtitle}
					left={props => (
						<Avatar.Icon
							{...props}
							size={48}
							icon={icon}
							style={{
								backgroundColor:
									theme.colors.surfaceContainerLow,
							}}
						/>
					)}
					right={props => (
						<IconButton
							{...props}
							icon="chevron-right"
							size={24}
							color={theme.colors.onSurface}
						/>
					)}
				/>
			</Card>
		</View>
	);
};

export default StatsCard;
