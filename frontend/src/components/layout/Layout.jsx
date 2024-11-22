import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
    return (
        <div className='min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white'>
            <div className='transition-all duration-200 ease-in'>
                <Header />
                <main className='container mx-auto px-4 py-8'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
