import React from 'react';
import ConnectorPath from './ConnectorPath';

const VariantLeadVariantFeature = ({ scale, data }) => {
    const { x, y } = scale;
    return <ConnectorPath
        topX={x(data.ldSnpPos)}
        topY={y(0)}
        bottomX={x(data.leadSnpPos)}
        bottomY={y(1)}
    />
}

export default VariantLeadVariantFeature;
