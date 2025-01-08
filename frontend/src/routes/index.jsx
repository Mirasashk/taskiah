import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import TasksPage from '../pages/TasksPage';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import NotesPage from '../pages/NotesPage';
import DashboardPage from '../pages/DashboardPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/settingsPages/ProfilePage';
import ThemePreferencesPage from '../pages/settingsPages/ThemePreferencesPage';
import SecurityPage from '../pages/settingsPages/SecurityPage';
import SharedWithMePage from '../pages/settingsPages/SharedWithMePage';
import ListPreferencesPage from '../pages/settingsPages/ListPreferencesPage';
import NotificationsPage from '../pages/settingsPages/NotificationsPage';
import TaskPreferencesPage from '../pages/settingsPages/TaskPreferencesPage';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
	const { user } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	return (
		<Routes>
			<Route element={<Layout />}>
				{user && (
					<>
						<Route
							path='/'
							element={<DashboardPage />}
						/>
						<Route
							path='/settings'
							element={<SettingsPage />}
						>
							<Route
								path='/settings/profile'
								element={<ProfilePage />}
							/>
							<Route
								path='/settings/theme-preferences'
								element={<ThemePreferencesPage />}
							/>
							<Route
								path='/settings/security'
								element={<SecurityPage />}
							/>
							<Route
								path='/settings/shared-with-me'
								element={<SharedWithMePage />}
							/>
							<Route
								path='/settings/list-preferences'
								element={<ListPreferencesPage />}
							/>
							<Route
								path='/settings/notifications'
								element={<NotificationsPage />}
							/>
							<Route
								path='/settings/task-preferences'
								element={<TaskPreferencesPage />}
							/>
						</Route>
						<Route
							path='/tasks'
							element={<TasksPage />}
						/>
					</>
				)}
				{!user && (
					<>
						<Route
							path='/'
							element={<LandingPage />}
						/>
						<Route
							path='/login'
							element={<LoginPage />}
						/>
						<Route
							path='/signup'
							element={<SignupPage />}
						/>
						<Route
							path='/notes'
							element={<NotesPage />}
						/>
					</>
				)}
			</Route>
		</Routes>
	);
}
