import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Tag } from 'antd';
import styled from 'styled-components';

import Search from '../components/Search/Search';
import OpenTargetsLogo from '../components/OpenTargetsLogo/OpenTargetsLogo';
import BannerLinks from '../components/BannerLinks/BannerLinks';
import Message from '../components/Message/Message';
import { colors } from '../theme';

const SiteName = () => (
    <React.Fragment>
        <h1 style={{ color: 'white', fontSize: 50, marginBottom: 20 }}>
            <span style={{ fontWeight: 'bold' }}> Open Targets </span>
            <span style={{ fontWeight: 100 }}>Genetics</span>
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
        <Link to="/disease/EFO_0000305">
            <Tag color={colors.primaryLight}>breast carcinoma</Tag>
        </Link>
        <Link to="/variant/rs4272">
            <Tag color={colors.primaryLight}>rs4272</Tag>
        </Link>
    </div>
);

const P = styled.p`
    color: white;
    font-size: 1.1em;
    text-align: left;
    margin-bottom: 0.5em;
`;
const BetaWarning = () => (
    <div
        style={{
            // textAlign: 'left',
            // background: '#eee',
            background: colors.secondary,
            padding: '15px',
            marginTop: '30px',
            //fontSize: '1.1em',
            // fontWeight: 'bold',
            // color: colors.secondary,
            //color: 'white',
            borderRadius: '10px',
            border: `2px solid ${colors.secondary}`,
        }}
    >
        <P
            style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2em',
            }}
        >
            Welcome to the Open Targets Genetics Portal!
        </P>
        <P>
            The Portal is currently under active development. We are updating
            the data and visualisations so you may notice inconsistencies.
        </P>
        <P>
            To be the first to know when we officially launch the Portal, please
            subscribe to our email newsletter (http://eepurl.com/c-NsBb).
        </P>
        <P>
            If you have any feedback on the Portal, please email us
            (support@targetvalidation.org).
        </P>
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
                    <BetaWarning />
                </Col>
            </Row>
        </Col>
    );
};

export default HomePage;
