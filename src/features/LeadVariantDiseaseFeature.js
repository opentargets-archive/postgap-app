import React from 'react';
import ConnectorPath from './ConnectorPath';

const PADDING = 0.1; // 10%
const calculateDiseaseScaleRange = width => [
  width * PADDING,
  width * (1 - PADDING),
];

const LeadVariantDiseaseFeature = ({
  scale,
  data,
  width,
  diseaseScale,
  setHoverId,
  setClickedId,
  highlight,
  dimNonHighlighted,
}) => {
  const { x, y } = scale;
  diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location

  return (
    <g>
      <ConnectorPath
        topX={x(data.leadSnpPos)}
        topY={y(1)}
        bottomX={diseaseScale(data.efoName)}
        bottomY={y(0)}
        onMouseEnter={() => {
          setHoverId(data.id);
        }}
        onMouseLeave={() => {
          setHoverId(null);
        }}
        onClick={() => {
          setClickedId(data.id);
        }}
        highlight={highlight}
        dimNonHighlighted={dimNonHighlighted}
      />
    </g>
  );
};

export default LeadVariantDiseaseFeature;
