import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({
	isOpen,
	onClose,
	children,
	closeButton = true,
	title,
	className = '',
}) => {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className='fixed inset-0 z-30 flex items-center justify-center'
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-title'
		>
			{/* Backdrop */}
			<div
				className='fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity z-30'
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div
				className={`
					relative z-40 w-full max-w-md transform overflow-visible 
					bg-white dark:bg-gray-800 rounded-lg shadow-xl
					transition-all duration-300 ease-in-out
					p-6 m-4
					${className}
				`}
			>
				{/* Close Button */}
				{closeButton && (
					<button
						onClick={onClose}
						className='absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none'
						aria-label='Close modal'
					>
						<svg
							className='h-6 w-6'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path d='M6 18L18 6M6 6l12 12' />
						</svg>
					</button>
				)}

				{/* Modal Title */}
				{title && (
					<h2
						id='modal-title'
						className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'
					>
						{title}
					</h2>
				)}

				{/* Modal Content */}
				<div className='text-gray-600 dark:text-gray-300'>
					{children}
				</div>
			</div>
		</div>,
		document.body
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	className: PropTypes.string,
};

export default Modal;
