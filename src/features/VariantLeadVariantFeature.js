import React from 'react';
import ConnectorPath from './ConnectorPath';

const VariantLeadVariantFeature = ({ scale, data }) => {
    const { x, y } = scale;
    return <ConnectorPath
        topX={x(data.ldSnpPos)}
        topY={y(1)}
        bottomX={x(data.leadSnpPos)}
        bottomY={y(0)}
    />
}

export default VariantLeadVariantFeature;
