import React from 'react';

const VariantFeature = ({ scale, data }) => {
    const { x, y } = scale;
    return <line 
        x1={x(data.pos)} 
        y1={y(0)} 
        x2={x(data.pos)} 
        y2={y(1)} 
        style={{ stroke: 'blue', strokeWidth: 2 }} />
}

export default VariantFeature;
