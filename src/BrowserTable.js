import React from 'react';
import { Table, Button, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import { selectors } from './redux/store';
import { commaSeparate } from './stringFormatters';

const renderIntField = value => commaSeparate(value);
const renderVariantField = value => (
  <a
    href={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${value}`}
    target={'_blank'}
  >
    {value}
  </a>
);
const renderNonZeroField = value =>
  value > 0 ? (
    value.toPrecision(3)
  ) : (
    <span style={{ fontStyle: 'italic', color: '#CCC' }}>No data</span>
  );

const COLUMNS = [
  {
    title: 'Entities',
    children: [
      {
        title: 'Gene',
        dataIndex: 'geneName',
        key: 'geneName',
        fixed: 'left',
        width: 100
      },
      {
        title: 'Variant',
        dataIndex: 'ldSnpId',
        key: 'ldSnpId',
        fixed: 'left',
        render: renderVariantField,
        width: 100
      },
      {
        title: 'Lead Variant',
        dataIndex: 'gwasSnpId',
        key: 'gwasSnpId',
        fixed: 'left',
        render: renderVariantField,
        width: 120
      },
      {
        title: 'Disease',
        dataIndex: 'efoName',
        key: 'efoName',
        fixed: 'left',
        width: 220
      }
    ]
  },
  {
    title: 'Gene - Variant',
    children: [
      {
        title: 'VEP',
        dataIndex: 'vep',
        key: 'vep',
        render: renderNonZeroField,
        width: 100
      },
      {
        title: 'GTEx',
        dataIndex: 'gtex',
        key: 'gtex',
        render: renderNonZeroField,
        width: 100
        // sorter: true,
      },
      {
        title: 'PCHiC',
        dataIndex: 'pchic',
        key: 'pchic',
        render: renderNonZeroField,
        width: 100
      },
      {
        title: 'DHS',
        dataIndex: 'dhs',
        key: 'dhs',
        render: renderNonZeroField,
        width: 100
      },
      {
        title: 'Fantom5',
        dataIndex: 'fantom5',
        key: 'fantom5',
        render: renderNonZeroField,
        width: 100
      }
    ]
  },
  {
    title: 'Variant - Lead Variant',
    children: [
      {
        title: 'LD (r2)',
        dataIndex: 'r2',
        key: 'r2',
        render: renderNonZeroField,
        width: 100
      }
    ]
  },
  {
    title: 'Lead Variant - Disease',
    children: [
      {
        title: 'p-value',
        dataIndex: 'gwasPValue',
        key: 'gwasPValue',
        render: renderNonZeroField,
        width: 100
      },
      {
        title: 'Study Size',
        dataIndex: 'gwasSampleSize',
        key: 'gwasSampleSize',
        render: renderIntField,
        width: 100
      }
    ]
  }
];

class BrowserTable extends React.Component {
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

const mapStateToProps = state => {
  return {
    rows: selectors.getRowsFiltered(state)
  };
};

BrowserTable = connect(mapStateToProps)(BrowserTable);

export default BrowserTable;
