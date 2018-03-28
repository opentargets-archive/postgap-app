import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Affix } from 'antd';

import SearchHome from './SearchHome';
import BannerLinks from './BannerLinks';
import OpenTargetsLogo from './OpenTargetsLogo';
import { colors } from './theme';

const SiteName = () => (
  <Link to={{ pathname: '/' }}>
    <Row type="flex" justify="start" align="middle">
      <OpenTargetsLogo width={40} height={40} fill="white" />
      <h1
        style={{
          color: 'white',
          marginBottom: 0,
          display: 'inline',
          paddingLeft: 20,
        }}
      >
        <span style={{ fontWeight: 'bold' }}> Open Targets </span>
        <span style={{ fontWeight: 100 }}>POSTGAP</span>
      </h1>
    </Row>
  </Link>
);

const Banner = () => {
  return (
    <Affix>
      <Layout.Header
        style={{
          height: 90,
          paddingLeft: 30,
          paddingRight: 30,
        }}
        className="Banner-backdrop"
      >
        <Row
          type="flex"
          justify="start"
          align="middle"
          style={{ height: '100%' }}
        >
          <Col span={16}>
            <Row>
              <SiteName />
            </Row>
          </Col>
          <Col span={8} style={{ height: '100%' }}>
            <Row
              style={{ height: 30, marginTop: 5 }}
              type="flex"
              align="middle"
              justify="end"
            >
              <BannerLinks />
            </Row>
            <Row style={{ height: 50 }} type="flex" align="end">
              <SearchHome />
            </Row>
          </Col>
        </Row>
      </Layout.Header>
    </Affix>
  );
};

export default Banner;
