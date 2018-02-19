import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';

const LeadVariantDiseaseDetail = ({ leadVariantDisease, closeHandler }) => {
  const d = leadVariantDisease;
  const tableData = [
    {
      key: 'gwasPValue',
      label: 'p-value',
      value: d.gwasPValue
    }
  ];
  const tableColumns = [
    {
      key: 'label',
      title: 'Label',
      dataIndex: 'label',
      render: text => <DictionaryHelpTerm term={text} />
    },
    {
      key: 'value',
      title: 'Value',
      dataIndex: 'value'
    }
  ];
  return (
    <BaseDetail
      type={''}
      title={`${d.gwasSnpId} - ${d.efoName}`}
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
