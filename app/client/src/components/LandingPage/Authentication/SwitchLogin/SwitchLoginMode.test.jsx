import React from 'react';
import { screen } from '@testing-library/react';
import customRender from '../../../../test-utils';
import SwitchLoginMode from './SwitchLoginMode';

describe('SwitchLoginMode', () => {
    const mockToggleIsLogin = jest.fn();
    it('should display log in link if user is on sign up page', async () => {
        customRender(
            <SwitchLoginMode
                isLogin={false}
                toggleIsLogin={mockToggleIsLogin}
            />
        );
        const switchButton = await screen.findByText('Log in.');
        expect(switchButton).toBeInTheDocument();
    });
    it('should display sign up link if user is on log in page', async () => {
        customRender(
            <SwitchLoginMode isLogin toggleIsLogin={mockToggleIsLogin} />
        );
        const switchButton = await screen.findByText('Sign up');
        expect(switchButton).toBeInTheDocument();
    });
    it('should call toggleIsLogin when link is clicked', async () => {
        customRender(
            <SwitchLoginMode isLogin toggleIsLogin={mockToggleIsLogin} />
        );
        const switchButton = await screen.findByText('Sign up');
        switchButton.click();
        expect(mockToggleIsLogin).toHaveBeenCalled();
    });
});
