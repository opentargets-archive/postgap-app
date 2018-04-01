import React from 'react';

import BaseTrack from './BaseTrack';
import VariantLeadVariantFeature from '../features/VariantLeadVariantFeature';

let VariantLeadVariantTrack = ({
  variantLeadVariants,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <BaseTrack {...rest}>
        {variantLeadVariants.map(d => {
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
    </div>
  );
};

export default VariantLeadVariantTrack;
