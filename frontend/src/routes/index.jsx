import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import TodosPage from '../pages/TodosPage';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import NotesPage from '../pages/NotesPage';
import DashboardPage from '../pages/DashboardPage';
import SettingsPage from '../pages/SettingsPage';
import ProfilePage from '../pages/settingsPages/ProfilePage';
import PreferencesPage from '../pages/settingsPages/PreferencesPage';
import SecurityPage from '../pages/settingsPages/SecurityPage';
import SharedWithMePage from '../pages/settingsPages/SharedWithMePage';
import CollectionsPage from '../pages/settingsPages/CollectionsPage';
import NotificationsPage from '../pages/settingsPages/NotificationsPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/dashboard'
                    element={<DashboardPage />}
                />
                <Route path='/settings' element={<SettingsPage />}>
                    <Route
                        path='/settings/profile'
                        element={<ProfilePage />}
                    />
                    <Route
                        path='/settings/preferences'
                        element={<PreferencesPage />}
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
                        path='/settings/collections'
                        element={<CollectionsPage />}
                    />
                    <Route
                        path='/settings/notifications'
                        element={<NotificationsPage />}
                    />
                </Route>
                <Route path='/todos' element={<TodosPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/notes' element={<NotesPage />} />
            </Route>
        </Routes>
    );
}
