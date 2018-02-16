import React from 'react';

import BaseDetail from './BaseDetail';

const GeneDetail = ({ gene, closeHandler }) => {
  if (gene) {
    return (
      <BaseDetail type={'Gene'} title={gene.name} closeHandler={closeHandler}>
        {gene.description}
      </BaseDetail>
    );
  } else {
    return null;
  }
};

export default GeneDetail;
