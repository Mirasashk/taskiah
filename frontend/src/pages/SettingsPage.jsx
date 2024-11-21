import React from 'react';
import SettingsSideBar from '../components/layout/SettingsSideBar';
import { Outlet } from 'react-router-dom';

const SettingsPage = () => {
    return (
        <div className='flex'>
            <SettingsSideBar />
            <div className='flex-1 pl-6 pr-6'>
                <Outlet />
            </div>
        </div>
    );
};

export default SettingsPage;
