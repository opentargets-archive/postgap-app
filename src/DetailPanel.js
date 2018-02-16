import React from 'react';
import { connect } from 'react-redux';

import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import GeneVariantDetail from './details/GeneVariantDetail';
import { setClickedGene } from './store';

let DetailPanel = ({ hover, clicked, setClickedGene }) => {
  return (
    <React.Fragment>
      {clicked.gene ? (
        <GeneDetail
          gene={clicked.gene}
          closeHandler={() => {
            setClickedGene(null);
          }}
        />
      ) : null}
      {hover.gene ? <GeneDetail gene={hover.gene} /> : null}
      <VariantDetail />
      <GeneVariantDetail />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    hover: state.hover,
    clicked: state.clicked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClickedGene: gene => dispatch(setClickedGene(gene))
  };
};

DetailPanel = connect(mapStateToProps, mapDispatchToProps)(DetailPanel);

export default DetailPanel;
