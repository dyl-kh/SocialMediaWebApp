import React from 'react';
import { screen } from '@testing-library/react';
import render from './test-utils';
import App from './App';

it('renders learn react link', async () => {
    render(<App />);
    // screen.debug();
    const logo = await screen.findByText('LAN.');
    expect(logo).toBeInTheDocument();
});
