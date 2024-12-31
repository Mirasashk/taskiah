import React, { useState } from 'react';
import SideBarItem from './SideBarItem';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const SideBarGroup = ({ title, icon, items, children }) => {
	const [showProjects, setShowProjects] = useState(false);

	return (
		<div>
			<div
				className='flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
				onClick={() => setShowProjects(!showProjects)}
			>
				{showProjects ? <FiChevronDown /> : <FiChevronRight />}
				<h3 className='text-md font-normal text-gray-700 dark:text-gray-200'>
					{title}
				</h3>
				{icon}
			</div>
			{showProjects && (
				<div className='flex justify-end'>
					<div className='w-11/12'>
						{items.map((item) => {
							return <SideBarItem item={item} />;
						})}
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

export default SideBarGroup;
