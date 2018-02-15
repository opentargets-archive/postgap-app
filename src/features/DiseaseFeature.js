import React from 'react';
import Text from 'react-svg-text';

const PADDING = 0.2; // 20%
const calculateDiseaseScaleRange = width => [
  width * PADDING,
  width * (1 - PADDING)
];

const DiseaseFeature = ({ scale, data, diseaseScale, width }) => {
  const { y } = scale;
  diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location
  return (
    <g>
      <circle
        cx={diseaseScale(data.id)}
        cy={y(0.7)}
        r={4}
        style={{ stroke: 'blue', strokeWidth: 2, fill: 'lightgrey' }}
      />
      <Text
        x={diseaseScale(data.id)}
        y={y(0.7) + 10}
        width={150}
        textAnchor="middle"
        verticalAnchor="start"
        style={{ fontSize: '12px' }}
      >
        {data.name}
      </Text>
    </g>
  );
};

export default DiseaseFeature;
