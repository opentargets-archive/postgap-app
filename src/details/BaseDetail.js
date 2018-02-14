import React from 'react';
import { Card, Row, Col, Icon } from 'antd';

const BaseDetail = props => {
  return (
    <Card bodyStyle={{ padding: 10 }}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            {props.type}{' '}
          </span>
          <span>{props.title}</span>
        </Col>
        <Col span={8} align="end">
          <Icon type="close" />
        </Col>
      </Row>
      <hr />
      {props.children}
    </Card>
  );
};

export default BaseDetail;
