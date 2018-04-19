import React from 'react';

import BaseTrack from './BaseTrack';
import { DebouncedVariantFeatureSet } from '../features/VariantFeature';

let LeadVariantTrack = ({
    leadVariants,
    isInSelectedState,
    setClicked,
    // setHoverId,
    // setClickedId,
    ...rest
}) => {
    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <BaseTrack {...rest}>
                <DebouncedVariantFeatureSet
                    variants={leadVariants}
                    start={rest.location.start}
                    end={rest.location.end}
                    startDebounced={rest.locationDebounced.startDebounced}
                    endDebounced={rest.locationDebounced.endDebounced}
                    setClicked={variantId => {
                        setClicked(variantId, 'leadVariant');
                    }}
                    dimNonHighlighted={isInSelectedState}
                />
            </BaseTrack>
        </div>
    );
};

export default LeadVariantTrack;
