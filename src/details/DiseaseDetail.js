import React from 'react';

import BaseDetail from './BaseDetail';
import { LinksDisease } from '../links';

const DiseaseDetail = ({ disease, closeHandler }) => {
  return (
    <BaseDetail
      type={'Disease'}
      title={
        <LinksDisease efoId={disease.efoId}>{disease.efoName}</LinksDisease>
      }
      closeHandler={closeHandler}
    >
      What should go here?
    </BaseDetail>
  );
};

export default DiseaseDetail;
