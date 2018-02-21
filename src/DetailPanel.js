import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import LeadVariantDetail from './details/LeadVariantDetail';
import DiseaseDetail from './details/DiseaseDetail';
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

const noClickOrHover = (hover, clicked) => {
  const hasClicked = _.some(Object.values(clicked));
  const hasHover = _.some(Object.values(hover));
  return !(hasClicked || hasHover);
};

let DetailPanel = ({
  hover,
  clicked,
  setClickedGene,
  setClickedVariant,
  setClickedLeadVariant,
  setClickedDisease,
  setClickedGeneVariant,
  setClickedVariantLeadVariant,
  setClickedLeadVariantDisease
}) => {
  const geneHover = showHover(hover.gene, clicked.gene) ? (
    <GeneDetail gene={hover.gene} />
  ) : null;
  const geneClicked = clicked.gene ? (
    <GeneDetail
      gene={clicked.gene}
      closeHandler={() => {
        setClickedGene(null);
      }}
    />
  ) : null;

  const variantHover = showHover(hover.variant, clicked.variant) ? (
    <VariantDetail variant={hover.variant} />
  ) : null;
  const variantClicked = clicked.variant ? (
    <VariantDetail
      variant={clicked.variant}
      closeHandler={() => {
        setClickedVariant(null);
      }}
    />
  ) : null;

  const leadVariantHover = showHover(hover.leadVariant, clicked.leadVariant) ? (
    <LeadVariantDetail leadVariant={hover.leadVariant} />
  ) : null;
  const leadVariantClicked = clicked.leadVariant ? (
    <LeadVariantDetail
      leadVariant={clicked.leadVariant}
      closeHandler={() => {
        setClickedLeadVariant(null);
      }}
    />
  ) : null;

  const diseaseHover = showHover(hover.disease, clicked.disease) ? (
    <DiseaseDetail disease={hover.disease} />
  ) : null;
  const diseaseClicked = clicked.disease ? (
    <DiseaseDetail
      disease={clicked.disease}
      closeHandler={() => {
        setClickedDisease(null);
      }}
    />
  ) : null;

  const geneVariantHover = clicked.geneVariant ? (
    <GeneVariantDetail
      geneVariant={clicked.geneVariant}
      closeHandler={() => {
        setClickedGeneVariant(null);
      }}
    />
  ) : null;
  const geneVariantClicked = showHover(
    hover.geneVariant,
    clicked.geneVariant
  ) ? (
    <GeneVariantDetail geneVariant={hover.geneVariant} />
  ) : null;

  const variantLeadVariantClicked = clicked.variantLeadVariant ? (
    <VariantLeadVariantDetail
      variantLeadVariant={clicked.variantLeadVariant}
      closeHandler={() => {
        setClickedVariantLeadVariant(null);
      }}
    />
  ) : null;
  const variantLeadVariantHover = showHover(
    hover.variantLeadVariant,
    clicked.variantLeadVariant
  ) ? (
    <VariantLeadVariantDetail variantLeadVariant={hover.variantLeadVariant} />
  ) : null;

  const leadVariantDiseaseClicked = clicked.leadVariantDisease ? (
    <LeadVariantDiseaseDetail
      leadVariantDisease={clicked.leadVariantDisease}
      closeHandler={() => {
        setClickedLeadVariantDisease(null);
      }}
    />
  ) : null;
  const leadVariantDiseaseHover = showHover(
    hover.leadVariantDisease,
    clicked.leadVariantDisease
  ) ? (
    <LeadVariantDiseaseDetail leadVariantDisease={hover.leadVariantDisease} />
  ) : null;

  const placeholder = noClickOrHover(hover, clicked) ? (
    <div
      style={{
        border: '2px dashed #aaa',
        color: '#aaa',
        textAlign: 'center',
        height: '100%'
      }}
    >
      No selection
    </div>
  ) : null;

  return (
    <React.Fragment>
      {geneHover}
      {geneClicked}

      {variantClicked}
      {variantHover}

      {leadVariantClicked}
      {leadVariantHover}

      {diseaseClicked}
      {diseaseHover}

      {geneVariantClicked}
      {geneVariantHover}

      {variantLeadVariantClicked}
      {variantLeadVariantHover}

      {leadVariantDiseaseClicked}
      {leadVariantDiseaseHover}

      {placeholder}
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
    setClickedLeadVariant: () =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.LEAD_VARIANT, entity: null })
      ),
    setClickedDisease: () =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.DISEASE, entity: null })
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
