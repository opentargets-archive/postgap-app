import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors
} from '../redux/store';

let VariantTrack = ({ variants, setHover, setClicked, ...rest }) => {
  const handlers = { setHover, setClicked };
  return (
    <BaseTrack {...rest}>
      {variants.map(d => <VariantFeature key={d.id} data={d} {...handlers} />)}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    variants: selectors.getVisibleVariants(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHover: variant =>
      dispatch(
        setHoverEntity({ entityType: ENTITY_TYPE.VARIANT, entity: variant })
      ),
    setClicked: variant =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.VARIANT, entity: variant })
      )
  };
};

VariantTrack = connect(mapStateToProps, mapDispatchToProps)(VariantTrack);

export default VariantTrack;
