export const SET_LOCATION = 'SET_LOCATION';
export function setLocation(location) {
  return { type: SET_LOCATION, location };
}

export const SET_FILTER_LD = 'SET_FILTER_LD';
export function setFilterLD(filter) {
  return { type: SET_FILTER_LD, filter };
}

export const SET_FILTER_GWAS_PVALUE = 'SET_FILTER_GWAS_PVALUE';
export function setFilterGwasPValue(filter) {
  return { type: SET_FILTER_GWAS_PVALUE, filter };
}

export const SET_FILTER_G2V_SCORE = 'SET_FILTER_G2V_SCORE';
export function setFilterG2VScore(filter) {
  return { type: SET_FILTER_G2V_SCORE, filter };
}

export const SET_FILTER_G2V_MUST_HAVES = 'SET_FILTER_G2V_MUST_HAVES';
export function setFilterG2VMustHaves(filter) {
  return { type: SET_FILTER_G2V_MUST_HAVES, filter };
}

export const SET_HOVER_ENTITY_ID = 'SET_HOVER_ENTITY_ID';
export function setHoverEntityId({ entityType, entityId }) {
  return { type: SET_HOVER_ENTITY_ID, entityType, entityId };
}

export const SET_CLICKED_ENTITY_ID = 'SET_CLICKED_ENTITY_ID';
export function setClickedEntityId({ entityType, entityId }) {
  return { type: SET_CLICKED_ENTITY_ID, entityType, entityId };
}

export const SET_SELECTED_ENTITY_ID = 'SET_SELECTED_ENTITY_ID';
export function setSelectedEntityId({ entityType, entityId }) {
  return { type: SET_SELECTED_ENTITY_ID, entityType, entityId };
}

export const SET_LOADING_ROWS = 'SET_LOADING_ROWS';
export function setLoadingRows(loading) {
  return { type: SET_LOADING_ROWS, loading };
}

export const SET_LOADING_ENSEMBL_GENES = 'SET_LOADING_ENSEMBL_GENES';
export function setLoadingEnsemblGenes(loading) {
  return { type: SET_LOADING_ENSEMBL_GENES, loading };
}

export const SET_LOADING_ENSEMBL_VARIANTS = 'SET_LOADING_ENSEMBL_VARIANTS';
export function setLoadingEnsemblVariants(loading) {
  return { type: SET_LOADING_ENSEMBL_VARIANTS, loading };
}

export const SET_API_DATA = 'SET_API_DATA';
export function setApiData(data) {
  return { type: SET_API_DATA, data };
}

export const SET_DISEASE_PAGE = 'SET_DISEASE_PAGE';
export function setDiseasePage(efoId) {
  return { type: SET_DISEASE_PAGE, efoId };
}

export const SET_LOADING_DISEASE_TABLE_ROWS = 'SET_LOADING_DISEASE_TABLE_ROWS';
export function setLoadingDiseaseTableRows(loading) {
  return { type: SET_LOADING_DISEASE_TABLE_ROWS, loading };
}

export const SET_DISEASE_TABLE_ROWS = 'SET_DISEASE_TABLE_ROWS';
export function setDiseaseTableRows(rows) {
  return { type: SET_DISEASE_TABLE_ROWS, rows };
}

export const SET_CLEAN_LOCUS_PAGE_STATE = 'SET_CLEAN_LOCUS_PAGE_STATE';
export function setCleanLocusPageState() {
  return { type: SET_CLEAN_LOCUS_PAGE_STATE };
}
