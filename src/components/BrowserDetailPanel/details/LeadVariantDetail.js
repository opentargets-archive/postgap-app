import React from 'react';
import { Table } from 'antd';

import BaseDetail from './BaseDetail';
import { LinksLeadVariant } from '../../../links';
import { commaSeparate } from '../../../stringFormatters';

const LeadVariantDetail = ({ leadVariant, closeHandler, chromosome }) => {
    const d = leadVariant;
    const tableData = [
        {
            key: 'location',
            label: 'Location',
            value: `${chromosome}:${commaSeparate(d.position)}`,
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
            type={'Lead Variant'}
            title={
                <LinksLeadVariant lvId={leadVariant.id}>
                    {leadVariant.id}
                </LinksLeadVariant>
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
};

export default LeadVariantDetail;
