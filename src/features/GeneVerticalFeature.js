import React from 'react';

import { colors } from '../theme';

const GeneVerticalFeature = ({
  scale,
  data,
  slotOffset,
  slotHeight,
  trackHeight,
  highlight,
  dimNonHighlighted,
}) => {
  const { x } = scale;
  const geneColor = highlight
    ? colors.secondary
    : dimNonHighlighted ? 'lightgrey' : 'grey';
  return (
    <line
      x1={x(data.canonicalTranscript.tss)}
      y1={slotOffset}
      x2={x(data.canonicalTranscript.tss)}
      y2={trackHeight}
      style={{ stroke: geneColor, strokeWidth: 1 }}
    />
  );
};

export default GeneVerticalFeature;
