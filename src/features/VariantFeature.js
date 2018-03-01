import React from 'react';

const VariantFeature = ({
  scale,
  data,
  setHover,
  setClicked,
  highlight,
  dimNonHighlighted,
}) => {
  const { x, y } = scale;
  const variantColor = highlight
    ? 'red'
    : dimNonHighlighted ? 'lightgrey' : 'blue';
  return (
    <g>
      <line
        x1={x(data.pos)}
        y1={y(0)}
        x2={x(data.pos)}
        y2={y(1)}
        style={{ stroke: variantColor, strokeWidth: 2 }}
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
    </g>
  );
};

export default VariantFeature;
