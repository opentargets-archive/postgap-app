import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';
import { LinksGene, LinksVariant } from '../links';

const GeneVariantDetail = ({ geneVariant, closeHandler }) => {
  const d = geneVariant;
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
      type={'Gene - Variant'}
      title={
        <React.Fragment>
          <LinksGene geneId={geneVariant.geneId}>
            {geneVariant.geneName}
          </LinksGene>
          {' - '}
          <LinksVariant variantId={geneVariant.ldSnpId}>
            {geneVariant.ldSnpId}
          </LinksVariant>
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

export default GeneVariantDetail;
