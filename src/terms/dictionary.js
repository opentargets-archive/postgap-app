// Note: keys should be lower case

const DICTIONARY = {
  otscore:
    'The Open Targets G2V score is an aggregate score based upon VEP, GTEx, PCHiC, DHS, Fantom5 and Nearest fields.',
  vep:
    'The Variant Effect Predictor consequence expressed on a scale from 0 to 4.',
  gtex:
    'The max(1 - p-value) across all tissues for the eQTL between the target and variant (source: GTEx).',
  pchic:
    'The max normalized Promoter Capture Hi-C score (given by CHiCAGO) for linked sites containing variant and target (across all tissues).',
  dhs:
    '(1 - false discovery rate) for linked sites (via correlated DNase hypersensitivity) containing variant and target (source: DHS).',
  fantom5:
    '(1 - false discovery rate) for linked sites (miRNAs and their promoters) containing variant and target (source: Fantom5).',
  r2: 'The linkage disequilibrium between the lead variant and the variant.',
  gwaspvalue: 'The reported p-value from GWAS catalog.',
  gwassamplesize: 'The reported sample size from GWAS catalog.',
  variants: 'Single nucleotide polymorphisms.',
  leadvariants:
    'Single nucleotide polymorphisms identified as being associated with a disease through a GWAS.',
  genes: 'Genes from Ensembl.',
  diseases:
    'Diseases identified as being associated with a lead variant through a GWAS.',
};

export default DICTIONARY;
