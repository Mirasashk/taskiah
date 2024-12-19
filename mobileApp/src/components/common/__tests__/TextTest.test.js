import React from 'react';
import {render} from '@testing-library/react-native';
import TextTest from '../TextTest';

describe('Text Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<TextTest />);
    expect(getByText('Text')).toBeTruthy();
  });
});
