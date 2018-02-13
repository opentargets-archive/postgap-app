import React from 'react';

const ConnectorPath = ({ topX, topY, bottomX, bottomY }) => {
    const controlY = (bottomY + topY) / 2;
    const d = `M${topX},${topY} C${topX},${controlY}, ${bottomX},${controlY} ${bottomX},${bottomY}`;
    return <path
        d={d}
        style={{ stroke: 'grey', strokeWidth: 1, fill: 'none' }}
    />;
}

export default ConnectorPath;
