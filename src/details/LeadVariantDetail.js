import React from 'react';
import BaseDetail from './BaseDetail';
import { LinksLeadVariant } from '../links';

const LeadVariantDetail = ({ leadVariant, closeHandler }) => {
  return (
    <BaseDetail
      type={'Lead Variant'}
      title={
        <LinksLeadVariant leadVariantId={leadVariant.id}>
          {leadVariant.id}
        </LinksLeadVariant>
      }
      closeHandler={closeHandler}
    >
      {leadVariant.chromosome}:{leadVariant.pos}
    </BaseDetail>
  );
};

export default LeadVariantDetail;
