import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<Link
			to='/'
			className='font-bold text-xl text-gray-900 dark:text-white'
		>
			Taskiah
		</Link>
	);
};

export default Logo;
