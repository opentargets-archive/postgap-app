import React from 'react';

import { colors } from '../theme';

export const DebouncedVariantFeatureSet = ({
  start,
  end,
  startDebounced,
  endDebounced,
  children,
  scale,
  range,
  variants,
}) => {
  const { x } = scale;
  const width = x.range()[1] - x.range()[0];
  const translateX = -(start - startDebounced);
  const scaleFactorX = width / (end - start);
  return (
    <g
      transform={`scale(${scaleFactorX},1) translate(${translateX},0)`}
      strokeWidth={2.0 / scaleFactorX}
    >
      {variants.map(d => (
        <VariantFeature
          key={d.id}
          data={d}
          x={d.position - startDebounced}
          height={20}
        />
      ))}
    </g>
  );
};

const VariantFeature = props => {
  const {
    data,
    x,
    height,
    // setHoverId,
    // setClickedId,
    // highlight,
    // dimNonHighlighted,
  } = props;
  const variantColor = colors.primary;
  // highlight
  //   ? colors.secondary
  //   : dimNonHighlighted ? 'lightgrey' : colors.primary;

  return (
    <line x1={x} y1={0} x2={x} y2={height} style={{ stroke: variantColor }} />
  );
};

{
  /* onMouseEnter={() => {
        setHoverId(data.id);
      }}
      onMouseLeave={() => {
        setHoverId(null);
      }}
      onClick={() => {
        setClickedId(data.id);
      }} */
}

export default VariantFeature;
