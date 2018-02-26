import React from 'react';

import BaseDetail from './BaseDetail';
import { LinksGene } from '../links';

const GeneDetail = ({ gene, closeHandler }) => {
  if (gene) {
    return (
      <BaseDetail
        type={'Gene'}
        title={<LinksGene geneId={gene.id}>{gene.name}</LinksGene>}
        closeHandler={closeHandler}
      >
        {gene.description}
      </BaseDetail>
    );
  } else {
    return null;
  }
};

export default GeneDetail;
