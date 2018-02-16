import React from 'react';

import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import GeneVariantDetail from './details/GeneVariantDetail';

const DetailPanel = () => {
  return (
    <React.Fragment>
      <GeneDetail />
      <VariantDetail />
      <GeneVariantDetail />
    </React.Fragment>
  );
};

export default DetailPanel;
