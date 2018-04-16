import React from 'react';

import BaseTrack from './BaseTrack';
import { DebouncedVariantLeadVariantFeatureSet } from '../features/VariantLeadVariantFeature';

let VariantLeadVariantTrack = ({
  variantLeadVariants,
  isInteractive,
  setClicked,
  // setHoverId,
  // setClickedId,
  ...rest
}) => {
  // const handlers = { setHoverId, setClickedId };
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <BaseTrack {...rest}>
        <DebouncedVariantLeadVariantFeatureSet
          variantLeadVariants={variantLeadVariants}
          start={rest.location.start}
          end={rest.location.end}
          startDebounced={rest.locationDebounced.startDebounced}
          endDebounced={rest.locationDebounced.endDebounced}
          setClicked={setClicked}
        />
      </BaseTrack>
    </div>
  );
};

export default VariantLeadVariantTrack;
