import React from 'react';
import ConnectorPath from './ConnectorPath';

const PADDING = 0.2; // 20%
const calculateDiseaseScaleRange = (width) => ([width * PADDING, width * (1 - PADDING)])

const VariantLeadVariantFeature = ({ scale, data, width, diseaseScale }) => {
    const { x, y } = scale;
    diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location

    return <ConnectorPath
        topX={x(data.leadSnpPos)}
        topY={y(1)}
        bottomX={diseaseScale(data.efoId)}
        bottomY={y(0)}
    />
}

export default VariantLeadVariantFeature;
