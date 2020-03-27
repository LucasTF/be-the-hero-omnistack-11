import React, { Fragment } from 'react';

import Routes from './routes';

import { GlobalStyle } from './global';

const App = () => {
    return (
        <Fragment>
            <Routes />
            <GlobalStyle />
        </Fragment>
    );
};

export default App;
