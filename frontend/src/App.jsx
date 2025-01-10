import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { ListProvider } from './context/ListContext';
import { LoadingProvider } from './context/LoadingContext';
import LoadingScreen from './components/common/LoadingScreen';
import { useLoading } from './context/LoadingContext';

function AppContent() {
	const { isLoading, error } = useLoading();

	if (isLoading || error) {
		return <LoadingScreen error={error} />;
	}

	return <AppRoutes />;
}

function App() {
	return (
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<AuthProvider>
				<UserProvider>
					<ThemeProvider>
						<ListProvider>
							<TaskProvider>
								<NotificationProvider>
									<LoadingProvider>
										<AppContent />
									</LoadingProvider>
								</NotificationProvider>
							</TaskProvider>
						</ListProvider>
					</ThemeProvider>
				</UserProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
