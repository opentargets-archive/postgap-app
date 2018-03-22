import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import VariantLeadVariantFeature from '../features/VariantLeadVariantFeature';
import {
  setHoverEntityId,
  setClickedEntityId,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

let VariantLeadVariantTrack = ({
  variantLeadVariantsInteractive,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  return (
    <BaseTrack {...rest}>
      {variantLeadVariantsInteractive.map(d => {
        return (
          <VariantLeadVariantFeature
            key={d.id}
            data={d}
            {...handlers}
            highlight={d.interactive}
            dimNonHighlighted={isInteractive}
          />
        );
      })}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    variantLeadVariantsInteractive: selectors.getVariantLeadVariantsInteractive(
      state
    ),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverId: entityId =>
      dispatch(
        setHoverEntityId({
          entityType: ENTITY_TYPE.VARIANT_LEAD_VARIANT,
          entityId,
        })
      ),
    setClickedId: entityId =>
      dispatch(
        setClickedEntityId({
          entityType: ENTITY_TYPE.VARIANT_LEAD_VARIANT,
          entityId,
        })
      ),
  };
};

VariantLeadVariantTrack = connect(mapStateToProps, mapDispatchToProps)(
  VariantLeadVariantTrack
);

export default VariantLeadVariantTrack;
