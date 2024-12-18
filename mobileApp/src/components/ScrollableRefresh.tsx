import React from 'react';
import {
	RefreshControl,
	ScrollView,
	FlatList,
	ViewStyle,
	RefreshControlProps,
	StyleSheet,
	StyleProp,
} from 'react-native';

interface ScrollableRefreshProps extends Partial<RefreshControlProps> {
	onRefresh: () => Promise<void> | void;
	isEnabled?: boolean;
	style?: StyleProp<ViewStyle>;
	children: React.ReactElement<{
		refreshControl?: React.ReactElement;
		style?: StyleProp<ViewStyle>;
	}>;
}

const ScrollableRefresh: React.FC<ScrollableRefreshProps> = ({
	children,
	onRefresh,
	isEnabled = true,
	style,
	...refreshControlProps
}) => {
	const [refreshing, setRefreshing] = React.useState(false);

	const handleRefresh = async () => {
		setRefreshing(true);
		try {
			await onRefresh();
		} finally {
			setRefreshing(false);
		}
	};

	const refreshControl = (
		<RefreshControl
			refreshing={refreshing}
			onRefresh={handleRefresh}
			enabled={isEnabled}
			{...refreshControlProps}
		/>
	);

	return React.cloneElement(children, {
		refreshControl: isEnabled ? refreshControl : undefined,
		style: StyleSheet.compose(style || {}, children.props.style || {}),
	});
};

export default ScrollableRefresh;
