export function transformEnsemblGene(d) {
  const {
    id,
    display_name,
    description,
    start,
    end,
    strand,
    seq_region_name,
    biotype,
    Transcript
  } = d;
  let canonicalTranscript = Transcript.filter(t => t.is_canonical === 1).map(
    t => {
      const { id, start, end, strand, Exon, Translation } = t;
      const exons = Exon.map(ex => ({
        id: ex.id,
        start: ex.start,
        end: ex.end
      }));
      const translation = Translation
        ? {
            translationStart: Translation.start,
            translationEnd: Translation.end
          }
        : {};
      const tss = strand === 1 ? start : end; // tss depends on strand
      return {
        id,
        start,
        end,
        strand,
        exons,
        tss,
        ...translation
      };
    }
  );
  if (canonicalTranscript.length === 1) {
    canonicalTranscript = canonicalTranscript[0];
  } else {
    canonicalTranscript = null; // no transcript
  }
  return {
    id,
    description,
    start,
    end,
    strand,
    biotype,
    name: display_name,
    chromosome: seq_region_name,
    canonicalTranscript
  };
}

export function transformEnsemblVariant(d) {
  return {
    id: d.name,
    maf: d.MAF,
    ancestralAllele: d.ancestral_allele,
    minorAllele: d.minor_allele,
    pos: d.mappings[0].start,
    chrom: d.mappings[0].seq_region_name
  };
}
