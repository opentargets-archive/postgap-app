import React from 'react';
import { Row, Col, Layout, Affix } from 'antd';

import Search from './Search';
import Spinner from './Spinner';

const Banner = () => {
  return (
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
  );
};

export default Banner;
