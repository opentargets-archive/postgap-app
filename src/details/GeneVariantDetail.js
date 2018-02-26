import React from 'react';
import { Table } from 'antd';
import BaseDetail from './BaseDetail';
import DictionaryHelpTerm from '../terms/DictionaryHelpTerm';
import { LinksGene, LinksVariant } from '../links';
import { renderNonZeroField } from '../stringFormatters';

const GeneVariantDetail = ({ geneVariant, closeHandler }) => {
  const d = geneVariant;
  const tableData = [
    {
      key: 'otScore',
      label: 'G2V Score',
      value: d.otScore,
    },
    {
      key: 'vep',
      label: 'VEP',
      value: d.vep,
    },
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
