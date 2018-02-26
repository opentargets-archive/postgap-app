import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';
import { LinksVariant, LinksLeadVariant } from '../links';

const VariantLeadVariantDetail = ({ variantLeadVariant, closeHandler }) => {
  const d = variantLeadVariant;
  const tableData = [
    {
      key: 'r2',
      label: 'LD (r2)',
      value: d.r2,
    },
  ];
  const tableColumns = [
    {
      key: 'label',
      title: 'Label',
      dataIndex: 'label',
      render: text => <DictionaryHelpTerm term={text} />,
    },
    {
      key: 'value',
      title: 'Value',
      dataIndex: 'value',
    },
  ];
  return (
    <BaseDetail
      type={'Variant - Lead Variant'}
      title={
        <React.Fragment>
          <LinksVariant variantId={variantLeadVariant.ldSnpId}>
            {variantLeadVariant.ldSnpId}
          </LinksVariant>
          {' - '}
          <LinksLeadVariant leadVariantId={variantLeadVariant.gwasSnpId}>
            {variantLeadVariant.gwasSnpId}
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
