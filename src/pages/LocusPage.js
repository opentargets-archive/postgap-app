import React from 'react';

import { Card, Row, Col, Button } from 'antd';

import Browser from '../Browser';
import BrowserTable from '../BrowserTable';

import VariantLeadVariantFilter from '../filters/VariantLeadVariantFilter';
import DetailPanel from '../DetailPanel';
import SummaryCounts from '../SummaryCounts';
import LeadVariantDiseaseFilter from '../filters/LeadVariantDiseaseFilter';
import GeneVariantFilter from '../filters/GeneVariantFilter';

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
    );
  }
}

export default LocusPage;
