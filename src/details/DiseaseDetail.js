import React from 'react';
import BaseDetail from './BaseDetail';

const DiseaseDetail = ({ disease, closeHandler }) => {
  return (
    <BaseDetail
      type={'Disease'}
      title={disease.efoName}
      closeHandler={closeHandler}
    >
      What should go here?
    </BaseDetail>
  );
};

export default DiseaseDetail;
