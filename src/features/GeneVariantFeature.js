import React from 'react';
import ConnectorPath from './ConnectorPath';

const GeneVariantFeature = ({ scale, data, setHover, setClicked }) => {
  const { x, y } = scale;
  return (
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
    />
  );
};

export default GeneVariantFeature;
