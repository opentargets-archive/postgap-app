import React, { Component } from 'react';
import BaseDetail from './BaseDetail';

const d = {
    id: 'rs12740374',
    pos: 109274968,
    chromosome: 1,
}

const VariantDetail = (props) => {
    return <BaseDetail type={'Variant'} title={d.id}>
        {d.chromosome}:{d.pos}
    </BaseDetail>
}

export default VariantDetail;
