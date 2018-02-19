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

export const SET_FILTER_G2V_MUST_HAVES = 'SET_FILTER_G2V_MUST_HAVES';
export function setFilterG2VMustHaves(filter) {
  return { type: SET_FILTER_G2V_MUST_HAVES, filter };
}

export const SET_HOVER_ENTITY = 'SET_HOVER_ENTITY';
export function setHoverEntity({ entityType, entity }) {
  return { type: SET_HOVER_ENTITY, entityType, entity };
}

export const SET_CLICKED_ENTITY = 'SET_CLICKED_ENTITY';
export function setClickedEntity({ entityType, entity }) {
  return { type: SET_CLICKED_ENTITY, entityType, entity };
}
