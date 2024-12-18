import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('../config/firebase', () => ({}));

describe('App', () => {
	it('renders without crashing', () => {
		render(<App />);
	});
});
