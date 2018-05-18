import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Affix } from 'antd';

import SearchHome from '../../SearchHome';
import BannerLinks from '../../BannerLinks';
import OpenTargetsLogo from '../../OpenTargetsLogo';

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
                    <Col span={8}>
                        <div style={{ textAlign: 'right', height: 30 }}>
                            <BannerLinks />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <SearchHome />
                        </div>
                    </Col>
                </Row>
            </Layout.Header>
        </Affix>
    );
};

export default Banner;
