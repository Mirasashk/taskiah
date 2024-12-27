import React, {useState, useCallback} from 'react';
import {RefreshControl, View, ScrollView, FlatList} from 'react-native';

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
 * @param {boolean} [props.isFlatList=false] - Whether the child is a FlatList
 * @returns {React.ReactElement} Rendered component
 */
const PullToRefresh = ({
  children,
  onRefresh,
  isEnabled = true,
  style,
  isFlatList = false,
}) => {
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

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      enabled={isEnabled && isScrollAtTop(scrollPosition)}
    />
  );

  if (!isEnabled) {
    return <View>{children}</View>;
  }

  // If the child is a FlatList, we'll clone it and add the refresh control
  if (isFlatList) {
    return React.cloneElement(children, {
      refreshControl: refreshControl,
      onScroll: handleScroll,
      scrollEventThrottle: 16,
    });
  }

  // Otherwise, wrap the children in a ScrollView
  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={refreshControl}>
      {children}
    </ScrollView>
  );
};

PullToRefresh.propTypes = {
  children: PropTypes.node.isRequired,
  onRefresh: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  style: PropTypes.object,
  isFlatList: PropTypes.bool,
};

export default PullToRefresh;
