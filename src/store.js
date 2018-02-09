import { createStore } from 'redux';

import rawData from './raw.json';

// TODO: Subdivide state and reducers and async load
//       initialState url: https://mk-loci-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?chromosome=1&begin=109167885&end=109612066&size=10&datasource=gwas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID
const initialState = {
    chromosome: 1,
    location: {
        start: 109167885,
        end: 109612066,
    },
    rows: rawData.data,
}

function reducer (state=initialState, action) {
    // TODO: Handle other action types
    switch (action.type) {
    default:
        return state;
    }
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
