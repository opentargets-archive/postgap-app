import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';
import {
  setHoverEntityId,
  setClickedEntityId,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

let VariantTrack = ({
  variants,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  return (
    <BaseTrack {...rest}>
      {variants.map(d => (
        <VariantFeature
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
    variants: selectors.getVariantsInteractive(state),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverId: entityId =>
      dispatch(setHoverEntityId({ entityType: ENTITY_TYPE.VARIANT, entityId })),
    setClickedId: entityId =>
      dispatch(
        setClickedEntityId({ entityType: ENTITY_TYPE.VARIANT, entityId })
      ),
  };
};

VariantTrack = connect(mapStateToProps, mapDispatchToProps)(VariantTrack);

export default VariantTrack;
