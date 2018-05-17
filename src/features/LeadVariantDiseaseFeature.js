import React from 'react';
import ConnectorPath from './ConnectorPath';

const PADDING = 0.1; // 10%
const calculateDiseaseScaleRange = width => [
    width * PADDING,
    width * (1 - PADDING),
];

const LeadVariantDiseaseFeature = ({
    scale,
    data,
    width,
    diseaseScale,
    setClicked,
    dimNonHighlighted,
}) => {
    const { x, y } = scale;
    diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location

    return (
        <ConnectorPath
            topX={x(data.lvPos)}
            topY={y(1)}
            bottomX={diseaseScale(data.efoName)}
            bottomY={y(0)}
            onClick={() => setClicked(data.id, 'leadVariantDisease')}
            dimNonHighlighted={dimNonHighlighted}
            highlight={data.selected}
        />
    );
};

export default LeadVariantDiseaseFeature;
