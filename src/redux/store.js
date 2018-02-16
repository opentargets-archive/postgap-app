import { createStore } from 'redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

import {
  transformEnsemblGene,
  transformEnsemblVariant
} from './utils/transformEnsembl';
import { transformEvidenceString } from './utils/transformOpenTargets';

import rawData from '../raw.json';
import rawEnsemblData from '../rawEnsembl.json';
import rawEnsemblVariantsData from '../rawEnsemblVariants.json';

const SET_LOCATION = 'SET_LOCATION';
export function setLocation(location) {
  return { type: SET_LOCATION, location };
}

const SET_FILTER_LD = 'SET_FILTER_LD';
export function setFilterLD(filter) {
  return { type: SET_FILTER_LD, filter };
}

const SET_HOVER_ENTITY = 'SET_HOVER_ENTITY'; // generalize?
export function setHoverEntity({ entityType, entity }) {
  return { type: SET_HOVER_ENTITY, entityType, entity };
}

const SET_CLICKED_ENTITY = 'SET_CLICKED_ENTITY'; // generalize?
export function setClickedEntity({ entityType, entity }) {
  return { type: SET_CLICKED_ENTITY, entityType, entity };
}

// selectors (reselect memoizes)
const getRows = state => state.rows;
const getGenes = state => state.ensemblGenes;
const getEnsemblVariants = state => state.ensemblVariants;
const getLocation = state => state.location;
const getVisibleGenes = createSelector(
  [getGenes, getLocation],
  (genes, location) => {
    return genes.filter(gene => {
      return gene.start < location.end && gene.end > location.start;
    });
  }
);
const getSlots = createSelector(
  [getVisibleGenes, getLocation],
  (genes, location) => {
    const sortedGenes = _.sortBy(genes, ['start']);
    const slots = [];
    const minXOffset = (location.end - location.start) * 0.15; // 15% of browser window
    sortedGenes.forEach(gene => {
      const suitableSlots = slots.filter(
        slot => gene.start > slot.end + minXOffset
      );
      if (suitableSlots.length > 0) {
        suitableSlots[0].genes.push(gene);
        suitableSlots[0].end = gene.end;
      } else {
        const newSlot = { genes: [gene], end: gene.end };
        slots.push(newSlot);
      }
    });
    return slots;
  }
);
const getVariants = state =>
  _.uniqBy(state.rows.map(d => ({ id: d.ldSnpId, pos: d.ldSnpPos })), 'id');
const getVisibleVariants = createSelector(
  [getVariants, getLocation],
  (variants, location) => {
    return variants.filter(
      variant => variant.pos >= location.start && variant.pos <= location.end
    );
  }
);
const getGeneVariants = state =>
  _.uniqBy(
    state.rows.map(d => {
      const {
        geneId,
        geneName,
        ldSnpId,
        ldSnpPos,
        gtex,
        pchic,
        dhs,
        fantom5,
        vep,
        otScore
      } = d;
      return {
        id: `${d.geneId}-${d.ldSnpId}`,
        geneId,
        geneName,
        ldSnpId,
        ldSnpPos,
        gtex,
        pchic,
        dhs,
        fantom5,
        vep,
        otScore
      };
    }),
    'id'
  );
const getVisibleGeneVariants = createSelector(
  [getVisibleGenes, getVisibleVariants, getGeneVariants],
  (genes, variants, geneVariants) => {
    const visibleGeneIds = genes.map(d => d.id);
    const visibleSnpIds = variants.map(d => d.id);

    const visibleGenesTssLookup = {};
    genes.forEach(d => {
      visibleGenesTssLookup[d.id] = d.canonicalTranscript.tss;
    });

    return geneVariants
      .filter(
        geneVariant =>
          visibleGeneIds.indexOf(geneVariant.geneId) > 0 ||
          visibleSnpIds.indexOf(geneVariant.ldSnpId) > 0
      )
      .map(geneVariant => ({
        ...geneVariant,
        geneTss: visibleGenesTssLookup[geneVariant.geneId]
      }));
  }
);
const getVisibleLeadVariants = createSelector(
  [getEnsemblVariants, getLocation],
  (variants, location) => {
    return variants
      .filter(
        variant => variant.pos >= location.start && variant.pos <= location.end
      )
      .map(variant => ({ id: variant.id, pos: variant.pos }));
  }
);
const getDiseases = createSelector([getRows], rows => {
  return _.uniqBy(rows.map(d => ({ id: d.efoId, name: d.efoName })), 'id');
});
const getVariantLeadVariants = state =>
  _.uniqBy(
    state.rows.map(d => {
      const { ldSnpId, ldSnpPos, gwasSnpId, r2 } = d;
      return {
        id: `${d.ldSnpId}-${d.gwasSnpId}`,
        ldSnpId,
        ldSnpPos,
        gwasSnpId,
        r2
      };
    }),
    'id'
  );
const getVisibleVariantLeadVariants = createSelector(
  [getVisibleVariants, getVisibleLeadVariants, getVariantLeadVariants],
  (variants, leadVariants, variantLeadVariants) => {
    const visibleVariantIds = variants.map(d => d.id);
    const visibleLeadVariantIds = leadVariants.map(d => d.id);

    const visibleLeadVariantsPosLookup = {};
    leadVariants.forEach(d => {
      visibleLeadVariantsPosLookup[d.id] = d.pos;
    });

    return variantLeadVariants
      .filter(
        variantLeadVariant =>
          visibleVariantIds.indexOf(variantLeadVariant.ldSnpId) > 0 ||
          visibleLeadVariantIds.indexOf(variantLeadVariant.gwasSnpId) > 0
      )
      .map(variantLeadVariant => ({
        ...variantLeadVariant,
        leadSnpPos: visibleLeadVariantsPosLookup[variantLeadVariant.gwasSnpId]
      }));
  }
);
const getLeadVariantDiseases = state =>
  _.uniqBy(
    state.rows.map(d => {
      const { gwasSnpId, efoId, efoName, gwasPValue, gwasSampleSize } = d;
      return {
        id: `${d.gwasSnpId}-${d.efoId}`,
        gwasSnpId,
        efoId,
        efoName,
        gwasPValue,
        gwasSampleSize
      };
    }),
    'id'
  );
const getVisibleLeadVariantDiseases = createSelector(
  [getVisibleLeadVariants, getLeadVariantDiseases],
  (leadVariants, leadVariantDiseases) => {
    const visibleLeadVariantIds = leadVariants.map(d => d.id); // TODO: refactor into separate selector

    const visibleLeadVariantsPosLookup = {}; // TODO: refactor into separate selector
    leadVariants.forEach(d => {
      visibleLeadVariantsPosLookup[d.id] = d.pos;
    });

    return leadVariantDiseases
      .filter(
        leadVariantDisease =>
          visibleLeadVariantIds.indexOf(leadVariantDisease.gwasSnpId) > 0
      )
      .map(leadVariantDisease => ({
        ...leadVariantDisease,
        leadSnpPos: visibleLeadVariantsPosLookup[leadVariantDisease.gwasSnpId]
      }));
  }
);

export const selectors = {
  getRows,
  getGenes,
  getSlots,
  getVisibleGenes,
  getVisibleVariants,
  getVisibleGeneVariants,
  getVisibleLeadVariants,
  getDiseases,
  getVisibleVariantLeadVariants,
  getVisibleLeadVariantDiseases
};

// TODO: Subdivide state and reducers and async load
//       initialState url: https://mk-loci-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?chromosome=1&begin=109167885&end=109612066&size=10&datasource=gwas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID
const initialState = {
  chromosome: 1,
  location: {
    start: 109167885,
    end: 109612066
  },
  rows: rawData.data.map(transformEvidenceString),
  ensemblGenes: Object.values(rawEnsemblData).map(transformEnsemblGene),
  ensemblVariants: Object.values(rawEnsemblVariantsData).map(
    transformEnsemblVariant
  ),
  filters: {
    ld: [0.7, 1]
  },
  hover: {
    gene: null,
    variant: null,
    leadVariant: null,
    disease: null
  },
  clicked: {
    gene: null,
    variant: null,
    leadVariant: null,
    disease: null
  }
};

export const ENTITY_TYPE = {
  GENE: 'gene',
  VARIANT: 'variant',
  LEAD_VARIANT: 'leadVariant',
  DISEASE: 'disease'
};

function reducer(state = initialState, action) {
  // TODO: Handle other action types
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.location };
    case SET_FILTER_LD:
      return { ...state, filters: { ...state.filters, ld: action.filter } };
    case SET_HOVER_ENTITY:
      return {
        ...state,
        hover: { ...state.hover, [action.entityType]: action.entity }
      };
    case SET_CLICKED_ENTITY:
      return {
        ...state,
        clicked: { ...state.clicked, [action.entityType]: action.entity }
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
