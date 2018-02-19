import React from 'react';
import BaseDetail from './BaseDetail';

const LeadVariantDetail = ({ leadVariant, closeHandler }) => {
  return (
    <BaseDetail
      type={'Lead Variant'}
      title={leadVariant.id}
      closeHandler={closeHandler}
    >
      {leadVariant.chromosome}:{leadVariant.pos}
    </BaseDetail>
  );
};

export default LeadVariantDetail;
