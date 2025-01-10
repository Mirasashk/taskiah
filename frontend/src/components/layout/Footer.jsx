import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskiahLogo from '../../assets/TaskiahLogo';
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
const Footer = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { theme } = useTheme();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Replace this with your actual email sending logic
			console.log(formData);

			// Clear form
			setFormData({ name: '', email: '', message: '' });
			toast.success('Message sent successfully!');
		} catch (error) {
			console.error('Failed to send message:', error);
			toast.error('Failed to send message. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<footer className='dark:bg-gray-800 dark:text-gray-300 bg-white text-gray-800 pb-2'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 px-4'>
					{/* Company Info */}
					<div>
						<div className='flex col-span-1 justify-center items-start'>
							<Link
								to='/'
								className='flex items-center'
							>
								<TaskiahLogo className='w-60 h-2024 text-gray-800 dark:text-white' />
							</Link>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-white font-semibold mb-4'>
							Quick Links
						</h3>
						<ul className='space-y-2'>
							<li>
								<Link
									to='/'
									className='hover:text-white'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to='/about'
									className='hover:text-white'
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to='/contact'
									className='hover:text-white'
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Form - replacing Contact Info */}
					<div>
						<h3 className='text-white font-semibold mb-4'>
							Contact Us
						</h3>
						<form
							onSubmit={handleSubmit}
							className='space-y-4'
						>
							<div>
								<input
									type='text'
									name='name'
									value={formData.name}
									onChange={handleChange}
									placeholder='Your Name'
									required
									className='w-full px-3 py-2 dark:bg-gray-700 bg-gray-200 rounded-lg
									text-gray-800 dark:text-white dark:placeholder-gray-200 placeholder-gray-800 
									focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>
							<div>
								<input
									type='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									placeholder='Your Email'
									required
									className='w-full px-3 py-2 dark:bg-gray-700 bg-gray-200 rounded-lg
											text-gray-800 dark:text-white dark:placeholder-gray-200 placeholder-gray-800 
											focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>
							<div>
								<textarea
									name='message'
									value={formData.message}
									onChange={handleChange}
									placeholder='Your Message'
									required
									rows='3'
									className='w-full px-3 py-2 dark:bg-gray-700 bg-gray-200 rounded-lg
									text-gray-800 dark:text-white dark:placeholder-gray-200 placeholder-gray-800 
									focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>
							</div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
							>
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</button>
						</form>
						<ToastContainer
							position='top-right'
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme={theme.mode === 'dark' ? 'dark' : 'light'}
						/>
					</div>
				</div>

				{/* Copyright */}
				<div className='border-t border-gray-700 mt-4 py-2 text-sm text-center'>
					© {new Date().getFullYear()} Taskiah LLC. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
