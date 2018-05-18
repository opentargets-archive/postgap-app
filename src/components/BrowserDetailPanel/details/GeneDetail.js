import React from 'react';
import { Table } from 'antd';

import BaseDetail from './BaseDetail';
import { LinksGene } from '../../../utils/links';

const GeneDetail = ({ gene, closeHandler }) => {
    if (gene) {
        const d = gene;
        const tableData = [
            {
                key: 'description',
                label: 'Description',
                value: d.description,
            },
        ];
        const tableColumns = [
            {
                key: 'label',
                title: 'Label',
                dataIndex: 'label',
                width: 100,
            },
            {
                key: 'value',
                title: 'Value',
                dataIndex: 'value',
                width: 100,
            },
        ];
        return (
            <BaseDetail
                type={'Gene'}
                title={
                    <LinksGene geneName={gene.symbol} geneId={gene.id}>
                        {gene.symbol}
                    </LinksGene>
                }
                closeHandler={closeHandler}
            >
                <Table
                    dataSource={tableData}
                    columns={tableColumns}
                    size="small"
                    pagination={false}
                    showHeader={false}
                />
            </BaseDetail>
        );
    } else {
        return null;
    }
};

export default GeneDetail;
