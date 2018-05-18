import React from 'react';
import { Table } from 'antd';

import BaseDetail from './BaseDetail';
import DictionaryTerm from '../../DictionaryTerm/DictionaryTerm';
import { LinksVariant, LinksLeadVariant } from '../../../utils/linkFormatters';
import { renderNonZeroField } from '../../../utils/stringFormatters';

const VariantLeadVariantDetail = ({ variantLeadVariant, closeHandler }) => {
    const d = variantLeadVariant;
    const tableData = [
        {
            key: 'r2',
            label: (
                <span>
                    LD (r<sup>2</sup>)
                </span>
            ),
            value: d.r2,
        },
    ];
    const tableColumns = [
        {
            key: 'label',
            title: 'Label',
            dataIndex: 'label',
            width: 100,
            render: (text, row) => (
                <DictionaryTerm term={row.key} label={row.label} />
            ),
        },
        {
            key: 'value',
            title: 'Value',
            dataIndex: 'value',
            width: 100,
            render: renderNonZeroField,
        },
    ];
    return (
        <BaseDetail
            type={'Variant - Lead Variant'}
            title={
                <React.Fragment>
                    <LinksVariant vId={variantLeadVariant.vId}>
                        {variantLeadVariant.vId}
                    </LinksVariant>
                    {' - '}
                    <LinksLeadVariant lvId={variantLeadVariant.lvId}>
                        {variantLeadVariant.lvId}
                    </LinksLeadVariant>
                </React.Fragment>
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

export default VariantLeadVariantDetail;
