import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import GeneVariantFeature from '../features/GeneVariantFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors
} from '../redux/store';

let GeneVariantTrack = ({ geneVariants, setHover, setClicked, ...rest }) => {
  const handlers = { setHover, setClicked };
  return (
    <BaseTrack {...rest}>
      {geneVariants.map(d => (
        <GeneVariantFeature key={d.id} data={d} {...handlers} />
      ))}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    geneVariants: selectors.getVisibleGeneVariants(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHover: entity =>
      dispatch(
        setHoverEntity({ entityType: ENTITY_TYPE.GENE_VARIANT, entity })
      ),
    setClicked: entity =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.GENE_VARIANT, entity })
      )
  };
};

GeneVariantTrack = connect(mapStateToProps, mapDispatchToProps)(
  GeneVariantTrack
);

export default GeneVariantTrack;
