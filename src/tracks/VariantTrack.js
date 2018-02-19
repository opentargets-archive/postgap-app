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

let VariantTrack = props => {
  return (
    <BaseTrack {...props}>
      {props.variants.map(d => (
        <VariantFeature
          key={d.id}
          data={d}
          setHoverVariant={props.setHoverVariant}
          setClickedVariant={props.setClickedVariant}
        />
      ))}
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
    setHoverVariant: variant =>
      dispatch(
        setHoverEntity({ entityType: ENTITY_TYPE.VARIANT, entity: variant })
      ),
    setClickedVariant: variant =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.VARIANT, entity: variant })
      )
  };
};

VariantTrack = connect(mapStateToProps, mapDispatchToProps)(VariantTrack);

export default VariantTrack;
