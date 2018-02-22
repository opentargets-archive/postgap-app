import React from 'react';
import { connect } from 'react-redux';

import EvidenceTable from './EvidenceTable';

const mapStateToProps = state => {
  return {
    rows: state.diseasePage.rows,
    loading: state.diseasePage.loading
  };
};

const DiseaseTable = connect(mapStateToProps)(EvidenceTable);

export default DiseaseTable;
