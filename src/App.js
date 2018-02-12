import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Card, Row, Col, Slider, Checkbox, Menu, Layout, Icon } from 'antd';

import Browser from './Browser';
import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import GeneVariantDetail from './details/GeneVariantDetail';

class App extends Component {
  render() {
    const gridStyle = {
      width: '33%'
    }
    const g2vOptions = ['VEP', 'GTEx', 'PCHiC', 'DHS', 'Fantom5'];
    let g2vChecked = ['VEP', 'GTEx', 'PCHiC', 'DHS', 'Fantom5'];
    return (
      <Layout>
        <Layout.Header>
          <h1 style={{color: 'white'}}>POSTGAP</h1>
        </Layout.Header>
        <Layout.Content style={{ background: '#ECECEC', padding: '30px' }}>
          <Col gutter={6}>
            <Row gutter={16}>
              <Col span={6}><Card title='G2V Filter'>
                <Checkbox.Group options={g2vOptions} value={g2vChecked} />
              </Card></Col>
              <Col span={6}><Card title='V2LeadV Filter'>
                <h4>Linkage Disequilibrium (r<sup>2</sup>)</h4>
                <Slider range min={0.7} max={1} marks={{0.7: 0.7, 0.8: 0.8, 0.9: 0.9, 1: 1}} step={0.001} defaultValue={[0.7, 1]} />
              </Card></Col>
              <Col span={6}><Card title='LeadV2D Filter'/></Col>
            </Row>

            {/* TODO: Add vertical space in better way */}
            <Row gutter={16} style={{height: '16px'}} /> 

            <Row gutter={16}>
              <Col span={18}>
                <Browser />
              </Col>
              <Col span={6}>
                <GeneDetail />
                <VariantDetail />
                <GeneVariantDetail />
              </Col>
            </Row>

            <Row gutter={16} style={{height: '16px'}} /> 

            <Row gutter={16}>
              <Col span={24}>
                <Card title='Table'/>
                </Col>
            </Row>

          </Col>
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
