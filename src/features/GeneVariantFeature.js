import React from 'react';
import ConnectorPath from './ConnectorPath';

const GeneVariantFeature = ({ scale, data }) => {
    const { x, y } = scale;
    return <ConnectorPath
        topX={x(data.geneTss)}
        topY={y(1)}
        bottomX={x(data.ldSnpPos)}
        bottomY={y(0)}
    />
}

export default GeneVariantFeature;
