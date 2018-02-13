import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';

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
    dhs: 0
}

const GeneVariantDetail = (props) => {
    const tableData = [
        {
            key: 'gtex',
            label: 'GTEx',
            value: d.gtex,
        },
        {
            key: 'pchic',
            label: 'PCHiC',
            value: d.pchic,
        },
        {
            key: 'dhs',
            label: 'DHS',
            value: d.dhs,
        },
        {
            key: 'fantom5',
            label: 'Fantom5',
            value: d.fantom5,
        }
    ];
    const tableColumns = [
        {
            key: 'label',
            title: 'Label',
            dataIndex: 'label',
            render: (text) => <DictionaryHelpTerm term={text} />,
        },
        {
            key: 'value',
            title: 'Value',
            dataIndex: 'value',
        }
    ]
    return <BaseDetail type={'G2V'} title={`${d.geneName} - ${d.variantId}`}>
        <Table
            dataSource={tableData}
            columns={tableColumns}
            size='small'
            pagination={false}
            showHeader={false}
        />
    </BaseDetail>
}

export default GeneVariantDetail;
