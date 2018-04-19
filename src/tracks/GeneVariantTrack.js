import React from 'react';

import BaseTrack from './BaseTrack';
import { DebouncedGeneVariantFeatureSet } from '../features/GeneVariantFeature';

let GeneVariantTrack = ({
    geneVariants,
    isInSelectedState,
    setClicked,
    ...rest
}) => {
    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <BaseTrack {...rest}>
                <DebouncedGeneVariantFeatureSet
                    geneVariants={geneVariants}
                    start={rest.location.start}
                    end={rest.location.end}
                    startDebounced={rest.locationDebounced.startDebounced}
                    endDebounced={rest.locationDebounced.endDebounced}
                    setClicked={setClicked}
                    dimNonHighlighted={isInSelectedState}
                />
            </BaseTrack>
        </div>
    );
};

export default GeneVariantTrack;
