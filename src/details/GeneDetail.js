import React from 'react';
import { Table } from 'antd';

import BaseDetail from './BaseDetail';
import { LinksGene } from '../links';
import { underscoresToSpaces } from '../stringFormatters';

const GeneDetail = ({ gene, closeHandler }) => {
  if (gene) {
    const d = gene;
    const tableData = [
      {
        key: 'geneDescription',
        label: 'Description',
        value: d.geneDescription,
      },
      // {
      //   key: 'location',
      //   label: 'Location',
      //   value: `${d.chromosome}:${commaSeparate(d.start)}-${commaSeparate(d.end)}`,
      // },
      // {
      //   key: 'strand',
      //   label: 'Strand',
      //   value: `${d.strand === 1 ? 'forward' : 'reverse'}`,
      // },
      {
        key: 'biotype',
        label: 'Biotype',
        value: underscoresToSpaces(d.biotype),
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
        type={'Gene'}
        title={
          <LinksGene geneName={gene.name} geneId={gene.id}>
            {gene.name}
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
