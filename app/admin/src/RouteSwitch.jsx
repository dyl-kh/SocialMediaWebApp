/* eslint-disable react/prop-types */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import FlaggedPosts from './components/pages/FlaggedPosts';
import HarrassmentPosts from './components/pages/HarrassmentPosts';
import UserList from './components/pages/UserList';

// router component that handles all routing
const RouteSwitch = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/flagged-posts" element={<FlaggedPosts />} />
            <Route
                path="/potential-harrassment"
                element={<HarrassmentPosts />}
            />
        </Routes>
    );
};

export default RouteSwitch;
