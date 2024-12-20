import React, {useState} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} ScrollableRefreshProps
 * @property {Function} onRefresh - Callback function to execute on refresh
 * @property {boolean} [isEnabled=true] - Whether the refresh control is enabled
 * @property {Object} [style] - Custom styles for the container
 * @property {React.ReactElement} children - Child component that supports refreshControl
 * @property {Object} [refreshControlProps] - Additional props for RefreshControl
 */

/**
 * A wrapper component that adds pull-to-refresh functionality to scrollable components
 * @param {ScrollableRefreshProps} props - Component props
 * @returns {React.ReactElement} ScrollableRefresh component
 */
const ScrollableRefresh = ({
  children,
  onRefresh,
  isEnabled = true,
  style,
  ...refreshControlProps
}) => {
  const [refreshing, setRefreshing] = useState(false);

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

ScrollableRefresh.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.element.isRequired,
};

export default ScrollableRefresh;
