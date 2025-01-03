import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { ListProvider } from './context/ListContext';
function App() {
	return (
		<AuthProvider>
			<UserProvider>
				<ThemeProvider>
					<ListProvider>
						<TaskProvider>
							<NotificationProvider>
								<BrowserRouter
									future={{
										v7_startTransition: true,
										v7_relativeSplatPath: true,
									}}
								>
									<AppRoutes />
								</BrowserRouter>
							</NotificationProvider>
						</TaskProvider>
					</ListProvider>
				</ThemeProvider>
			</UserProvider>
		</AuthProvider>
	);
}

export default App;
