import { createSelector } from 'reselect';
import _ from 'lodash';

// helpers
// TODO: will be needed for API call
const GENE_FIELDS = ['geneDescription', 'geneName', 'geneId'];
const VARIANT_FIELDS = ['ldSnpId', 'ldSnpPos', 'ldSnpChrom'];
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
  'otScore',
];
const VARIANT_LEAD_VARIANT_FIELDS = [
  ...VARIANT_FIELDS,
  ...LEAD_VARIANT_FIELDS,
  'r2',
];
const LEAD_VARIANT_DISEASE_FIELDS = [
  ...LEAD_VARIANT_FIELDS,
  ...DISEASE_FIELDS,
  'gwasPValue',
  'gwasSampleSize',
];
const INTERACTION_FIELDS = ['hover', 'clicked', 'interactive'];
export const rowsToUniqueGenes = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => _.pick(d, [...GENE_FIELDS, ...INTERACTION_FIELDS])),
      'interactive'
    ),
    'geneId'
  );
const rowsToUniqueVariants = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => _.pick(d, [...VARIANT_FIELDS, ...INTERACTION_FIELDS])),
      'interactive'
    ),
    'ldSnpId'
  );
export const rowsToUniqueLeadVariants = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => _.pick(d, [...LEAD_VARIANT_FIELDS, ...INTERACTION_FIELDS])),
      'interactive'
    ),
    'gwasSnpId'
  );
const rowsToUniqueDiseases = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => _.pick(d, [...DISEASE_FIELDS, ...INTERACTION_FIELDS])),
      'interactive'
    ),
    'efoId'
  );
const rowsToUniqueGeneVariants = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => {
        return {
          id: `${d.geneId}-${d.ldSnpId}`,
          ..._.pick(d, [...GENE_VARIANT_FIELDS, ...INTERACTION_FIELDS]),
        };
      }),
      'interactive'
    ),
    'id'
  );
const rowsToUniqueVariantLeadVariants = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => {
        return {
          id: `${d.ldSnpId}-${d.gwasSnpId}`,
          ..._.pick(d, [...VARIANT_LEAD_VARIANT_FIELDS, ...INTERACTION_FIELDS]),
        };
      }),
      'interactive'
    ),
    'id'
  );
const rowsToUniqueLeadVariantDiseases = rows =>
  _.uniqBy(
    _.sortBy(
      rows.map(d => {
        return {
          id: `${d.gwasSnpId}-${d.efoId}`,
          ..._.pick(d, [...LEAD_VARIANT_DISEASE_FIELDS, ...INTERACTION_FIELDS]),
        };
      }),
      'interactive'
    ),
    'id'
  );

// direct
const getRows = state => state.rows;
const getEnsemblGenes = state => state.ensemblGenes;
const getEnsemblVariants = state => state.ensemblVariants;
const getLocation = state => state.location;
const getFilterLD = state => state.filters.ld;
const getFilterGwasPValue = state => state.filters.gwasPValue;
const getFilterG2VMustHaves = state => state.filters.g2VMustHaves;
const getFilterG2VScore = state => state.filters.g2VScore;
const getLoadingRows = state => state.loading.rows;
const getLoadingEnsemblGenes = state => state.loading.ensemblGenes;
const getLoadingEnsemblVariants = state => state.loading.ensemblVariants;
const getChromosome = state => state.location.chromosome;
const getChromosomeLengths = state => state.chromosomeLengths;
const getHover = state => state.hover;
const getClicked = state => state.clicked;
const getMaxMinusLogGwasPValue = state => state.filters.gwasMaxPValue;

// derived
// TODO: Pattern for browser selectors should follow:
// * rowsAll --> <entity>sAll
// * rowsAll -(filters)-> rowsFiltered
// * rowsFiltered -> <entity>sFiltered
// * genesAll -(location)-> genesToRender (NEEDED FOR SLOT CALCULATION)
// * <entity>sAll --> <entity>sAllCount
// * <entity>sFiltered --> <entity>sAllFilteredCount

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
  [
    getRows,
    getFilterLD,
    getFilterGwasPValue,
    getFilterG2VScore,
    getFilterG2VMustHaves,
  ],
  (rows, filterLD, filterGwasPvalue, filterG2VScore, filterG2VMustHaves) => {
    if (!filterLD) {
      return rows;
    }
    const rfs = rows
      .filter(d => filterLD[0] <= d.r2 && d.r2 <= filterLD[1])
      .filter(d => {
        const low = filterGwasPvalue[0] <= -Math.log10(d.gwasPValue).toFixed(1);
        const high =
          -Math.log10(d.gwasPValue).toFixed(1) <= filterGwasPvalue[1];
        return low && high;
      })
      .filter(
        d => filterG2VScore[0] <= d.otScore && d.otScore <= filterG2VScore[1]
      )
      .filter(d => {
        return filterG2VMustHaves.every(field => d[field] > 0);
      });
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
const getGenesFiltered = createSelector([getRowsFiltered], rows =>
  rowsToUniqueGenes(rows)
);
const getVariantsFiltered = createSelector([getRowsFiltered], rows =>
  rowsToUniqueVariants(rows)
);
const getLeadVariantsFiltered = createSelector([getRowsFiltered], rows =>
  rowsToUniqueLeadVariants(rows)
);
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
      ...d,
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
      ...d,
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
      ...d,
    }));
  }
);

const getGenesFilteredCount = createSelector(
  [getGenesFiltered],
  genesFiltered => genesFiltered.length
);
const getVariantsFilteredCount = createSelector(
  [getVariantsFiltered],
  variantsFiltered => variantsFiltered.length
);
const getLeadVariantsFilteredCount = createSelector(
  [getLeadVariantsFiltered],
  leadVariantsFiltered => leadVariantsFiltered.length
);
const getDiseasesFilteredCount = createSelector(
  [getDiseasesFiltered],
  diseasesFiltered => diseasesFiltered.length
);

const getGeneVariantsFilteredCount = createSelector(
  [getGeneVariantsFiltered],
  geneVariantsFiltered => geneVariantsFiltered.length
);
const getVariantLeadVariantsFilteredCount = createSelector(
  [getVariantLeadVariantsFiltered],
  variantLeadVariantsFiltered => variantLeadVariantsFiltered.length
);
const getLeadVariantDiseasesFilteredCount = createSelector(
  [getLeadVariantDiseasesFiltered],
  leadVariantDiseasesFiltered => leadVariantDiseasesFiltered.length
);

const getIsLoading = createSelector(
  [getLoadingRows, getLoadingEnsemblGenes, getLoadingEnsemblVariants],
  (rows, ensemblGenes, ensemblVariants) => {
    return rows || ensemblGenes || ensemblVariants;
  }
);

const getChromosomeLength = createSelector(
  [getChromosome, getChromosomeLengths],
  (chr, chrLengths) => {
    return chrLengths[chr];
  }
);

const isHoverRow = hover => d => {
  return (
    (hover.gene && d.geneId === hover.gene.id) ||
    (hover.variant && d.ldSnpId === hover.variant.id) ||
    (hover.leadVariant && d.gwasSnpId === hover.leadVariant.id) ||
    (hover.disease && d.efoId === hover.disease.efoId) ||
    (hover.geneVariant &&
      d.geneId === hover.geneVariant.geneId &&
      d.ldSnpId === hover.geneVariant.ldSnpId) ||
    (hover.variantLeadVariant &&
      d.ldSnpId === hover.variantLeadVariant.ldSnpId &&
      d.gwasSnpId === hover.variantLeadVariant.gwasSnpId) ||
    (hover.leadVariantDisease &&
      d.gwasSnpId === hover.leadVariantDisease.gwasSnpId &&
      d.efoId === hover.leadVariantDisease.efoId)
  );
};

const isClickedRow = clicked => d => {
  return (
    (clicked.gene && d.geneId === clicked.gene.id) ||
    (clicked.variant && d.ldSnpId === clicked.variant.id) ||
    (clicked.leadVariant && d.gwasSnpId === clicked.leadVariant.id) ||
    (clicked.disease && d.efoId === clicked.disease.efoId) ||
    (clicked.geneVariant &&
      d.geneId === clicked.geneVariant.geneId &&
      d.ldSnpId === clicked.geneVariant.ldSnpId) ||
    (clicked.variantLeadVariant &&
      d.ldSnpId === clicked.variantLeadVariant.ldSnpId &&
      d.gwasSnpId === clicked.variantLeadVariant.gwasSnpId) ||
    (clicked.leadVariantDisease &&
      d.gwasSnpId === clicked.leadVariantDisease.gwasSnpId &&
      d.efoId === clicked.leadVariantDisease.efoId)
  );
};

const getRowsInteractive = createSelector(
  [getRowsFiltered, getHover, getClicked],
  (rows, hover, clicked) => {
    // get rows with interactive state
    // such that any hovered entity is present OR
    // any clicked entity is present indicates interactive
    const isHover = isHoverRow(hover);
    const isClicked = isClickedRow(clicked);
    const rowsInteractive = rows.map(d => {
      const h = isHover(d);
      const c = isClicked(d);
      return { ...d, hover: h, clicked: c, interactive: h || c };
    });
    return rowsInteractive;
  }
);

const getRowsInteractiveUnfiltered = createSelector(
  [getRows, getHover, getClicked],
  (rows, hover, clicked) => {
    // get rows with interactive state
    // such that any hovered entity is present OR
    // any clicked entity is present indicates interactive
    const isHover = isHoverRow(hover);
    const isClicked = isClickedRow(clicked);
    const rowsInteractive = rows.map(d => {
      const h = isHover(d);
      const c = isClicked(d);
      return { ...d, hover: h, clicked: c, interactive: h || c };
    });
    return rowsInteractive;
  }
);

const getIsInteractive = createSelector(
  [getHover, getClicked],
  (hover, clicked) => {
    return (
      hover.gene ||
      hover.variant ||
      hover.leadVariant ||
      hover.disease ||
      hover.geneVariant ||
      hover.variantLeadVariant ||
      hover.leadVariantDisease ||
      (clicked.gene ||
        clicked.variant ||
        clicked.leadVariant ||
        clicked.disease ||
        clicked.geneVariant ||
        clicked.variantLeadVariant ||
        clicked.leadVariantDisease)
    );
  }
);

const getGeneVariantsInteractive = createSelector(
  [getEnsemblGenesLookup, getRowsInteractive],
  (genesLookup, rows) => {
    const geneVariants = rowsToUniqueGeneVariants(rows);
    // merge
    return _.sortBy(
      geneVariants.map(d => ({
        ...genesLookup[d.geneId],
        ...d,
      })),
      'interactive'
    ).reverse();
  }
);

const getVariantLeadVariantsInteractive = createSelector(
  [getEnsemblVariantsLookup, getRowsInteractive],
  (variantsLookup, rows) => {
    const variantLeadVariants = rowsToUniqueVariantLeadVariants(rows);
    // merge
    return _.sortBy(
      variantLeadVariants.map(d => ({
        leadSnpPos: variantsLookup[d.gwasSnpId].pos,
        ...d,
      })),
      'interactive'
    ).reverse();
  }
);

const getLeadVariantDiseasesInteractive = createSelector(
  [getEnsemblVariantsLookup, getRowsInteractive],
  (variantsLookup, rows) => {
    const leadVariantDiseases = rowsToUniqueLeadVariantDiseases(rows);
    // merge
    return _.sortBy(
      leadVariantDiseases.map(d => ({
        leadSnpPos: variantsLookup[d.gwasSnpId].pos,
        ...d,
      })),
      'interactive'
    ).reverse();
  }
);

const getGenesInteractive = createSelector(
  [getRowsInteractiveUnfiltered, getEnsemblGenesLookup, getLocation],
  (rows, genesLookup, location) => {
    return _.sortBy(
      rowsToUniqueGenes(rows)
        .map(d => ({
          ...genesLookup[d.geneId],
          ...d,
        }))
        .filter(d => {
          return d.start < location.end && d.end > location.start;
        }),
      'interactive'
    ).reverse();
  }
);

const getSlotsInteractive = createSelector(
  [getGenesInteractive, getLocation],
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

const getVariantsInteractive = createSelector(
  [getRowsInteractiveUnfiltered, getLocation],
  (rows, location) => {
    return _.sortBy(
      rowsToUniqueVariants(rows)
        .map(d => ({
          ...d,
          id: d.ldSnpId,
          pos: d.ldSnpPos,
          chromosome: d.ldSnpChrom,
        }))
        .filter(d => d.pos >= location.start && d.pos <= location.end),
      'interactive'
    ).reverse();
  }
);

const getLeadVariantsInteractive = createSelector(
  [getRowsInteractiveUnfiltered, getEnsemblVariantsLookup, getLocation],
  (rows, variantsLookup, location) => {
    return _.sortBy(
      rowsToUniqueLeadVariants(rows)
        .map(d => ({
          ...d,
          id: d.gwasSnpId,
          chromosome: variantsLookup[d.gwasSnpId].chrom,
          pos: variantsLookup[d.gwasSnpId].pos,
        }))
        .filter(d => d.pos >= location.start && d.pos <= location.end),
      'interactive'
    ).reverse();
  }
);

const getDiseasesInteractive = createSelector(
  [getRowsInteractiveUnfiltered],
  rows => rowsToUniqueDiseases(rows)
);

export const selectors = {
  getLocation,
  getChromosome,
  getChromosomeLength,
  getRows,
  getRowsFiltered,
  //   getGenes: getEnsemblGenes,
  getSlots: getSlotsInteractive,
  getVisibleGenes: getGenesInteractive,
  getVisibleVariants: getVariantsInteractive,
  getVisibleGeneVariants: getGeneVariantsFiltered,
  getVisibleLeadVariants: getLeadVariantsInteractive,
  getDiseases: getDiseasesInteractive, // getRowsDiseases,
  getVisibleVariantLeadVariants: getVariantLeadVariantsFiltered,
  getVisibleLeadVariantDiseases: getLeadVariantDiseasesFiltered,
  // counts
  getGenesFilteredCount,
  getVariantsFilteredCount,
  getLeadVariantsFilteredCount,
  getDiseasesFilteredCount,
  getGeneVariantsFilteredCount,
  getVariantLeadVariantsFilteredCount,
  getLeadVariantDiseasesFilteredCount,
  // filters
  getMaxMinusLogGwasPValue,
  getFilterG2VScore,
  // loading
  getIsLoading,
  // interactive
  getGeneVariantsInteractive,
  getVariantLeadVariantsInteractive,
  getLeadVariantDiseasesInteractive,
  getIsInteractive,
};
