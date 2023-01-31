import React from 'react';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import customRender from '../../../test-utils';
import ReplyInputField from './ReplyInputField';

describe('ReplyInputField', () => {
    it('should disable button if field over 125 characters', () => {
        const wrapper = customRender(
            <Router>
                <ReplyInputField
                    replyValue=""
                    setReplyValue={() => {}}
                    setImageURL={() => {}}
                    uploadingImage={false}
                />
            </Router>
        );

        // get input field
        const rowInput = wrapper.container.querySelector("[type='text']");

        // get button
        const button = wrapper.container.querySelector("[type='submit']");

        // input 126 times repeated character 'a'
        fireEvent.change(rowInput, { target: { value: 'a'.repeat(126) } });

        fireEvent.blur(rowInput);
        fireEvent.blur(button);

        // check if button is disabled
        expect(button).toBeDisabled();
    });
});
