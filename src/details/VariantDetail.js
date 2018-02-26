import React from 'react';
import BaseDetail from './BaseDetail';
import { LinksVariant } from '../links';

const VariantDetail = ({ variant, closeHandler }) => {
  return (
    <BaseDetail
      type={'Variant'}
      title={<LinksVariant variantId={variant.id}>{variant.id}</LinksVariant>}
      closeHandler={closeHandler}
    >
      {variant.chromosome}:{variant.pos}
    </BaseDetail>
  );
};

export default VariantDetail;
