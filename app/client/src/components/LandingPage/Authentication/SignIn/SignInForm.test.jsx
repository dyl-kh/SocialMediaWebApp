import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import customRender from '../../../../test-utils';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
    it('should display email error message if incorrect email is provided', async () => {
        const wrapper = customRender(
            <Router>
                <SignInForm onOpen={() => {}} setUserEmail={() => {}} />
            </Router>
        );
        const emailInput = wrapper.container.querySelector("[type='email']");
        // enter asdf into email input (invalid email)
        fireEvent.change(emailInput, { target: { value: 'asdf' } });
        // dispatch blur event
        fireEvent.blur(emailInput);
        // screen.debug();

        const errorMessage = await screen.findByText(
            'Email is required and must be correctly formatted.'
        );

        expect(errorMessage).toBeInTheDocument();
    });
    it('should display password error message if no password is provided', async () => {
        const wrapper = customRender(
            <Router>
                <SignInForm onOpen={() => {}} setUserEmail={() => {}} />
            </Router>
        );
        const passwordInput =
            wrapper.container.querySelector("[type='password']");
        // dispatch blur event
        fireEvent.blur(passwordInput);
        // screen.debug();

        const errorMessage = await screen.findByText('Password is required.');

        expect(errorMessage).toBeInTheDocument();
    });
});
