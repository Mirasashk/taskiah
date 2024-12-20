import React, {useState, useCallback} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {pullToRefreshStyles as styles} from '../../theme/components/pullToRefresh';
import {isScrollAtTop} from '../../utils/scroll';
import PropTypes from 'prop-types';

/**
 * A component that implements pull-to-refresh functionality
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered inside the scroll view
 * @param {Function} props.onRefresh - Callback function to execute on pull to refresh
 * @param {boolean} [props.isEnabled=true] - Whether pull to refresh is enabled
 * @param {Object} [props.style] - Additional styles for the container
 * @returns {React.ReactElement} Rendered component
 */
const PullToRefresh = ({children, onRefresh, isEnabled = true, style}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(event => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  }, []);

  const handleRefresh = useCallback(async () => {
    if (!isScrollAtTop(scrollPosition)) {
      return;
    }

    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [scrollPosition, onRefresh]);

  if (!isEnabled) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          enabled={isScrollAtTop(scrollPosition)}
        />
      }>
      {children}
    </ScrollView>
  );
};

PullToRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  style: PropTypes.object,
};

export default PullToRefresh;
