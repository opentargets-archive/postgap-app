import React from 'react';
import BaseDetail from './BaseDetail';

const VariantDetail = ({ variant, closeHandler }) => {
  return (
    <BaseDetail type={'Variant'} title={variant.id} closeHandler={closeHandler}>
      {variant.chromosome}:{variant.pos}
    </BaseDetail>
  );
};

export default VariantDetail;
