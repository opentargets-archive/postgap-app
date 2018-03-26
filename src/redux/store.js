import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import sagas from './sagas';

import {
  SET_LOCATION,
  SET_FILTER_LD,
  SET_FILTER_GWAS_PVALUE,
  SET_FILTER_G2V_MUST_HAVES,
  SET_FILTER_G2V_SCORE,
  SET_HOVER_ENTITY_ID,
  SET_CLICKED_ENTITY_ID,
  SET_SELECTED_ENTITY_ID,
  SET_LOADING_ROWS,
  SET_API_DATA,
  SET_LOADING_ENSEMBL_GENES,
  SET_LOADING_ENSEMBL_VARIANTS,
  SET_DISEASE_PAGE,
  SET_LOADING_DISEASE_TABLE_ROWS,
  SET_DISEASE_TABLE_ROWS,
} from './actions';

import { chromosomeLengths } from './chromosomeLengths';

export {
  setLocation,
  setFilterLD,
  setFilterGwasPValue,
  setFilterG2VScore,
  setFilterG2VMustHaves,
  setHoverEntityId,
  setClickedEntityId,
  setSelectedEntityId,
  setDiseasePage,
} from './actions';

export { selectors } from './selectors';

// TODO: Subdivide state and reducers and async load
//       initialState url: https://mk-loci-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?chromosome=1&begin=109167885&end=109612066&size=10&datasource=gwas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID
const initialState = {
  // locus page
  location: {
    chromosome: 1,
    start: 109167885,
    end: 109612066,
  },
  chromosomeLengths,
  rows: [],
  ensemblGenes: [],
  ensemblVariants: [],
  filters: {
    ld: [0.7, 1],
    gwasPValue: [0, Number.MAX_SAFE_INTEGER],
    gwasMaxPValue: Number.MAX_SAFE_INTEGER,
    g2VMustHaves: [],
    g2VScore: [0, 1],
  },
  hover: {
    geneId: null,
    variantId: null,
    leadVariantId: null,
    diseaseId: null,
    geneVariantId: null,
    variantLeadVariantId: null,
    leadVariantDiseaseId: null,
  },
  clicked: {
    geneId: null,
    variantId: null,
    leadVariantId: null,
    diseaseId: null,
    geneVariantId: null,
    variantLeadVariantId: null,
    leadVariantDiseaseId: null,
  },
  loading: {
    rows: false,
    ensemblGenes: false,
    ensemblVariants: false,
  },
  // disease page
  diseasePage: {
    loading: false,
    efoId: null,
    rows: [],
  },
};

export const ENTITY_TYPE = {
  GENE: 'geneId',
  VARIANT: 'variantId',
  LEAD_VARIANT: 'leadVariantId',
  DISEASE: 'diseaseId',
  GENE_VARIANT: 'geneVariantId',
  VARIANT_LEAD_VARIANT: 'variantLeadVariantId',
  LEAD_VARIANT_DISEASE: 'leadVariantDiseaseId',
};

// TODO: Make SET_FILTER_LD more general
export const FILTER_TYPE = {
  // gene - variant

  // variant - leadVariant
  LD: 'ld',

  // leadVariant - disease
  GWAS_PVALUE: 'gwasPValue',
};

function reducer(state = initialState, action) {
  // TODO: Handle other action types
  switch (action.type) {
    // locus page
    case SET_LOCATION:
      return { ...state, location: action.location };
    case SET_FILTER_LD:
      return { ...state, filters: { ...state.filters, ld: action.filter } };
    case SET_FILTER_GWAS_PVALUE:
      return {
        ...state,
        filters: { ...state.filters, gwasPValue: action.filter },
      };
    case SET_FILTER_G2V_SCORE:
      return {
        ...state,
        filters: { ...state.filters, g2VScore: action.filter },
      };
    case SET_FILTER_G2V_MUST_HAVES:
      return {
        ...state,
        filters: { ...state.filters, g2VMustHaves: action.filter },
      };
    case SET_HOVER_ENTITY_ID:
      return {
        ...state,
        hover: { ...state.hover, [action.entityType]: action.entityId },
      };
    case SET_CLICKED_ENTITY_ID:
      return {
        ...state,
        clicked: { ...state.clicked, [action.entityType]: action.entityId },
      };
    case SET_SELECTED_ENTITY_ID:
      return {
        ...state,
        selected: { ...state.selected, [action.entityType]: action.entityId },
      };
    case SET_LOADING_ROWS:
      return {
        ...state,
        loading: { ...state.loading, rows: action.loading },
      };
    case SET_LOADING_ENSEMBL_GENES:
      return {
        ...state,
        loading: { ...state.loading, ensemblGenes: action.loading },
      };
    case SET_LOADING_ENSEMBL_VARIANTS:
      return {
        ...state,
        loading: { ...state.loading, ensemblVariants: action.loading },
      };
    case SET_API_DATA:
      const {
        rows,
        ensemblGenes,
        ensemblVariants,
        gwasMaxPValue,
      } = action.data;
      // gwas p-value filter max updates; conditionally need to update filter interval
      const oldGwasPValue = state.filters.gwasPValue;
      const gwasPValue = [
        oldGwasPValue[0] <= gwasMaxPValue ? oldGwasPValue[0] : 0,
        oldGwasPValue[1] <= gwasMaxPValue ? oldGwasPValue[1] : gwasMaxPValue,
      ];
      return {
        ...state,
        filters: {
          ...state.filters,
          gwasMaxPValue: gwasMaxPValue,
          gwasPValue,
        },
        rows,
        ensemblGenes,
        ensemblVariants,
      };
    // disease page
    case SET_DISEASE_PAGE:
      return {
        ...state,
        diseasePage: { ...state.diseasePage, efoId: action.efoId },
      };
    case SET_LOADING_DISEASE_TABLE_ROWS:
      return {
        ...state,
        diseasePage: { ...state.diseasePage, loading: action.loading },
      };
    case SET_DISEASE_TABLE_ROWS:
      return {
        ...state,
        diseasePage: { ...state.diseasePage, rows: action.rows },
      };
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export default store;
