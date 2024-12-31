import React from 'react';
import { FiPlus } from 'react-icons/fi';
const AddNewBtn = ({ title }) => {
	return (
		<button className='flex items-center w-full px-3 py-2 gap-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'>
			<FiPlus />
			<span className='text-md font-normal'>Add New {title}</span>
		</button>
	);
};

export default AddNewBtn;
