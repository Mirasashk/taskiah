import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import TodosPage from '../pages/TodosPage';
import Layout from '../components/layout/Layout';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<LandingPage />} />
                <Route path='/todos' element={<TodosPage />} />
            </Route>
        </Routes>
    );
}
