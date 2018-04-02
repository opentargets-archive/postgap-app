import React from 'react';

import { colors } from '../theme';

const PADDING = 0.1; // 10%
const calculateDiseaseScaleRange = width => [
  width * PADDING,
  width * (1 - PADDING),
];

const DiseaseVerticalFeature = ({
  scale,
  data,
  diseaseScale,
  slotOffset,
  slotHeight,
  width,
  trackHeight,
  highlight,
  dimNonHighlighted,
}) => {
  const diseaseColor = highlight
    ? colors.secondary
    : dimNonHighlighted ? 'lightgrey' : 'grey';
  diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location
  return (
    <line
      x1={diseaseScale(data.name)}
      y1={slotOffset + 10}
      x2={diseaseScale(data.name)}
      y2={0}
      style={{ stroke: diseaseColor, strokeWidth: 1 }}
    />
  );
};

export default DiseaseVerticalFeature;
