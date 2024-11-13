import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import AppRoutes from './routes';

function App() {
    return (
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
    );
}

export default App;
