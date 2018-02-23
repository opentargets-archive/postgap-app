import React from 'react';
import BaseTrack from './BaseTrack';
import ScaleFeature from '../features/ScaleFeature';

const ScaleTrack = props => {
  return (
    <BaseTrack {...props}>
      <ScaleFeature />
    </BaseTrack>
  );
};

export default ScaleTrack;
