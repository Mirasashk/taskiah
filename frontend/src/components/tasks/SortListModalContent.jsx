import { useState } from 'react';
import { Field, Label, Radio, RadioGroup, Switch } from '@headlessui/react';
const SortListModalContent = ({
	sortKey,
	setSortKey,
	sortDirection,
	setSortDirection,
	options,
}) => {
	return (
		<div className='w-48'>
			<div className='flex flex-col justify-start items-start gap-2'>
				<RadioGroup
					value={sortKey}
					onChange={setSortKey}
					aria-label='Server size'
				>
					<div className='flex flex-col justify-start	 items-start gap-4'>
						{options.map((option) => (
							<Field
								key={option.value}
								className='flex items-center gap-2'
							>
								<Radio
									value={option.value}
									className='group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400'
								>
									<span className='invisible size-2 rounded-full bg-white group-data-[checked]:visible' />
								</Radio>
								<Label>{option.label}</Label>
							</Field>
						))}
					</div>
				</RadioGroup>
				<div className='flex w-full justify-between items-center gap-8 mt-4'>
					<label className='text-md text-gray-500 dark:text-gray-400'>
						Ascending
					</label>
					<Switch
						checked={sortDirection}
						onChange={setSortDirection}
						className='group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600 dark:bg-gray-700 dark:data-[checked]:bg-blue-600'
					>
						<span className='size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6' />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default SortListModalContent;
