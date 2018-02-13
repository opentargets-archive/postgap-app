import React from 'react';

const GeneFeature = ({ scale, data }) => {
    const { x, y } = scale;
    const spit = <line 
        x1={x(data.canonicalTranscript.start)} 
        y1={y(0.5)} 
        x2={x(data.canonicalTranscript.end)} 
        y2={y(0.5)} 
        style={{ stroke: 'blue', strokeWidth: 1 }}
    />
    const exons = data.canonicalTranscript.exons.map(d => (
        <rect
            key={d.id}
            x={x(d.start)}
            y={y(1)}
            width={x(d.end) - x(d.start)}
            height={y(0) - y(1)}
            style={{ stroke: 'blue', strokeWidth: 1, fill: 'white'}}
        />
    ))
    const label = (
        <text 
            x={x(data.canonicalTranscript.start)}
            y={y(0.5)}>
            {data.strand === 1 ? `${data.name}>` : `<${data.name}`}
        </text>
    );
    return <g>
        {spit}
        {exons}
        {label}
    </g>
}

export default GeneFeature;
