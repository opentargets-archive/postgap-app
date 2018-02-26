import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';
import { LinksLeadVariant, LinksDisease } from '../links';

const LeadVariantDiseaseDetail = ({ leadVariantDisease, closeHandler }) => {
  const d = leadVariantDisease;
  const tableData = [
    {
      key: 'gwasPValue',
      label: 'p-value',
      value: d.gwasPValue,
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
    },
  ];
  return (
    <BaseDetail
      type={'Lead Variant - Disease'}
      title={
        <React.Fragment>
          <LinksLeadVariant leadVariantId={leadVariantDisease.gwasSnpId}>
            {leadVariantDisease.gwasSnpId}
          </LinksLeadVariant>
          {' - '}
          <LinksDisease efoId={leadVariantDisease.efoId}>
            {leadVariantDisease.efoName}
          </LinksDisease>
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

export default LeadVariantDiseaseDetail;
