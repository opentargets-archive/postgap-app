import React from 'react';

import { Card, Row, Col, Layout, Affix, Button } from 'antd';

import Browser from '../Browser';
import BrowserTable from '../BrowserTable';

import VariantLeadVariantFilter from '../filters/VariantLeadVariantFilter';
import DetailPanel from '../DetailPanel';
import SummaryCounts from '../SummaryCounts';
import LeadVariantDiseaseFilter from '../filters/LeadVariantDiseaseFilter';
import GeneVariantFilter from '../filters/GeneVariantFilter';
import Search from '../Search';
import pkg from '../../package.json';
import Spinner from '../Spinner';

class LocusPage extends React.Component {
  constructor() {
    super();
    this.state = { filtersVisible: true };
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  toggleFilters() {
    this.setState({ filtersVisible: !this.state.filtersVisible });
  }

  render() {
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
              <span style={{ fontWeight: 'bold' }}> Open Targets </span>
              <span style={{ fontWeight: 100, color: 'blue' }}>POSTGAP</span>
            </h1>
          </Layout.Header>
          <Row
            gutter={16}
            style={{
              backgroundColor: '#555',
              color: 'white',
              padding: '5px 30px'
            }}
          >
            <Col span={15}>
              <Search />
            </Col>
            <Col span={9}>
              <Spinner />
            </Col>
          </Row>
        </Affix>

        <Layout.Content style={{ background: '#ECECEC', padding: '30px' }}>
          <Col gutter={6}>
            {this.state.filtersVisible ? (
              <Card bodyStyle={{ background: 'white', padding: '2px' }}>
                <Row style={{ padding: '10px 10px 0px 10px' }}>
                  <Col span={16}>
                    <h4>Filters </h4>
                  </Col>
                  <Col span={8} align="end">
                    <Button
                      icon="close"
                      type="primary"
                      shape="circle"
                      size="small"
                      ghost
                      onClick={this.toggleFilters}
                    />
                  </Col>
                </Row>
                <Row gutter={2}>
                  <Col span={6}>
                    <GeneVariantFilter />
                  </Col>
                  <Col span={6}>
                    <VariantLeadVariantFilter />
                  </Col>
                  <Col span={6}>
                    <LeadVariantDiseaseFilter />
                  </Col>
                  <Col span={6}>
                    <SummaryCounts />
                  </Col>
                </Row>
              </Card>
            ) : (
              <Button type="primary" ghost onClick={this.toggleFilters}>
                Filters
              </Button>
            )}

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
        <Layout.Footer
          style={{
            backgroundColor: 'green',
            color: 'white',
            height: '40px',
            padding: '10px 30px'
          }}
        >
          <Row type="flex" align="middle">
            <Col span={24}>
              <span>Version {pkg.version} &copy; Open Targets 2018</span>
            </Col>
          </Row>
        </Layout.Footer>
      </Layout>
    );
  }
}

export default LocusPage;
