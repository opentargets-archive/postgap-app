import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Slider } from 'antd';

import { setFilterGwasPValue, selectors } from '../redux/store';

let LeadVariantDiseaseFilter = ({ interval, setFilterGwasPValue, max }) => {
  return (
    <Card bodyStyle={{ padding: 10 }} bordered={false}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            Lead Variant - Disease
          </span>
        </Col>
      </Row>
      <hr />
      <h4>
        -log<sub>10</sub>(GWAS p-value)
      </h4>
      <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        <Slider
          range
          min={0}
          max={max ? max : 100}
          marks={{
            0: '0',
            [max]: max.toPrecision(3),
          }}
          step={0.1}
          defaultValue={interval}
          onChange={value => {
            setFilterGwasPValue(value);
          }}
        />
      </div>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    interval: state.filters.gwasPValue,
    max: selectors.getMaxMinusLogGwasPValue(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterGwasPValue: interval => dispatch(setFilterGwasPValue(interval)),
  };
};

LeadVariantDiseaseFilter = connect(mapStateToProps, mapDispatchToProps)(
  LeadVariantDiseaseFilter
);

export default LeadVariantDiseaseFilter;
