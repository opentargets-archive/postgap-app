import React from 'react';
import { Table } from 'antd';

import BaseDetail from './BaseDetail';
import { LinksLeadVariant } from '../links';
import { commaSeparate } from '../stringFormatters';

const LeadVariantDetail = ({ leadVariant, closeHandler }) => {
  const d = leadVariant;
  const tableData = [
    {
      key: 'location',
      label: 'Location',
      value: `${d.chromosome}:${commaSeparate(d.pos)}`,
    },
  ];
  const tableColumns = [
    {
      key: 'label',
      title: 'Label',
      dataIndex: 'label',
    },
    {
      key: 'value',
      title: 'Value',
      dataIndex: 'value',
    },
  ];
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
