import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker, { unregister } from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    // uri: 'http://localhost:4000/graphql',
    uri: 'https://postgap-api.opentargets.io/graphql',
});

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// Note: registerServiceWorker sets up browser caching for speed,
// which we want to avoid, since Netlify does this CDN caching for us
// registerServiceWorker();
unregister();
