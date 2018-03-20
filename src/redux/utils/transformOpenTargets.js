export function transformEvidenceString(r) {
  return {
    efoId: r.disease.id,
    efoName: r.disease.name,
    gwasPubmedUrl: r.unique_association_fields.pubmed_refs,
    gwasPValue: r.evidence.variant2disease.resource_score.value,
    gwasSampleSize: r.evidence.variant2disease.gwas_sample_size,
    gwasSnpId: r.evidence.variant2disease.lead_snp_rsid,
    r2: parseFloat(r.unique_association_fields.r2),
    ldSnpId: r.variant.id.split('/')[4],
    ldSnpPos: r.variant.pos,
    ldSnpChrom: r.variant.chrom,
    gtex: r.evidence.gene2variant.metadata.funcgen.gtex_score,
    pchic: r.evidence.gene2variant.metadata.funcgen.pchic_score,
    dhs: r.evidence.gene2variant.metadata.funcgen.dhs_score,
    fantom5: r.evidence.gene2variant.metadata.funcgen.fantom5_score,
    vep: r.evidence.gene2variant.metadata.funcgen.vep_score,
    otScore: r.evidence.gene2variant.metadata.funcgen.ot_g2v_score,
    geneDescription: r.target.gene_info.name,
    geneName: r.target.target_name,
    geneId: r.target.id,
  };
}
