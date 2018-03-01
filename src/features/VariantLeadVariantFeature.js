import React from 'react';
import ConnectorPath from './ConnectorPath';

const VariantLeadVariantFeature = ({
  scale,
  data,
  setHover,
  setClicked,
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
