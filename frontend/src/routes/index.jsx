import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import TodosPage from '../pages/TodosPage';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import NotesPage from '../pages/NotesPage';
import DashboardPage from '../pages/DashboardPage';
export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<LandingPage />} />
                <Route
                    path='/dashboard'
                    element={<DashboardPage />}
                />
                <Route path='/todos' element={<TodosPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/notes' element={<NotesPage />} />
            </Route>
        </Routes>
    );
}
