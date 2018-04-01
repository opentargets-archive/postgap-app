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
    <ConnectorPath
      topX={x(data.variantPosition)}
      topY={y(1)}
      bottomX={x(data.leadVariantPosition)}
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
  );
};

export default VariantLeadVariantFeature;
