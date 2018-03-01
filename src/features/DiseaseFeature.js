import React from 'react';
import Text from 'react-svg-text';

const PADDING = 0.2; // 20%
const calculateDiseaseScaleRange = width => [
  width * PADDING,
  width * (1 - PADDING),
];

// TODO: Fork and fix appended svg from react-svg-text
const DiseaseFeature = ({
  scale,
  data,
  diseaseScale,
  width,
  setHover,
  setClicked,
  highlight,
  dimNonHighlighted,
}) => {
  const { y } = scale;
  diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location
  const diseaseColor = highlight
    ? 'red'
    : dimNonHighlighted ? 'lightgrey' : 'blue';
  return (
    <g transform={`translate(${diseaseScale(data.efoId)},${y(0.7)})`}>
      <circle
        cx={0}
        cy={0}
        r={4}
        style={{ stroke: diseaseColor, strokeWidth: 2, fill: 'white' }}
        onMouseEnter={() => {
          setHover(data);
        }}
        onMouseLeave={() => {
          setHover(null);
        }}
        onClick={() => {
          setClicked(data);
        }}
      />
      <Text
        x={0}
        y={10}
        width={150}
        textAnchor="middle"
        verticalAnchor="start"
        style={{ fontSize: '12px' }}
      >
        {data.efoName}
      </Text>
      {/* <text x={0} y={20} textAnchor="middle" style={{ fontSize: '12px' }}>
        {data.efoName}
      </text> */}
    </g>
  );
};

export default DiseaseFeature;
