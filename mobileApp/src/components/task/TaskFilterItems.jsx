import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon, List, useTheme} from 'react-native-paper';

const TaskFilterItems = ({count, title, icon, onPress, color}) => {
	const theme = useTheme();

	const handlePress = () => {
		onPress();
	};

	const renderIconOrColor = () => {
		if (color) {
			return (
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<View
						style={{
							width: 12,
							height: 12,
							borderRadius: 100,
							alignItems: 'center',
							justifyContent: 'center',
							backgroundColor: color,

							marginLeft: 10,
						}}
					/>
				</View>
			);
		}
		return <Icon source={icon} size={24} />;
	};

	return (
		<View
			style={{
				paddingLeft: 10,
				borderRadius: 20,
			}}>
			<TouchableOpacity onPress={handlePress}>
				<List.Item
					title={title}
					titleStyle={{color: theme.colors.onSurface}}
					left={() => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							{renderIconOrColor()}
						</View>
					)}
					right={() => (
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 20,
							}}>
							<Text style={{color: theme.colors.onSurface}}>
								{count}
							</Text>
							{color && <Icon source="trash-can" size={24} />}
						</View>
					)}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default TaskFilterItems;
