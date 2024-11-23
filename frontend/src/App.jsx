import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <ThemeProvider>
                    <TaskProvider>
                        <BrowserRouter
                            future={{
                                v7_startTransition: true,
                                v7_relativeSplatPath: true,
                            }}
                        >
                            <AppRoutes />
                        </BrowserRouter>
                    </TaskProvider>
                </ThemeProvider>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
