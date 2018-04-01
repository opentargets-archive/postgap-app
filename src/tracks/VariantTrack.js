import React from 'react';

import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';

const VariantTrack = ({
  variants,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
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
    </div>
  );
};

export default VariantTrack;
