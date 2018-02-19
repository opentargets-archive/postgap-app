import React from 'react';
import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';

const VariantTrack = props => {
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

export default VariantTrack;
