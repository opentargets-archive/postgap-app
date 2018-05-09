// Note: keys should be lower case

const DICTIONARY = {
    otg2vscore:
        'The Open Targets G2V (gene-to-variant) score is an aggregation of the VEP, GTEx, PCHiC, DHS, Fantom5 and Nearest gene-to-variant subscores. It varies from 0 to 1.',
    otg2vreason:
        'The Open Targets G2V (gene-to-variant) score is an aggregation of the VEP, GTEx, PCHiC, DHS, Fantom5 and Nearest gene-to-variant subscores. This field explains which subscore contributed to the G2V score, with the relative importance (1 for VEP, 2 for functional genomics, 3 for nearest gene).',
    vep:
        'The Variant Effect Predictor (VEP) score is the functional consequence of the variant, e.g. missense, transcript ablation, mapped to a numeric value. It varies from 0 to 1.',
    vepterms:
        'The Variant Effect Predictor (VEP) functional consequences of the variant.',
    gtex:
        'The GTEx score is the max(1 - p-value) across all tissues for the eQTL between gene and variant. It varies from 0 to 1.',
    pchic:
        'The PCHiC score is the max normalized promoter capture Hi-C score (from CHiCAGO output) across all tissues for linked sites containing variant and gene. It varies from 0 to 1.',
    dhs:
        'The DHS score equals (1 - false discovery rate) for linked sites (via correlated DNase hypersensitivity) containing variant and gene. It varies from 0 to 1.',
    fantom5:
        'The Fantom5 score equals (1 - false discovery rate) for linked sites (miRNAs and their promoters) containing variant and gene. It varies from 0 to 1.',
    r2:
        'The r2 value is the linkage disequilibrium correlation between the lead variant and the variant within the EUR population. It varies from 0 to 1 but a lower threshold of 0.7 has been applied. Sites that are in complete linkage disequilibrium are co-inherited (i.e. r2=1).',
    gwaspvalue:
        "The GWAS p-value is the statistical evidence against the null hypothesis that the lead variant is not associated with the disease. It's curated from papers by the GWAS catalog.",
    gwassamplesize:
        "The GWAS sample is the reported size of cases between the lead variant and disease. It's curated from papers by the GWAS catalog.",
    variants:
        'Variants are SNPs and mutations with at least one association with a trait/disease. Data comes from Ensembl.',
    leadvariants:
        'Lead variants are identified as being associated with a disease directly through a GWAS.',
    genes: 'Genes from Ensembl with at least one association.',
    diseases:
        'Diseases identified as being associated with a lead variant through a GWAS.',
};

export default DICTIONARY;
