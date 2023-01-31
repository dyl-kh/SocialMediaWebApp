import React from 'react';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import customRender from '../../test-utils';
import ProfileRow from './ProfileRow';

describe('ProfileRow', () => {
    it('should disable button if field empty', () => {
        const wrapper = customRender(
            <Router>
                <ProfileRow
                    label="name"
                    placeholder="Dylan"
                    type="text"
                    canEdit
                    userValueType="fullName"
                />
            </Router>
        );

        // get input field
        const rowInput = wrapper.container.querySelector("[type='text']");

        // get button
        const button = wrapper.container.querySelector("[type='submit']");

        fireEvent.change(rowInput, { target: { value: '' } });
        fireEvent.blur(rowInput);
        fireEvent.blur(button);

        // check if button is disabled
        expect(button).toBeDisabled();
    });
});
