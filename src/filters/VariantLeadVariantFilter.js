import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Slider } from 'antd';

import { setFilterLD } from '../redux/store';

let VariantLeadVariantFilter = ({ interval, setFilterLD }) => {
  return (
    <Card bodyStyle={{ padding: 10 }} bordered={false}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            Variant - Lead Variant
          </span>
        </Col>
      </Row>
      <hr />
      <h4>
        Linkage Disequilibrium (r<sup>2</sup>)
      </h4>
      <div style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
        <Slider
          range
          min={0.7}
          max={1}
          marks={{ 0.7: 0.7, 0.8: 0.8, 0.9: 0.9, 1: 1 }}
          step={0.01}
          defaultValue={interval}
          onChange={value => {
            setFilterLD(value);
          }}
        />
      </div>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    interval: state.filters.ld,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterLD: interval => dispatch(setFilterLD(interval)),
  };
};

VariantLeadVariantFilter = connect(mapStateToProps, mapDispatchToProps)(
  VariantLeadVariantFilter
);

export default VariantLeadVariantFilter;
