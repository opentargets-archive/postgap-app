import React from 'react';

const PADDING = 0.2; // 20%
const calculateDiseaseScaleRange = (width) => ([width * PADDING, width * (1 - PADDING)])

const DiseaseFeature = ({ scale, data, diseaseScale, width }) => {
    const { y } = scale;
    diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location
    return (
        <g>
            <circle cx={diseaseScale(data.id)} cy={y(0.6)} r={4} style={{ stroke: 'blue', strokeWidth: 2, fill: 'lightgrey' }} />
            <text x={diseaseScale(data.id)} y={y(0.6)} dy={15} style={{ alignmentBaseline: 'middle', textAnchor: 'middle' }}>
                {data.name}
            </text>
        </g>
    )
}

export default DiseaseFeature;
