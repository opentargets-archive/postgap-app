import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';

import { selectors } from './redux/store';

let SummaryCountsPanel = ({
  geneVariantsFilteredCount,
  variantLeadVariantsFilteredCount,
  leadVariantDiseasesFilteredCount
}) => {
  return (
    <Card bodyStyle={{ padding: 10 }}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            Filter Effect
          </span>
        </Col>
      </Row>
      <hr />
      <Row style={{ textAlign: 'center' }}>
        <Col span={8}>
          <h1 style={{ marginBottom: 0 }}>{`${geneVariantsFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>gene-variants</span>
        </Col>
        <Col span={8}>
          <h1
            style={{ marginBottom: 0 }}
          >{`${variantLeadVariantsFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>variants-lead variants</span>
        </Col>
        <Col span={8}>
          <h1
            style={{ marginBottom: 0 }}
          >{`${leadVariantDiseasesFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>lead variant-diseases</span>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    geneVariantsFilteredCount: selectors.getGeneVariantsFilteredCount(state),
    variantLeadVariantsFilteredCount: selectors.getVariantLeadVariantsFilteredCount(
      state
    ),
    leadVariantDiseasesFilteredCount: selectors.getLeadVariantDiseasesFilteredCount(
      state
    )
  };
};

SummaryCountsPanel = connect(mapStateToProps)(SummaryCountsPanel);

export default SummaryCountsPanel;
