import React, { Component } from 'react';
import BaseDetail from './BaseDetail';

const d = {
    id: 'ENSG00000143126-rs12740374',
    geneId: 'ENSG00000143126',
    geneName: 'CELSR2',
    variantId: 'rs12740374',
    otScore: 0.65,
    gtex: 0.5,
    pchic: 0,
    nearest: false,
    fantom5: 0,
    vep: 1,
    nearest: 0.638171317463,
    dhs: 0
}

const GeneVariantDetail = (props) => {
    return <BaseDetail type={'G2V'} title={`${d.geneName}:${d.variantId}`}>
        <table>
            <tbody>
                <tr>
                    <td>GTEx</td><td>{d.gtex.toPrecision(3)}</td>
                </tr>
                <tr>
                    <td>PCHiC</td><td>{d.pchic.toPrecision(3)}</td>
                </tr>
                <tr>
                    <td>DHS</td><td>{d.dhs.toPrecision(3)}</td>
                </tr>
                <tr>
                    <td>Fantom5</td><td>{d.fantom5.toPrecision(3)}</td>
                </tr>
            </tbody>
        </table>
    </BaseDetail>
}

export default GeneVariantDetail;
