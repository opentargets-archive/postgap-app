import React, { Component } from 'react';
import './App.css';

import { Card, Row, Col, Slider, Checkbox, Layout, Affix } from 'antd';

import Browser from './Browser';
import BrowserTable from './BrowserTable';

import VariantLeadVariantFilter from './filters/VariantLeadVariantFilter';
import DetailPanel from './DetailPanel';

class App extends Component {
  render() {
    const g2vOptions = ['VEP', 'GTEx', 'PCHiC', 'DHS', 'Fantom5'];
    let g2vChecked = ['VEP', 'GTEx', 'PCHiC', 'DHS', 'Fantom5'];
    return (
      <Layout>
        <Affix>
          <Layout.Header
            style={{
              background: '#ECECEC',
              borderBottom: '2px solid green',
              paddingLeft: '30px'
            }}
          >
            <h1 style={{ color: '#555' }}>
              <span style={{ fontWeight: 'bold' }}>Open Targets </span>
              <span style={{ fontWeight: 100, color: 'blue' }}>POSTGAP</span>
            </h1>
          </Layout.Header>
        </Affix>

        <Layout.Content style={{ background: '#ECECEC', padding: '30px' }}>
          <Col gutter={6}>
            <Row gutter={16}>
              <Col span={6}>
                <Card title="G2V Filter">
                  <Checkbox.Group options={g2vOptions} value={g2vChecked} />
                </Card>
              </Col>
              <Col span={6}>
                <VariantLeadVariantFilter />
              </Col>
              <Col span={6}>
                <Card title="LeadV2D Filter" />
              </Col>
            </Row>

            {/* TODO: Add vertical space in better way */}
            <Row gutter={16} style={{ height: '16px' }} />

            <Row gutter={16}>
              <Col span={18}>
                <Browser />
              </Col>
              <Col span={6}>
                <DetailPanel />
              </Col>
            </Row>

            <Row gutter={16} style={{ height: '16px' }} />

            <Row gutter={16}>
              <Col span={24}>
                <Card bodyStyle={{ padding: 10 }}>
                  <BrowserTable />
                </Card>
              </Col>
            </Row>
          </Col>
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
