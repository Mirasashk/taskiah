import React, { useState, useEffect } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TasksSideBar from '../components/tasks/TasksSideBar';
import TaskDetailSideBar from '../components/tasks/TaskDetailSideBar';
import { useTaskContext } from '../context/TaskContext';
import Modal from '../components/common/Modal';

const TasksPage = () => {
	const [filteredTasks, setFilteredTasks] = useState();
	const { selectedTask, setSelectedTask, filter, updateTask } =
		useTaskContext();
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setSelectedTask();
	}, [filteredTasks]);

	useEffect(() => {
		setIsEditing(false);
	}, [filter]);

	const handleTaskSave = async (updatedTask) => {
		await updateTask(updatedTask.id, updatedTask);
		setSelectedTask(null);
	};

	const handleOnClose = () => {
		setSelectedTask(null);
		setIsEditing(false);
	};

	// Mobile Task Detail Modal
	const renderMobileTaskDetail = () => {
		if (!selectedTask) return null;

		return (
			<Modal
				isOpen={!!selectedTask}
				onClose={handleOnClose}
				closeButton={false}
				cardView={false}
				className='md:hidden'
			>
				<TaskDetailSideBar
					task={selectedTask}
					onClose={handleOnClose}
					onSave={handleTaskSave}
					isEditing={isEditing}
					onEdit={setIsEditing}
				/>
			</Modal>
		);
	};

	return (
		<div className='container mx-auto md:p-4'>
			<div className='flex flex-col'>
				{/* Mobile Horizontal Scrollable Sidebar */}
				<div className='md:hidden sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm mb-4'>
					<div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 py-4'>
						<div className='inline-flex space-x-4 px-4'>
							<TasksSideBar
								onFilterTasks={setFilteredTasks}
								isMobile={true}
							/>
						</div>
					</div>
				</div>

				<div className='flex px-4 md:px-0 flex-col md:flex-row'>
					{/* Desktop Sidebar */}
					<div className='hidden md:block md:flex-none md:w-64'>
						<h1 className='text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white'>
							My Tasks
						</h1>
						<TasksSideBar
							onFilterTasks={setFilteredTasks}
							isMobile={false}
						/>
					</div>

					{/* Main Content */}
					<div className='flex-1 md:pt-12 md:pl-6 md:pr-6'>
						<TaskForm />
						<div className='flex flex-col md:flex-row gap-4'>
							<div className='flex-1'>
								<TaskList
									filteredTasks={filteredTasks}
									setIsEditing={setIsEditing}
								/>
							</div>
							{/* Desktop Task Detail */}
							{selectedTask && (
								<div className='hidden md:block md:w-2/5'>
									<div className='container mx-auto'>
										<div className='sticky top-4'>
											<TaskDetailSideBar
												task={selectedTask}
												onClose={handleOnClose}
												onSave={handleTaskSave}
												isEditing={isEditing}
												onEdit={setIsEditing}
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* Mobile Task Detail Modal */}
			{renderMobileTaskDetail()}
		</div>
	);
};

export default TasksPage;
