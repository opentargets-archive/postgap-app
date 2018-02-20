import { createStore } from 'redux';

import {
  transformEnsemblGene,
  transformEnsemblVariant
} from './utils/transformEnsembl';
import { transformEvidenceString } from './utils/transformOpenTargets';

import {
  SET_LOCATION,
  SET_FILTER_LD,
  SET_FILTER_GWAS_PVALUE,
  SET_FILTER_G2V_MUST_HAVES,
  SET_HOVER_ENTITY,
  SET_CLICKED_ENTITY
} from './actions';

import rawData from '../raw.json';
import rawEnsemblData from '../rawEnsembl.json';
import rawEnsemblVariantsData from '../rawEnsemblVariants.json';

export {
  setLocation,
  setFilterLD,
  setFilterGwasPValue,
  setFilterG2VMustHaves,
  setHoverEntity,
  setClickedEntity
} from './actions';

export { selectors } from './selectors';

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
    ld: [0.7, 1],
    gwasPValue: [0, 100],
    g2VMustHaves: []
  },
  hover: {
    gene: null,
    variant: null,
    leadVariant: null,
    disease: null,
    geneVariant: null,
    variantLeadVariant: null,
    leadVariantDisease: null
  },
  clicked: {
    gene: null,
    variant: null,
    leadVariant: null,
    disease: null,
    geneVariant: null,
    variantLeadVariant: null,
    leadVariantDisease: null
  },
  loading: {
    rows: true,
    ensemblGenes: true,
    ensemblVariants: true
  }
};

export const ENTITY_TYPE = {
  GENE: 'gene',
  VARIANT: 'variant',
  LEAD_VARIANT: 'leadVariant',
  DISEASE: 'disease',
  GENE_VARIANT: 'geneVariant',
  VARIANT_LEAD_VARIANT: 'variantLeadVariant',
  LEAD_VARIANT_DISEASE: 'leadVariantDisease'
};

// TODO: Make SET_FILTER_LD more general
export const FILTER_TYPE = {
  // gene - variant

  // variant - leadVariant
  LD: 'ld',

  // leadVariant - disease
  GWAS_PVALUE: 'gwasPValue'
};

function reducer(state = initialState, action) {
  // TODO: Handle other action types
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.location };
    case SET_FILTER_LD:
      return { ...state, filters: { ...state.filters, ld: action.filter } };
    case SET_FILTER_GWAS_PVALUE:
      return {
        ...state,
        filters: { ...state.filters, gwasPValue: action.filter }
      };
    case SET_FILTER_G2V_MUST_HAVES:
      return {
        ...state,
        filters: { ...state.filters, g2VMustHaves: action.filter }
      };
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
