import React from 'react';
import { Card, Row, Col, Slider } from 'antd';

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
      <div style={{ paddingLeft: 20, paddingRight: 30, paddingBottom: 0 }}>
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

export default VariantLeadVariantFilter;
