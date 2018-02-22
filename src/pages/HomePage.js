import React from 'react';
import { Col, Row } from 'antd';

import SearchHome from '../SearchHome';

const HomePage = () => {
  return (
    <Col
      span={24}
      className="Home-backdrop"
      style={{ height: '100vh', display: 'table' }}
    >
      <Row
        style={{
          height: '100vh',
          verticalAlign: 'middle',
          display: 'table-cell'
        }}
      >
        <Col
          span={10}
          offset={7}
          style={{
            background: '#ECECEC',
            border: '2px solid rgba(53, 125, 34, .4)',
            padding: '30px',
            marginBottom: '10vh'
          }}
        >
          <h1 style={{ color: '#555', textAlign: 'center' }}>
            <span style={{ fontWeight: 'bold' }}> Open Targets </span>
            <span style={{ fontWeight: 100, color: 'blue' }}>POSTGAP</span>
          </h1>
          <SearchHome />
        </Col>
      </Row>
    </Col>
  );
};

export default HomePage;
