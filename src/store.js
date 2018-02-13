import { createStore } from 'redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

import rawData from './raw.json';
import rawEnsemblData from './rawEnsembl.json';

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

function transformEnsemblGene(d) {
    const {
        id, display_name, description,
        start, end, strand, seq_region_name,
        biotype, Transcript
    } = d;
    let canonicalTranscript = Transcript.filter(t => (t.is_canonical === 1))
        .map(t => {
            const { id, start, end, Exon, Translation } = t;
            const exons = Exon.map(ex => ({
                id: ex.id,
                start: ex.start,
                end: ex.end,
            }));
            const translation = Translation ? {
                translationStart: Translation.start,
                translationEnd: Translation.end
            } : {};
            return {
                id, start, end, exons,
                ...translation
            };
        })
    if (canonicalTranscript.length === 1) {
        canonicalTranscript = canonicalTranscript[0];
    } else {
        canonicalTranscript = null; // no transcript
    }
    return {
        id, description, start, end, strand, biotype,
        name: display_name,
        chromosome: seq_region_name,
        canonicalTranscript
    }
}

const SET_LOCATION = 'SET_LOCATION';
export function setLocation(location) {
    return { type: SET_LOCATION, location };
}

// selectors (reselect memoizes)
const getGenes = (state) => state.ensemblGenes;
const getLocation = (state) => state.location;
const getVisibleGenes = createSelector([getGenes, getLocation], (genes, location) => {
    return genes.filter(gene => {
        return (gene.start < location.end) && (gene.end > location.start)
    })
})
const getSlots = createSelector([getVisibleGenes, getLocation], (genes, location) => {
    const sortedGenes = _.sortBy(genes, ['start']);
    const slots = []
    const minXOffset = (location.end - location.start) * 0.15 // 15% of browser window
    sortedGenes.forEach(gene => {
        const suitableSlots = slots.filter(slot => (gene.start > (slot.end + minXOffset)));
        if (suitableSlots.length > 0) {
            suitableSlots[0].genes.push(gene);
            suitableSlots[0].end = gene.end;
        } else {
            const newSlot = { genes: [gene], end: gene.end };
            slots.push(newSlot);
        }
    });
    return slots;
});
export const selectors = {
    getGenes,
    getSlots,
    getVisibleGenes,
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
    ensemblGenes: Object.values(rawEnsemblData).map(transformEnsemblGene),
}

function reducer (state=initialState, action) {
    // TODO: Handle other action types
    switch (action.type) {
    case SET_LOCATION:
        return { ...state, location: action.location };
    default:
        return state;
    }
}

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
