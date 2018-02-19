import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import VariantLeadVariantFeature from '../features/VariantLeadVariantFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors
} from '../redux/store';

let VariantLeadVariantTrack = ({
  variantLeadVariants,
  setHover,
  setClicked,
  ...rest
}) => {
  const handlers = { setHover, setClicked };
  return (
    <BaseTrack {...rest}>
      {variantLeadVariants.map(d => {
        return <VariantLeadVariantFeature key={d.id} data={d} {...handlers} />;
      })}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    variantLeadVariants: selectors.getVisibleVariantLeadVariants(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHover: entity =>
      dispatch(
        setHoverEntity({ entityType: ENTITY_TYPE.VARIANT_LEAD_VARIANT, entity })
      ),
    setClicked: entity =>
      dispatch(
        setClickedEntity({
          entityType: ENTITY_TYPE.VARIANT_LEAD_VARIANT,
          entity
        })
      )
  };
};

VariantLeadVariantTrack = connect(mapStateToProps, mapDispatchToProps)(
  VariantLeadVariantTrack
);

export default VariantLeadVariantTrack;
