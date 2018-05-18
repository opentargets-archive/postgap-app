import React from 'react';

import BaseTrack from './BaseTrack';
import LeadVariantDiseaseFeature from '../features/LeadVariantDiseaseFeature';

let LeadVariantDiseaseTrack = ({
    leadVariantDiseases,
    isInSelectedState,
    setClicked,
    // setHoverId,
    // setClickedId,
    ...rest
}) => {
    // const handlers = { setHoverId, setClickedId };
    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <BaseTrack {...rest}>
                {leadVariantDiseases.map(d => (
                    <LeadVariantDiseaseFeature
                        key={d.id}
                        data={d}
                        setClicked={setClicked}
                        diseaseScale={rest.diseaseScale}
                        highlight={d.selected}
                        dimNonHighlighted={isInSelectedState}
                    />
                ))}
            </BaseTrack>
        </div>
    );
};

export default LeadVariantDiseaseTrack;
