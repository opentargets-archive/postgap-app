import React from 'react';
import { Table, Button, Col, Row } from 'antd';
import { CSVLink } from 'react-csv';

import { commaSeparate } from './stringFormatters';
import {
  LinksGene,
  LinksVariant,
  LinksLeadVariant,
  LinksDisease,
} from './links';

const renderIntField = value => commaSeparate(value);
const renderVariantField = value => (
  <LinksVariant variantId={value}>{value}</LinksVariant>
);

const renderLeadVariantField = value => (
  <LinksLeadVariant leadVariantId={value}>{value}</LinksLeadVariant>
);
const renderGeneField = (value, row) => (
  <LinksGene geneId={row.geneId}>{value}</LinksGene>
);
const renderDiseaseField = (value, row) => (
  <LinksDisease efoId={row.efoId}>{value}</LinksDisease>
);
const renderNonZeroField = value =>
  value > 0 ? (
    value.toPrecision(3)
  ) : (
    <span style={{ fontStyle: 'italic', color: '#CCC' }}>No data</span>
  );
const comparatorStringField = field => (a, b) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};
const compareNumericField = field => (a, b) => {
  return a[field] - b[field];
};

const COLUMNS = [
  {
    title: 'Entities',
    children: [
      {
        title: 'Gene',
        dataIndex: 'geneName',
        key: 'geneName',
        fixed: 'left',
        render: renderGeneField,
        width: 100,
        sorter: comparatorStringField('geneName'),
      },
      {
        title: 'Variant',
        dataIndex: 'ldSnpId',
        key: 'ldSnpId',
        fixed: 'left',
        render: renderVariantField,
        width: 100,
        sorter: comparatorStringField('ldSnpId'),
      },
      {
        title: 'Lead Variant',
        dataIndex: 'gwasSnpId',
        key: 'gwasSnpId',
        fixed: 'left',
        render: renderLeadVariantField,
        width: 120,
        sorter: comparatorStringField('gwasSnpId'),
      },
      {
        title: 'Disease',
        dataIndex: 'efoName',
        key: 'efoName',
        fixed: 'left',
        render: renderDiseaseField,
        width: 220,
        sorter: comparatorStringField('efoName'),
      },
    ],
  },
  {
    title: 'Gene - Variant',
    children: [
      {
        title: 'VEP',
        dataIndex: 'vep',
        key: 'vep',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('vep'),
      },
      {
        title: 'GTEx',
        dataIndex: 'gtex',
        key: 'gtex',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('gtex'),
      },
      {
        title: 'PCHiC',
        dataIndex: 'pchic',
        key: 'pchic',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('pchic'),
      },
      {
        title: 'DHS',
        dataIndex: 'dhs',
        key: 'dhs',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('dhs'),
      },
      {
        title: 'Fantom5',
        dataIndex: 'fantom5',
        key: 'fantom5',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('fantom5'),
      },
    ],
  },
  {
    title: 'Variant - Lead Variant',
    children: [
      {
        title: 'LD (r2)',
        dataIndex: 'r2',
        key: 'r2',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('r2'),
      },
    ],
  },
  {
    title: 'Lead Variant - Disease',
    children: [
      {
        title: 'p-value',
        dataIndex: 'gwasPValue',
        key: 'gwasPValue',
        render: renderNonZeroField,
        width: 100,
        sorter: compareNumericField('gwasPValue'),
      },
      {
        title: 'Study Size',
        dataIndex: 'gwasSampleSize',
        key: 'gwasSampleSize',
        render: renderIntField,
        width: 100,
        sorter: compareNumericField('gwasSampleSize'),
      },
    ],
  },
];

class EvidenceTable extends React.Component {
  render() {
    const { rows } = this.props;
    return (
      <Col>
        <Row align="right" style={{ paddingBottom: '5px' }}>
          <Col align="right">
            <CSVLink data={rows} filename="postgap.csv" target="_blank">
              <Button
                size="small"
                type="primary"
                ghost
                style={{ marginRight: '5px' }}
              >
                CSV
              </Button>
            </CSVLink>
            <CSVLink
              data={rows}
              filename="postgap.tsv"
              target="_blank"
              separator={'\t'}
            >
              <Button size="small" type="primary" ghost>
                TSV
              </Button>
            </CSVLink>
          </Col>
        </Row>
        <Table
          dataSource={rows}
          columns={COLUMNS}
          size="small"
          bordered
          scroll={{ x: 1500 }}
        />
      </Col>
    );
  }
}

export default EvidenceTable;
