import React from 'react';

import BaseTrack from './BaseTrack';
import { DebouncedVariantFeatureSet } from '../features/VariantFeature';

const VariantTrack = ({ variants, isInSelectedState, setClicked, ...rest }) => {
    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <BaseTrack {...rest}>
                <DebouncedVariantFeatureSet
                    variants={variants}
                    start={rest.location.start}
                    end={rest.location.end}
                    startDebounced={rest.locationDebounced.startDebounced}
                    endDebounced={rest.locationDebounced.endDebounced}
                    setClicked={variantId => {
                        setClicked(variantId, 'variant');
                    }}
                    dimNonHighlighted={isInSelectedState}
                />
            </BaseTrack>
        </div>
    );
};

export default VariantTrack;
