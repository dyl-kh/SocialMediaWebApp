/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axi from './axios';
import Feed from './components/FeedPage/Feed';
import Profile from './components/ProfilePage/Profile';
import NavBar from './components/MISC/NavBar';
import LandingPage from './components/LandingPage/LandingPage';
import SessionContext from './state/sessionContext';
import Footer from './components/MISC/Footer';
import Users from './components/UsersPage/Users';
import User from './components/UserPage/User';
import PageViewRecorder from './PageViewRecorder';

// router component that handles all routing, only renders profile or feed pages if user is logged in
const RouteSwitch = () => {
    const { user, token, logout, login } = useContext(SessionContext);
    // console.log('user: ', user);

    useEffect(() => {
        const loginUser = async () => {
            try {
                // get userdata from /user using token as auth header
                const fetchedUser = await axi.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                login({
                    token,
                    user: fetchedUser.data,
                });
                // console.log(
                //     'Saving user data to context - fetchedUser.data: ',
                //     fetchedUser.data,
                //     token
                // );
            } catch (error) {
                // console.log('error: ', error);
                logout();
            }
        };

        if (typeof token === 'string') {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            } else {
                loginUser();
                // console.log(
                //     'Logged in user automatically as token existed in session context'
                // );
            }
        }
    }, [token]);

    if (user) {
        return (
            <BrowserRouter>
                <PageViewRecorder />
                <NavBar />
                <div style={{ minHeight: '60vh' }}>
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/users" element={<Users />} />
                        {/* For future individual user pages (instagram format) */}
                        <Route path="/user/:id" element={<User />} />
                        {/* redirect /user to /users */}
                        <Route path="/user" element={<Users />} />

                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
    );
};

export default RouteSwitch;
