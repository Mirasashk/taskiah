import React from 'react';
import SettingsSideBar from '../components/layout/SettingsSideBar';
import { Outlet } from 'react-router-dom';

const SettingsPage = () => {
	return (
		<div className='flex flex-col md:flex-row'>
			<SettingsSideBar />
			<div className='flex-1 md:pl-6 md:pr-6 mt-4 md:mt-0'>
				<Outlet />
			</div>
		</div>
	);
};

export default SettingsPage;
