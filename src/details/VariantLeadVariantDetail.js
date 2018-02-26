import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';
import { LinksVariant, LinksLeadVariant } from '../links';
import { renderNonZeroField } from '../stringFormatters';

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
      render: (text, row) => (
        <DictionaryHelpTerm term={row.key} label={row.label} />
      ),
    },
    {
      key: 'value',
      title: 'Value',
      dataIndex: 'value',
      render: renderNonZeroField,
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
