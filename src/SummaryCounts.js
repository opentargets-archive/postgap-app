import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';

import { selectors } from './redux/store';

const Curve = () => (
  <div style={{ padding: '0 20%' }}>
    <div
      style={{
        width: '100%',
        height: '10px',
        borderBottom: 'solid 2px #bbb',
        borderBottomLeftRadius: '50% 100%',
        borderBottomRightRadius: '50% 100%'
      }}
    />
  </div>
);

let SummaryCountsPanel = ({
  genesFilteredCount,
  variantsFilteredCount,
  leadVariantsFilteredCount,
  diseasesFilteredCount,
  geneVariantsFilteredCount,
  variantLeadVariantsFilteredCount,
  leadVariantDiseasesFilteredCount
}) => {
  return (
    <Card bodyStyle={{ padding: 10 }} bordered={false}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            Filter Effect
          </span>
        </Col>
      </Row>
      <hr />
      <Row style={{ textAlign: 'center' }}>
        <Col span={6}>
          <h1
            style={{ marginBottom: 0, lineHeight: 1 }}
          >{`${genesFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>Gene</span>
        </Col>
        <Col span={6}>
          <h1
            style={{ marginBottom: 0, lineHeight: 1 }}
          >{`${variantsFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>Variant</span>
        </Col>
        <Col span={6}>
          <h1
            style={{ marginBottom: 0, lineHeight: 1 }}
          >{`${leadVariantsFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>Lead Variant</span>
        </Col>
        <Col span={6}>
          <h1
            style={{ marginBottom: 0, lineHeight: 1 }}
          >{`${diseasesFilteredCount}`}</h1>
          <span style={{ fontSize: 12 }}>Disease</span>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center' }}>
        <Col offset={3} span={6}>
          <Curve />
          <h1 style={{ marginBottom: 0 }}>{`${geneVariantsFilteredCount}`}</h1>
        </Col>
        <Col span={6}>
          <Curve />
          <h1
            style={{ marginBottom: 0 }}
          >{`${variantLeadVariantsFilteredCount}`}</h1>
        </Col>
        <Col span={6}>
          <Curve />
          <h1
            style={{ marginBottom: 0 }}
          >{`${leadVariantDiseasesFilteredCount}`}</h1>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    genesFilteredCount: selectors.getGenesFilteredCount(state),
    variantsFilteredCount: selectors.getVariantsFilteredCount(state),
    leadVariantsFilteredCount: selectors.getLeadVariantsFilteredCount(state),
    diseasesFilteredCount: selectors.getDiseasesFilteredCount(state),
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
