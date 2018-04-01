import React from 'react';

import { colors } from '../theme';

const VariantFeature = ({
  scale,
  data,
  setHoverId,
  setClickedId,
  highlight,
  dimNonHighlighted,
}) => {
  const { x, y } = scale;
  const variantColor = highlight
    ? colors.secondary
    : dimNonHighlighted ? 'lightgrey' : colors.primary;
  return (
    <line
      x1={x(data.position)}
      y1={y(0)}
      x2={x(data.position)}
      y2={y(1)}
      style={{ stroke: variantColor, strokeWidth: 2 }}
      onMouseEnter={() => {
        setHoverId(data.id);
      }}
      onMouseLeave={() => {
        setHoverId(null);
      }}
      onClick={() => {
        setClickedId(data.id);
      }}
    />
  );
};

export default VariantFeature;
