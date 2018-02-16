import React from 'react';
import BaseTrack from './BaseTrack';
import VariantLeadVariantFeature from '../features/VariantLeadVariantFeature';

const VariantLeadVariantTrack = props => {
  return (
    <BaseTrack {...props}>
      {props.variantLeadVariants.map(d => {
        return <VariantLeadVariantFeature key={d.id} data={d} />;
      })}
    </BaseTrack>
  );
};

export default VariantLeadVariantTrack;
