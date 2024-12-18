import React from 'react';
import {StatusBar} from 'react-native';

export const StatusBarWrapper = ({theme}) => (
	<StatusBar
		backgroundColor={theme.colors.surfaceContainerHigh}
		barStyle={theme.dark ? 'light-content' : 'dark-content'}
	/>
);
