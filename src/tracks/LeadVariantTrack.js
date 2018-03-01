import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

let LeadVariantTrack = ({
  leadVariants,
  isInteractive,
  setHover,
  setClicked,
  ...rest
}) => {
  const handlers = { setHover, setClicked };
  return (
    <BaseTrack {...rest}>
      {leadVariants.map(d => (
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
    leadVariants: selectors.getVisibleLeadVariants(state),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHover: variant =>
      dispatch(
        setHoverEntity({
          entityType: ENTITY_TYPE.LEAD_VARIANT,
          entity: variant,
        })
      ),
    setClicked: variant =>
      dispatch(
        setClickedEntity({
          entityType: ENTITY_TYPE.LEAD_VARIANT,
          entity: variant,
        })
      ),
  };
};

LeadVariantTrack = connect(mapStateToProps, mapDispatchToProps)(
  LeadVariantTrack
);

export default LeadVariantTrack;
