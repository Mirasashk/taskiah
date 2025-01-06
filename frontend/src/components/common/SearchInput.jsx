import React, {
	useState,
	useCallback,
	forwardRef,
	useImperativeHandle,
} from 'react';
import debounce from 'lodash/debounce';
import Input from '../forms/Input';
import { userService } from '../../services/userApi';

const SearchInput = forwardRef(
	({ onSearchResults, setShowSearchResults }, ref) => {
		const [searchTerm, setSearchTerm] = useState('');
		const [isLoading, setIsLoading] = useState(false);

		// Expose clearSearch and searchTerm to parent component through ref
		useImperativeHandle(ref, () => ({
			clearSearch: () => {
				setSearchTerm('');
				onSearchResults([]);
			},
			getCurrentSearchTerm: () => searchTerm,
		}));

		const debouncedSearch = useCallback(
			debounce(async (searchValue) => {
				// Only search if there's a value and it contains @
				if (!searchValue.trim() || !searchValue.includes('@')) {
					onSearchResults([]);
					return;
				}

				setIsLoading(true);
				try {
					const response = await userService.searchUsers(searchValue);
					onSearchResults(response.data);
				} catch (error) {
					console.error('Error searching users:', error);
					onSearchResults([]);
				} finally {
					setIsLoading(false);
				}
			}, 500),
			[onSearchResults]
		);

		const handleSearch = (e) => {
			const value = e.target.value;
			setSearchTerm(value);

			// Only trigger search if the input contains @
			if (value.includes('@')) {
				debouncedSearch(value);
			} else {
				onSearchResults([]); // Clear results if @ is removed
				setShowSearchResults(false);
			}
		};

		return (
			<div>
				<Input
					type='email'
					placeholder='Search by email...'
					value={searchTerm}
					onChange={handleSearch}
				/>
				{isLoading && <span>Searching...</span>}
			</div>
		);
	}
);

export default SearchInput;
