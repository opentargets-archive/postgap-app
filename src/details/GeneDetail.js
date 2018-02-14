import React from 'react';
import { connect } from 'react-redux';

import BaseDetail from './BaseDetail';

let GeneDetail = ({ gene }) => {
  if (gene) {
    return (
      <BaseDetail type={'Gene'} title={gene.name}>
        {gene.description}
      </BaseDetail>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    gene: state.hover.gene
  };
};

GeneDetail = connect(mapStateToProps)(GeneDetail);

export default GeneDetail;
