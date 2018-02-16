import React from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

import { selectors } from './redux/store';

const COLUMNS = [
  {
    title: 'Entities',
    children: [
      {
        title: 'Gene',
        dataIndex: 'geneName',
        key: 'geneName',
        fixed: 'left'
      },
      {
        title: 'Variant',
        dataIndex: 'ldSnpId',
        key: 'ldSnpId',
        fixed: 'left'
      },
      {
        title: 'Lead Variant',
        dataIndex: 'gwasSnpId',
        key: 'gwasSnpId',
        fixed: 'left'
      },
      {
        title: 'Disease',
        dataIndex: 'efoName',
        key: 'efoName',
        fixed: 'left'
      }
    ]
  },
  {
    title: 'Gene - Variant',
    children: [
      {
        title: 'VEP',
        dataIndex: 'vep',
        key: 'vep'
      },
      {
        title: 'GTEx',
        dataIndex: 'gtex',
        key: 'gtex'
        // sorter: true,
      },
      {
        title: 'PCHiC',
        dataIndex: 'pchic',
        key: 'pchic'
      },
      {
        title: 'DHS',
        dataIndex: 'dhs',
        key: 'dhs'
      },
      {
        title: 'Fantom5',
        dataIndex: 'fantom5',
        key: 'fantom5'
      }
    ]
  },
  {
    title: 'Variant - Lead Variant',
    children: [
      {
        title: 'LD (r2)',
        dataIndex: 'r2',
        key: 'r2'
      }
    ]
  },
  {
    title: 'Lead Variant - Disease',
    children: [
      {
        title: 'p-value',
        dataIndex: 'gwasPValue',
        key: 'gwasPValue'
      },
      {
        title: 'Study Size',
        dataIndex: 'gwasSampleSize',
        key: 'gwasSampleSize'
      }
    ]
  }
];

class BrowserTable extends React.Component {
  render() {
    const { rows } = this.props;
    return (
      <div>
        <CSVLink data={rows} filename="postgap.csv" target="_blank">
          <Button size="small" type="primary">
            CSV
          </Button>
        </CSVLink>
        <CSVLink
          data={rows}
          filename="postgap.tsv"
          target="_blank"
          separator={'\t'}
        >
          <Button size="small" type="primary">
            TSV
          </Button>
        </CSVLink>
        <Table
          dataSource={rows}
          columns={COLUMNS}
          size="small"
          bordered
          scroll={{ x: 800 }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rows: selectors.getRows(state)
  };
};

BrowserTable = connect(mapStateToProps)(BrowserTable);

export default BrowserTable;
