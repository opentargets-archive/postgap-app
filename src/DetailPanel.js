import React from 'react';
import { connect } from 'react-redux';

import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import GeneVariantDetail from './details/GeneVariantDetail';
import VariantLeadVariantDetail from './details/VariantLeadVariantDetail';
import LeadVariantDiseaseDetail from './details/LeadVariantDiseaseDetail';
import { setClickedEntity, ENTITY_TYPE } from './redux/store';

const showHover = (hover, clicked) => {
  const hoverEqualsClicked = hover && clicked && hover.id === clicked.id;
  if (!clicked) {
    return hover;
  }
  return hover && !hoverEqualsClicked;
};

let DetailPanel = ({
  hover,
  clicked,
  setClickedGene,
  setClickedVariant,
  setClickedGeneVariant,
  setClickedVariantLeadVariant,
  setClickedLeadVariantDisease
}) => {
  return (
    <React.Fragment>
      {clicked.gene ? (
        <GeneDetail
          gene={clicked.gene}
          closeHandler={() => {
            setClickedGene(null);
          }}
        />
      ) : null}
      {showHover(hover.gene, clicked.gene) ? (
        <GeneDetail gene={hover.gene} />
      ) : null}

      {clicked.variant ? (
        <VariantDetail
          variant={clicked.variant}
          closeHandler={() => {
            setClickedVariant(null);
          }}
        />
      ) : null}
      {showHover(hover.variant, clicked.variant) ? (
        <VariantDetail variant={hover.variant} />
      ) : null}

      {clicked.geneVariant ? (
        <GeneVariantDetail
          geneVariant={clicked.geneVariant}
          closeHandler={() => {
            setClickedGeneVariant(null);
          }}
        />
      ) : null}
      {showHover(hover.geneVariant, clicked.geneVariant) ? (
        <GeneVariantDetail geneVariant={hover.geneVariant} />
      ) : null}

      {clicked.variantLeadVariant ? (
        <VariantLeadVariantDetail
          variantLeadVariant={clicked.variantLeadVariant}
          closeHandler={() => {
            setClickedVariantLeadVariant(null);
          }}
        />
      ) : null}
      {showHover(hover.variantLeadVariant, clicked.variantLeadVariant) ? (
        <VariantLeadVariantDetail
          variantLeadVariant={hover.variantLeadVariant}
        />
      ) : null}

      {clicked.leadVariantDisease ? (
        <LeadVariantDiseaseDetail
          leadVariantDisease={clicked.leadVariantDisease}
          closeHandler={() => {
            setClickedLeadVariantDisease(null);
          }}
        />
      ) : null}
      {showHover(hover.leadVariantDisease, clicked.leadVariantDisease) ? (
        <LeadVariantDiseaseDetail
          leadVariantDisease={hover.leadVariantDisease}
        />
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    hover: state.hover,
    clicked: state.clicked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClickedGene: () =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.GENE, entity: null })
      ),
    setClickedVariant: () =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.VARIANT, entity: null })
      ),
    setClickedGeneVariant: () =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.GENE_VARIANT, entity: null })
      ),
    setClickedVariantLeadVariant: () =>
      dispatch(
        setClickedEntity({
          entityType: ENTITY_TYPE.VARIANT_LEAD_VARIANT,
          entity: null
        })
      ),
    setClickedLeadVariantDisease: () =>
      dispatch(
        setClickedEntity({
          entityType: ENTITY_TYPE.LEAD_VARIANT_DISEASE,
          entity: null
        })
      )
  };
};

DetailPanel = connect(mapStateToProps, mapDispatchToProps)(DetailPanel);

export default DetailPanel;
