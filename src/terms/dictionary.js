const DICTIONARY = {
    gtex: 'The max(1 - p-value) across all tissues for the eQTL between the target and variant (source: GTEx).',
    pchic: 'The max normalized Promoter Capture Hi-C score (given by CHiCAGO) for linked sites containing variant and target (across all tissues).',
    dhs: '(1 - false discovery rate) for linked sites (via correlated DNase hypersensitivity) containing variant and target (source: DHS).',
    fantom5: '(1 - false discovery rate) for linked sites (miRNAs and their promoters) containing variant and target (source: Fantom5).',
};

export default DICTIONARY;
