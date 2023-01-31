import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import customRender from '../../../../test-utils';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
    let emailInput;
    let passwordInput;
    beforeEach(() => {
        const wrapper = customRender(
            <Router>
                <SignUpForm onOpen={() => {}} setUserEmail={() => {}} />
            </Router>
        );
        emailInput = wrapper.container.querySelector("[type='email']");
        passwordInput = wrapper.container.querySelector("[type='password']");
    });

    it('should display email error message if incorrect email is provided', async () => {
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

    const incorrectlyFormattedPasswords = [
        'asdf',
        'asdfasdfasdf123',
        '^*&^%',
        '123512356312366123',
        'aaaaaaaaaaa(*&%&^%^%',
        'aaaaaaaaaaaAAAAAAAAA',
        'aaaaaaaaaaa*******11111',
    ];

    it.each(incorrectlyFormattedPasswords)(
        'should display password error message if password is incorrectly formatted',
        async password => {
            // enter asdf into email input (invalid email)
            fireEvent.change(passwordInput, { target: { value: password } });
            // dispatch blur event
            fireEvent.blur(passwordInput);

            const errorMessage = await screen.findByText(
                'Password must be 12 characters long and contain a number and a symbol.'
            );

            expect(errorMessage).toBeInTheDocument();
        }
    );

    it('should not display password error message if password is correctly formatted', async () => {
        const correctlyFormattedPassword = 'asdfasdfJKL:1234';

        // enter asdf into email input (invalid email)
        fireEvent.change(passwordInput, {
            target: { value: correctlyFormattedPassword },
        });
        // dispatch blur event
        fireEvent.blur(passwordInput);

        const errorMessage = await screen.queryByText(
            'Password must be 12 characters long and contain a number and a symbol.'
        );

        expect(errorMessage).not.toBeInTheDocument();
    });
});
