// Note: keys should be lower case

const DICTIONARY = {
  otscore:
    'The Open Targets G2V score is an aggregation of the VEP, GTEx, PCHiC, DHS, Fantom5 and Nearest subscores. Within [0, 1].',
  vep:
    'The Variant Effect Predictor (VEP) score is taken as the consequence expressed on a scale from 0 to 4.',
  gtex:
    'The GTEx score is taken as max(1 - p-value) across all tissues for the eQTL between the given target and variant. Within [0, 1].',
  pchic:
    'The PCHiC score is taken as max normalized Promoter Capture Hi-C score (CHiCAGO output) for linked sites containing variant and target (across all tissues). Within [0, 1].',
  dhs:
    'The DHS score is taken as (1 - false discovery rate) for linked sites (via correlated DNase hypersensitivity) containing variant and target. Within [0, 1].',
  fantom5:
    'The Fantom5 score is taken as (1 - false discovery rate) for linked sites (miRNAs and their promoters) containing variant and target. Within [0, 1].',
  r2:
    'The linkage disequilibrium (r2) between the lead variant and the variant.',
  gwaspvalue:
    'The reported p-value from GWAS catalog between the lead variant and disease.',
  gwassamplesize:
    'The reported sample size from GWAS catalog between the lead variant and disease.',
  variants: 'Variants from Ensembl with at least one association.',
  leadvariants:
    'Variants identified as being associated with a disease directly through a GWAS.',
  genes: 'Genes from Ensembl with at least one association.',
  diseases:
    'Diseases identified as being associated with a lead variant through a GWAS.',
};

export default DICTIONARY;
