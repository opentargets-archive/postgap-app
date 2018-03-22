import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button } from 'antd';
import queryString from 'query-string';

import Browser from '../Browser';
import BrowserTable from '../BrowserTable';
import { setLocation, setClickedEntityId, ENTITY_TYPE } from '../redux/store';
import VariantLeadVariantFilter from '../filters/VariantLeadVariantFilter';
import DetailPanel from '../DetailPanel';
import SummaryCounts from '../SummaryCounts';
import LeadVariantDiseaseFilter from '../filters/LeadVariantDiseaseFilter';
import GeneVariantFilter from '../filters/GeneVariantFilter';

class LocusPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filtersVisible: true };
    this.toggleFilters = this.toggleFilters.bind(this);
  }

  componentDidMount() {
    const { location, setLocation, setClickedEntityId } = this.props;
    const query = queryString.parse(location.search);
    const { start, end, chromosome, geneId, variantId } = query;
    setLocation({ start, end, chromosome });
    if (geneId) {
      setClickedEntityId(ENTITY_TYPE.GENE, geneId);
    }
    if (variantId) {
      setClickedEntityId(ENTITY_TYPE.VARIANT, variantId);
    }
  }

  toggleFilters() {
    this.setState({ filtersVisible: !this.state.filtersVisible });
  }

  render() {
    return (
      <div style={{ padding: '30px' }}>
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => dispatch(setLocation(location)),
    setClickedEntityId: (entityType, entityId) =>
      dispatch(setClickedEntityId({ entityType, entityId })),
  };
};

LocusPage = connect(null, mapDispatchToProps)(LocusPage);

export default LocusPage;
