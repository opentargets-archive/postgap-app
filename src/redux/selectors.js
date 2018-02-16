import { createSelector } from 'reselect';
import _ from 'lodash';

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
