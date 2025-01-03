import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from '../forms/Input';
import { userService } from '../../services/userApi';
const UserInviteModal = ({ isOpen, onClose, emailSearch }) => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	// Update email and message when emailSearch changes
	useEffect(() => {
		if (emailSearch) {
			setEmail(emailSearch);
			setMessage(
				`Hi ${
					emailSearch.split('@')[0]
				}, I'm inviting you to join my list on Taskiah!`
			);
		}
	}, [emailSearch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ email, message });
		userService.inviteUser(email, message);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			center
		>
			<div className='flex flex-col gap-2'>
				<h2 className='text-2xl font-bold'>Invite User</h2>
				<Input
					type='text'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<textarea
					placeholder='Optional Message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='h-16 p-2 rounded-md border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white'
				/>

				<div className='flex justify-center pt-4'>
					<button
						className='bg-blue-600 text-white dark:hover:bg-blue-700 p-2 rounded-md w-1/2'
						onClick={handleSubmit}
					>
						Invite
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default UserInviteModal;
