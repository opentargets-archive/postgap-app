import React from 'react';
import ConnectorPath from './ConnectorPath';

const VariantLeadVariantFeature = ({
  scale,
  data,
  setHoverId,
  setClickedId,
  highlight,
  dimNonHighlighted,
}) => {
  const { x, y } = scale;
  return (
    <g>
      <ConnectorPath
        topX={x(data.ldSnpPos)}
        topY={y(1)}
        bottomX={x(data.leadSnpPos)}
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

export default VariantLeadVariantFeature;
