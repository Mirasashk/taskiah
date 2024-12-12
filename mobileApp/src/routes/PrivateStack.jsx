import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import DashboardScreen from '../screens/DashboardScreen';
import TasksScreen from '../screens/TasksScreen';
import {getHeaderTitle} from '@react-navigation/elements';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerMain from '../components/DrawerMain';
const Drawer = createDrawerNavigator();

const PrivateStack = () => {
	const theme = useTheme();

	return (
		<Drawer.Navigator
			drawerContent={DrawerMain}
			drawerStyle={{
				backgroundColor: theme.colors.surface,
			}}
			screenOptions={{
				header: ({navigation, route, options}) => {
					const title = getHeaderTitle(options, route.name);

					return (
						<Header
							title={title}
							style={options.headerStyle}
							openDrawer={navigation.openDrawer}
						/>
					);
				},
				drawerLabelStyle: {
					color: theme.colors.onSurface,
					fontSize: 16,
					fontFamily: 'Georgia',
				},
				drawerType: 'slide',
				drawerStyle: {
					backgroundColor: theme.colors.surface,
					width: '60%',
				},
				drawerActiveTintColor: theme.colors.primary,
				drawerItemStyle: {
					backgroundColor: theme.colors.surface,
					icon: {
						color: theme.colors.primary,
					},
				},
			}}>
			<Drawer.Screen
				name="Dashboard"
				options={{
					drawerLabel: 'Dashboard',
					drawerIcon: ({color, size}) => (
						<Icon
							name="home"
							color={theme.colors.onSurface}
							size={size}
						/>
					),
				}}
				component={DashboardScreen}
			/>
			<Drawer.Screen
				name="TasksScreen"
				options={{
					drawerLabel: 'Tasks',
					drawerIcon: ({color, size}) => (
						<Icon
							name="clipboard-edit-outline"
							color={theme.colors.onSurface}
							size={size}
						/>
					),
				}}
				component={TasksScreen}
			/>
		</Drawer.Navigator>
	);
};

export default PrivateStack;
