import React from 'react';
import { connect } from 'react-redux';

import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import GeneVariantDetail from './details/GeneVariantDetail';
import { setClickedEntity, ENTITY_TYPE } from './redux/store';

let DetailPanel = ({
  hover,
  clicked,
  setClickedGene,
  setClickedVariant,
  setClickedGeneVariant
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
      {hover.gene ? <GeneDetail gene={hover.gene} /> : null}
      {clicked.variant ? (
        <VariantDetail
          variant={clicked.variant}
          closeHandler={() => {
            setClickedVariant(null);
          }}
        />
      ) : null}
      {hover.variant ? <VariantDetail variant={hover.variant} /> : null}
      {clicked.geneVariant ? (
        <GeneVariantDetail
          geneVariant={clicked.geneVariant}
          closeHandler={() => {
            setClickedGeneVariant(null);
          }}
        />
      ) : null}
      {hover.geneVariant ? (
        <GeneVariantDetail geneVariant={hover.geneVariant} />
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
    setClickedGene: gene =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.GENE, entity: null })
      ),
    setClickedVariant: variant =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.VARIANT, entity: null })
      ),
    setClickedGeneVariant: geneVariant =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.GENE_VARIANT, entity: null })
      )
  };
};

DetailPanel = connect(mapStateToProps, mapDispatchToProps)(DetailPanel);

export default DetailPanel;
