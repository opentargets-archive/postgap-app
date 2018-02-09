import { createStore } from 'redux';

import rawData from './raw.json';

function transformEvidenceString(r) {
    return {
        efoId: r.disease.id,
        efoName: r.disease.name,
        gwasPValue: r.evidence.variant2disease.resource_score.value,
        gwasSampleSize: r.evidence.variant2disease.gwas_sample_size,
        gwasSnpId: r.evidence.variant2disease.lead_snp_rsid,
        r2: parseFloat(r.unique_association_fields.r2),
        ldSnpId: r.variant.id.split('/')[4],
        gtex: r.evidence.gene2variant.metadata.funcgen.gtex_score,
        pchic: r.evidence.gene2variant.metadata.funcgen.pchic_score,
        dhs: r.evidence.gene2variant.metadata.funcgen.dhs_score,
        fantom5: r.evidence.gene2variant.metadata.funcgen.fantom5_score,
        vep: r.evidence.gene2variant.metadata.funcgen.vep_score,
        otScore: r.evidence.gene2variant.metadata.funcgen.ot_g2v_score,
        geneName: r.target.target_name,
    }
}

// TODO: Subdivide state and reducers and async load
//       initialState url: https://mk-loci-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?chromosome=1&begin=109167885&end=109612066&size=10&datasource=gwas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID
const initialState = {
    chromosome: 1,
    location: {
        start: 109167885,
        end: 109612066,
    },
    rows: rawData.data.map(transformEvidenceString),
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
