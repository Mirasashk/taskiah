import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <ThemeProvider>
                    <TodoProvider>
                        <BrowserRouter
                            future={{
                                v7_startTransition: true,
                                v7_relativeSplatPath: true,
                            }}
                        >
                            <AppRoutes />
                        </BrowserRouter>
                    </TodoProvider>
                </ThemeProvider>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
