import React, { Component } from 'react';
import BaseDetail from './BaseDetail';

const d = {
    id: 'ENSG00000143126',
    name: 'CELSR2',
    text: 'cadherin EGF LAG seven-pass G-type receptor 2',
}

const GeneDetail = (props) => {
    return <BaseDetail type={'Gene'} title={d.name}>
        {d.text}
    </BaseDetail>
}

export default GeneDetail;
