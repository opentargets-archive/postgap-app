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
const getGeneIdsFiltered = createSelector([getGenesFiltered], genes =>
  genes.map(d => d.geneId)
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
const getDiseaseIdsFiltered = createSelector([getDiseasesFiltered], diseases =>
  diseases.map(d => d.efoId)
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

const isInteractiveRow = interaction => d => {
  return (
    (interaction.geneId && d.geneId === interaction.geneId) ||
    (interaction.variantId && d.ldSnpId === interaction.variantId) ||
    (interaction.leadVariantId && d.gwasSnpId === interaction.leadVariantId) ||
    (interaction.diseaseId && d.efoId === interaction.diseaseId) ||
    (interaction.geneVariantId &&
      d.geneId === interaction.geneVariantId.split('-')[0] &&
      d.ldSnpId === interaction.geneVariantId.split('-')[1]) ||
    (interaction.variantLeadVariantId &&
      d.ldSnpId === interaction.variantLeadVariantId.split('-')[0] &&
      d.gwasSnpId === interaction.variantLeadVariantId.split('-')[1]) ||
    (interaction.leadVariantDiseaseId &&
      d.gwasSnpId === interaction.leadVariantDiseaseId.split('-')[0] &&
      d.efoId === interaction.leadVariantDiseaseId.split('-')[1])
  );
};

const getRowsInteractive = createSelector(
  [getRowsFiltered, getHover, getClicked],
  (rows, hover, clicked) => {
    // get rows with interactive state
    // such that any hovered entity is present OR
    // any clicked entity is present indicates interactive
    const isHover = isInteractiveRow(hover);
    const isClicked = isInteractiveRow(clicked);
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
    const isHover = isInteractiveRow(hover);
    const isClicked = isInteractiveRow(clicked);
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
      hover.geneId ||
      hover.variantId ||
      hover.leadVariantId ||
      hover.diseaseId ||
      hover.geneVariantId ||
      hover.variantLeadVariantId ||
      hover.leadVariantDiseaseId ||
      (clicked.geneId ||
        clicked.variantId ||
        clicked.leadVariantId ||
        clicked.diseaseId ||
        clicked.geneVariantId ||
        clicked.variantLeadVariantId ||
        clicked.leadVariantDiseaseId)
    );
  }
);

const getIsClicked = createSelector([getClicked], clicked => {
  return (
    clicked.geneId ||
    clicked.variantId ||
    clicked.leadVariantId ||
    clicked.diseaseId ||
    clicked.geneVariantId ||
    clicked.variantLeadVariantId ||
    clicked.leadVariantDiseaseId
  );
});

const getRowsForBrowserTable = createSelector(
  [getRowsFiltered, getRowsInteractiveUnfiltered, getIsClicked],
  (rowsFiltered, rowsInteractive, isClicked) => {
    if (isClicked) {
      return rowsInteractive.filter(d => d.clicked);
    } else {
      return rowsFiltered;
    }
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
  rows => {
    return _.sortBy(rowsToUniqueDiseases(rows), 'interactive').reverse();
  }
);

const getHoverGene = createSelector(
  [getHover, getGenesInteractive],
  (hover, genes) => genes.find(d => d.id === hover.geneId)
);
const getHoverVariant = createSelector(
  [getHover, getVariantsInteractive],
  (hover, variants) => variants.find(d => d.id === hover.variantId)
);
const getHoverLeadVariant = createSelector(
  [getHover, getLeadVariantsInteractive],
  (hover, leadVariants) => leadVariants.find(d => d.id === hover.leadVariantId)
);
const getHoverDisease = createSelector(
  [getHover, getDiseasesInteractive],
  (hover, diseases) => diseases.find(d => d.efoId === hover.diseaseId)
);
const getHoverGeneVariant = createSelector(
  [getHover, getGeneVariantsInteractive],
  (hover, geneVariants) => geneVariants.find(d => d.id === hover.geneVariantId)
);
const getHoverVariantLeadVariant = createSelector(
  [getHover, getVariantLeadVariantsInteractive],
  (hover, variantLeadVariants) =>
    variantLeadVariants.find(d => d.id === hover.variantLeadVariantId)
);
const getHoverLeadVariantDisease = createSelector(
  [getHover, getLeadVariantDiseasesInteractive],
  (hover, leadVariantDiseases) =>
    leadVariantDiseases.find(d => d.id === hover.leadVariantDiseaseId)
);
const getHoverEntities = createSelector(
  [
    getHoverGene,
    getHoverVariant,
    getHoverLeadVariant,
    getHoverDisease,
    getHoverGeneVariant,
    getHoverVariantLeadVariant,
    getHoverLeadVariantDisease,
  ],
  (
    gene,
    variant,
    leadVariant,
    disease,
    geneVariant,
    variantLeadVariant,
    leadVariantDisease
  ) => ({
    gene,
    variant,
    leadVariant,
    disease,
    geneVariant,
    variantLeadVariant,
    leadVariantDisease,
  })
);

const getClickedGene = createSelector(
  [getClicked, getGenesInteractive],
  (clicked, genes) => genes.find(d => d.id === clicked.geneId)
);
const getClickedVariant = createSelector(
  [getClicked, getVariantsInteractive],
  (clicked, variants) => variants.find(d => d.id === clicked.variantId)
);
const getClickedLeadVariant = createSelector(
  [getClicked, getLeadVariantsInteractive],
  (clicked, leadVariants) =>
    leadVariants.find(d => d.id === clicked.leadVariantId)
);
const getClickedDisease = createSelector(
  [getClicked, getDiseasesInteractive],
  (clicked, diseases) => diseases.find(d => d.efoId === clicked.diseaseId)
);
const getClickedGeneVariant = createSelector(
  [getClicked, getGeneVariantsInteractive],
  (clicked, geneVariants) =>
    geneVariants.find(d => d.id === clicked.geneVariantId)
);
const getClickedVariantLeadVariant = createSelector(
  [getClicked, getVariantLeadVariantsInteractive],
  (clicked, variantLeadVariants) =>
    variantLeadVariants.find(d => d.id === clicked.variantLeadVariantId)
);
const getClickedLeadVariantDisease = createSelector(
  [getClicked, getLeadVariantDiseasesInteractive],
  (clicked, leadVariantDiseases) =>
    leadVariantDiseases.find(d => d.id === clicked.leadVariantDiseaseId)
);
const getClickedEntities = createSelector(
  [
    getClickedGene,
    getClickedVariant,
    getClickedLeadVariant,
    getClickedDisease,
    getClickedGeneVariant,
    getClickedVariantLeadVariant,
    getClickedLeadVariantDisease,
  ],
  (
    gene,
    variant,
    leadVariant,
    disease,
    geneVariant,
    variantLeadVariant,
    leadVariantDisease
  ) => ({
    gene,
    variant,
    leadVariant,
    disease,
    geneVariant,
    variantLeadVariant,
    leadVariantDisease,
  })
);

const getFilterString = createSelector(
  [getFilterG2VScore, getFilterG2VMustHaves, getFilterLD, getFilterGwasPValue],
  (g2vScore, g2vMustHaves, ld, gwasPValue) => {
    const g2vScoreFilter =
      g2vScore[0] !== 0 || g2vScore[1] !== 1
        ? `G2V score within [${g2vScore[0]}, ${g2vScore[1]}]; `
        : '';
    const g2vMustHaveFilter =
      g2vMustHaves.length > 0
        ? `G2V must have evidence from all of [${g2vMustHaves}]; `
        : '';
    const ldFilter =
      ld[0] !== 0.7 || ld[1] !== 1
        ? `LD (r2) within [${ld[0]}, ${ld[1]}]; `
        : '';
    const gwasPValueFilter =
      gwasPValue[0] !== 0 || gwasPValue[1] !== Number.MAX_SAFE_INTEGER
        ? `-log(GWAS p-value) within [${gwasPValue[0]}, ${gwasPValue[1]}]; `
        : '';
    return `# Filters applied: ${g2vScoreFilter}${g2vMustHaveFilter}${ldFilter}${gwasPValueFilter}`;
  }
);

export const selectors = {
  getLocation,
  getChromosome,
  getChromosomeLength,
  getRows,
  getRowsFiltered,
  // entitie ids (filtered)
  getGeneIdsFiltered,
  getDiseaseIdsFiltered,
  // entities (interactive)
  getSlotsInteractive,
  getGenesInteractive,
  getVariantsInteractive,
  getLeadVariantsInteractive,
  getDiseasesInteractive,
  // entity and connector counts (filtered)
  getGenesFilteredCount,
  getVariantsFilteredCount,
  getLeadVariantsFilteredCount,
  getDiseasesFilteredCount,
  getGeneVariantsFilteredCount,
  getVariantLeadVariantsFilteredCount,
  getLeadVariantDiseasesFilteredCount,
  // filter-related
  getMaxMinusLogGwasPValue,
  getFilterG2VScore,
  getFilterString,
  // loading
  getIsLoading,
  // connectors (interactive)
  getGeneVariantsInteractive,
  getVariantLeadVariantsInteractive,
  getLeadVariantDiseasesInteractive,
  getIsInteractive,
  // hover/clicked
  getHoverEntities,
  getClickedEntities,
  getRowsForBrowserTable,
};
