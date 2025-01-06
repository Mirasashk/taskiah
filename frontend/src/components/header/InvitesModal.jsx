import React from 'react';
import Modal from '../common/Modal';
import { listService } from '../../services/listApi';
import { useNotificationContext } from '../../context/NotificationContext';

const InvitesModal = ({
	setShowInviteModal,
	showInviteModal,
	sharedListNotifications,
	userData,
}) => {
	const { refreshContext } = useNotificationContext();
	const handleAcceptInvite = async (invite, e) => {
		e.stopPropagation();
		await listService.acceptSharedListInvite(invite, userData.id);
		refreshContext();
		setShowInviteModal(false);
	};

	const handleRejectInvite = async (id, e) => {
		e.stopPropagation();
		await listService.rejectSharedListInvite(id);
		refreshContext();
		setShowInviteModal(false);
	};

	return (
		<Modal
			title='Invites'
			onClose={() => setShowInviteModal(false)}
			isOpen={showInviteModal}
		>
			<div
				className='flex flex-col gap-2'
				onClick={(e) => e.stopPropagation()}
			>
				{sharedListNotifications.map((invite) => (
					<div
						key={invite.id}
						className='flex flex-col gap-2 dark:bg-gray-700 bg-gray-100 p-4 rounded-md'
						onClick={(e) => e.stopPropagation()}
					>
						<div>{invite.message}</div>
						<div>{invite.createdAt}</div>
						<div className='flex justify-center gap-2'>
							<button
								className='bg-blue-500 text-white p-2 rounded-md w-1/3'
								onClick={(e) => handleAcceptInvite(invite, e)}
							>
								Accept
							</button>
							<button
								className='bg-red-600 text-white p-2 rounded-md w-1/3'
								onClick={(e) =>
									handleRejectInvite(invite.id, e)
								}
							>
								Reject
							</button>
						</div>
					</div>
				))}
			</div>
		</Modal>
	);
};

export default InvitesModal;
