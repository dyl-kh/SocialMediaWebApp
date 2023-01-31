import React from 'react';
import RouteSwitch from './RouteSwitch';
import { SessionProvider } from './state/sessionContext';

const App = () => {
    return (
        <SessionProvider>
            <RouteSwitch />
        </SessionProvider>
    );
};

export default App;
