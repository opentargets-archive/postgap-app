import React from 'react';
import ConnectorPath from './ConnectorPath';

const PADDING = 0.2; // 20%
const calculateDiseaseScaleRange = width => [
  width * PADDING,
  width * (1 - PADDING),
];

const VariantLeadVariantFeature = ({
  scale,
  data,
  width,
  diseaseScale,
  setHover,
  setClicked,
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
        bottomX={diseaseScale(data.efoId)}
        bottomY={y(0)}
        onMouseEnter={() => {
          setHover(data);
        }}
        onMouseLeave={() => {
          setHover(null);
        }}
        onClick={() => {
          setClicked(data);
        }}
        highlight={highlight}
        dimNonHighlighted={dimNonHighlighted}
      />
    </g>
  );
};

export default VariantLeadVariantFeature;
