import React from 'react';
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
	ViewStyle,
	NativeSyntheticEvent,
	NativeScrollEvent,
} from 'react-native';

interface PullToRefreshProps {
	children: React.ReactNode;
	onRefresh: () => Promise<void> | void;
	isEnabled?: boolean;
	style?: ViewStyle;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
	children,
	onRefresh,
	isEnabled = true,
	style,
}) => {
	const [refreshing, setRefreshing] = React.useState(false);
	const [scrollPosition, setScrollPosition] = React.useState(0);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		setScrollPosition(event.nativeEvent.contentOffset.y);
	};

	const handleRefresh = async () => {
		// Only allow refresh when scrolled to top (with a small threshold)
		if (scrollPosition > 1) {
			return;
		}

		setRefreshing(true);
		try {
			await onRefresh();
		} finally {
			setRefreshing(false);
		}
	};

	if (!isEnabled) {
		return <View style={[styles.container, style]}>{children}</View>;
	}

	return (
		<ScrollView
			style={[styles.container, style]}
			contentContainerStyle={styles.contentContainer}
			onScroll={handleScroll}
			scrollEventThrottle={16} // For smooth scroll position tracking
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={handleRefresh}
					enabled={scrollPosition <= 1} // Disable pull-to-refresh when not at top
				/>
			}>
			{children}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
});

export default PullToRefresh;
