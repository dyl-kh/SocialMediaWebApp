import React from 'react';
// import { fireEvent } from '@testing-library/react';
import { Table } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import customRender from '../../test-utils';
import ProfileRow from './UserRow';

describe('ProfileRow', () => {
    it('should display unfollow on button if isFollowing is true', () => {
        const wrapper = customRender(
            <Router>
                <Table>
                    <tbody>
                        <ProfileRow
                            user={{ userId: '1', fullName: 'test' }}
                            isFollowing
                            updateFollowing={() => {}}
                        />
                    </tbody>
                </Table>
            </Router>
        );

        const button = wrapper.container.querySelector("[type='submit']");
        expect(button).toHaveTextContent('Unfollow');
    });
    it('should display follow on button if isFollowing is false', () => {
        const wrapper = customRender(
            <Router>
                <Table>
                    <tbody>
                        <ProfileRow
                            user={{ userId: '1', fullName: 'test' }}
                            isFollowing={false}
                            updateFollowing={() => {}}
                        />
                    </tbody>
                </Table>
            </Router>
        );

        const button = wrapper.container.querySelector("[type='submit']");
        expect(button).toHaveTextContent('Follow');
    });
});
