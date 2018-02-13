import React from 'react';

const GeneVerticalFeature = ({ scale, data, slotOffset, slotHeight, trackHeight }) => {
    const { x } = scale;

    return <line 
        x1={x(data.canonicalTranscript.start)} 
        y1={slotOffset} 
        x2={x(data.canonicalTranscript.start)} 
        y2={trackHeight} 
        style={{ stroke: 'grey', strokeWidth: 1 }}
    />
}

export default GeneVerticalFeature;
