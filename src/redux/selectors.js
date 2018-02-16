import { createSelector } from 'reselect';
import _ from 'lodash';

// helpers
// TODO: will be needed for API call
const GENE_FIELDS = ['geneName', 'geneId'];
const VARIANT_FIELDS = ['ldSnpId', 'ldSnpPos'];
const LEAD_VARIANT_FIELDS = ['gwasSnpId'];
const DISEASE_FIELDS = ['efoName', 'efoId'];
const GENE_VARIANT_FIELDS = [
  ...GENE_FIELDS,
  ...VARIANT_FIELDS,
  'gtex',
  'pchic',
  'dhs',
  'fantom5',
  'vep',
  'otScore'
];
const VARIANT_LEAD_VARIANT_FIELDS = [
  ...VARIANT_FIELDS,
  ...LEAD_VARIANT_FIELDS,
  'r2'
];
const LEAD_VARIANT_DISEASE_FIELDS = [
  ...LEAD_VARIANT_FIELDS,
  ...DISEASE_FIELDS,
  'gwasPValue',
  'gwasSampleSize'
];
const rowsToUniqueGenes = rows =>
  _.uniqBy(rows.map(d => _.pick(d, GENE_FIELDS)), 'geneId');
const rowsToUniqueVariants = rows =>
  _.uniqBy(rows.map(d => _.pick(d, VARIANT_FIELDS)), 'ldSnpId');
const rowsToUniqueLeadVariants = rows =>
  _.uniqBy(rows.map(d => _.pick(d, LEAD_VARIANT_FIELDS)), 'gwasSnpId');
const rowsToUniqueDiseases = rows =>
  _.uniqBy(rows.map(d => _.pick(d, DISEASE_FIELDS)), 'efoId');
const rowsToUniqueGeneVariants = rows =>
  _.uniqBy(
    rows.map(d => {
      return {
        id: `${d.geneId}-${d.ldSnpId}`,
        ..._.pick(d, GENE_VARIANT_FIELDS)
      };
    }),
    'id'
  );
const rowsToUniqueVariantLeadVariants = rows =>
  _.uniqBy(
    rows.map(d => {
      return {
        id: `${d.ldSnpId}-${d.gwasSnpId}`,
        ..._.pick(d, VARIANT_LEAD_VARIANT_FIELDS)
      };
    }),
    'id'
  );
const rowsToUniqueLeadVariantDiseases = rows =>
  _.uniqBy(
    rows.map(d => {
      return {
        id: `${d.gwasSnpId}-${d.efoId}`,
        ..._.pick(d, LEAD_VARIANT_DISEASE_FIELDS)
      };
    }),
    'id'
  );

// direct
const getRows = state => state.rows;
const getEnsemblGenes = state => state.ensemblGenes;
const getEnsemblVariants = state => state.ensemblVariants;
const getLocation = state => state.location;
const getFilterLD = state => state.filters.ld;

// derived
const getRowsGenes = createSelector([getRows], rows => rowsToUniqueGenes(rows));
const getRowsVariants = createSelector([getRows], rows =>
  rowsToUniqueVariants(rows)
);
const getRowsLeadVariants = createSelector([getRows], rows =>
  rowsToUniqueLeadVariants(rows)
);
const getRowsDiseases = createSelector([getRows], rows =>
  rowsToUniqueDiseases(rows)
);
const getRowsFiltered = createSelector(
  [getRows, getFilterLD],
  (rows, filterLD) => {
    if (!filterLD) {
      return rows;
    }
    const rfs = rows.filter(d => filterLD[0] <= d.r2 && d.r2 <= filterLD[1]);
    return rfs;
  }
);
const getEnsemblGenesLookup = createSelector([getEnsemblGenes], genes => {
  const geneLookup = {};
  genes.forEach(d => {
    geneLookup[d.id] = d;
  });
  return geneLookup;
});
const getEnsemblVariantsLookup = createSelector(
  [getEnsemblVariants],
  variants => {
    const variantLookup = {};
    variants.forEach(d => {
      variantLookup[d.id] = d;
    });
    return variantLookup;
  }
);
// const getGenesFiltered = createSelector([getRowsFiltered], rows => rowsToUniqueGenes(rows));
// const getVariantsFiltered = createSelector([getRowsFiltered], rows =>
//   rowsToUniqueVariants(rows)
// );
// const getLeadVariantsFiltered = createSelector([getRowsFiltered], rows =>
//   rowsToUniqueLeadVariants(rows)
// );
const getDiseasesFiltered = createSelector([getRowsFiltered], rows =>
  rowsToUniqueDiseases(rows)
);
const getGeneVariantsFiltered = createSelector(
  [getEnsemblGenesLookup, getRowsFiltered],
  (genesLookup, rows) => {
    const geneVariants = rowsToUniqueGeneVariants(rows);
    // merge
    return geneVariants.map(d => ({
      ...genesLookup[d.geneId],
      ...d
    }));
  }
);
const getVariantLeadVariantsFiltered = createSelector(
  [getEnsemblVariantsLookup, getRowsFiltered],
  (variantsLookup, rows) => {
    const variantLeadVariants = rowsToUniqueVariantLeadVariants(rows);
    // merge
    return variantLeadVariants.map(d => ({
      leadSnpPos: variantsLookup[d.gwasSnpId].pos,
      ...d
    }));
  }
);
const getLeadVariantDiseasesFiltered = createSelector(
  [getEnsemblVariantsLookup, getRowsFiltered],
  (variantsLookup, rows) => {
    const leadVariantDiseases = rowsToUniqueLeadVariantDiseases(rows);
    // merge
    return leadVariantDiseases.map(d => ({
      leadSnpPos: variantsLookup[d.gwasSnpId].pos,
      ...d
    }));
  }
);

// ABOVE TO KEEP; BELOW TO REFACTOR

const getVisibleGenes = createSelector(
  [getEnsemblGenes, getLocation],
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
  //   getGenes: getEnsemblGenes,
  getSlots,
  getVisibleGenes,
  getVisibleVariants,
  getVisibleGeneVariants: getGeneVariantsFiltered,
  getVisibleLeadVariants,
  getDiseases: getRowsDiseases,
  getVisibleVariantLeadVariants: getVariantLeadVariantsFiltered,
  getVisibleLeadVariantDiseases: getLeadVariantDiseasesFiltered
};