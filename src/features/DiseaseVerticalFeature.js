import React from 'react';

const DiseaseVerticalFeature = ({
  scale,
  data,
  diseaseScale,
  slotOffset,
  slotHeight,
  trackHeight,
  highlight,
  dimNonHighlighted,
}) => {
  const diseaseColor = highlight
    ? 'red'
    : dimNonHighlighted ? 'lightgrey' : 'grey';
  return (
    <line
      x1={diseaseScale(data.efoName)}
      y1={slotOffset + 10}
      x2={diseaseScale(data.efoName)}
      y2={0}
      style={{ stroke: diseaseColor, strokeWidth: 1 }}
    />
  );
};

export default DiseaseVerticalFeature;
