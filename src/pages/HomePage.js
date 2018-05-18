import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Tag } from 'antd';

import Search from '../components/Search/Search';
import OpenTargetsLogo from '../OpenTargetsLogo';
import BannerLinks from '../BannerLinks';
import { colors } from '../theme';

const SiteName = () => (
    <React.Fragment>
        <h1 style={{ color: 'white', fontSize: 50, marginBottom: 20 }}>
            <span style={{ fontWeight: 'bold' }}> Open Targets </span>
            <span style={{ fontWeight: 100 }}>POSTGAP</span>
        </h1>
        <p style={{ color: 'white', fontSize: 16, marginBottom: 30 }}>
            Mapping the relationship between targets and diseases using GWAS,
            linkage disequilibrium expansion and functional genomics data
        </p>
    </React.Fragment>
);

const SearchSuggestions = () => (
    <div style={{ color: 'white', fontSize: 16, marginTop: 20 }}>
        <span>Try searching: </span>
        <Link to="/gene/ENSG00000105810">
            <Tag color={colors.primaryLight}>CDK6</Tag>
        </Link>
        <Link to="/disease/EFO_0000685">
            <Tag color={colors.primaryLight}>rheumatoid arthritis</Tag>
        </Link>
        <Link to="/variant/rs4272">
            <Tag color={colors.primaryLight}>rs4272</Tag>
        </Link>
    </div>
);

const HomePage = () => {
    return (
        <Col span={24} className="Home-backdrop" style={{ height: '100vh' }}>
            <Row
                style={{
                    height: '100px',
                    width: '100%',
                }}
            >
                <Col span={24} style={{ padding: 20, fontSize: 18 }}>
                    <BannerLinks />
                </Col>
            </Row>
            <Row
                style={{
                    height: 'calc(100vh - 100px)',
                    verticalAlign: 'middle',
                    width: '100%',
                }}
                type="flex"
                align="middle"
            >
                <Col
                    span={12}
                    offset={6}
                    style={{
                        padding: '30px',
                        marginBottom: '10vh',
                        textAlign: 'center',
                    }}
                >
                    <OpenTargetsLogo width={150} height={150} fill="white" />
                    <SiteName />
                    <Search />
                    <SearchSuggestions />
                </Col>
            </Row>
        </Col>
    );
};

export default HomePage;
