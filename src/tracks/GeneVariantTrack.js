import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import GeneVariantFeature from '../features/GeneVariantFeature';
import {
  setHoverEntityId,
  setClickedEntityId,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

let GeneVariantTrack = ({
  geneVariantsInteractive,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  return (
    <BaseTrack {...rest}>
      {geneVariantsInteractive.map(d => (
        <GeneVariantFeature
          key={d.id}
          data={d}
          {...handlers}
          highlight={d.interactive}
          dimNonHighlighted={isInteractive}
        />
      ))}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    geneVariantsInteractive: selectors.getGeneVariantsInteractive(state),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverId: entityId =>
      dispatch(
        setHoverEntityId({ entityType: ENTITY_TYPE.GENE_VARIANT, entityId })
      ),
    setClickedId: entityId =>
      dispatch(
        setClickedEntityId({ entityType: ENTITY_TYPE.GENE_VARIANT, entityId })
      ),
  };
};

GeneVariantTrack = connect(mapStateToProps, mapDispatchToProps)(
  GeneVariantTrack
);

export default GeneVariantTrack;
