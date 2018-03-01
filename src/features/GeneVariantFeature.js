import React from 'react';
import ConnectorPath from './ConnectorPath';

const GeneVariantFeature = ({
  scale,
  data,
  setHover,
  setClicked,
  highlight,
}) => {
  const { x, y } = scale;
  return (
    <g>
      <ConnectorPath
        topX={x(data.canonicalTranscript.tss)}
        topY={y(1)}
        bottomX={x(data.ldSnpPos)}
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
      />
    </g>
  );
};

export default GeneVariantFeature;
