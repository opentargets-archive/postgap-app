import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Affix } from 'antd';
import styled from 'styled-components';

import Search from '../Search/Search';
import BannerLinks from '../BannerLinks/BannerLinks';
import OpenTargetsLogo from '../OpenTargetsLogo/OpenTargetsLogo';

const BannerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(
        90deg,
        ${props => props.theme.colors.primary} 0%,
        ${props => props.theme.colors.primaryLight} 100%
    );
    // background-size: 400% 400%;
    // animation: AnimationBanner 4s ease infinite;
    // @keyframes AnimationBanner {
    //   0%{background-position:0% 53%}
    //   50%{background-position:100% 48%}
    //   100%{background-position:0% 53%}
    // }
    height: 40px;
    padding: 30px;
`;

const BannerTitle = styled.h1`
    color: white;
    margin: 0 0.5em 0.1em 0.5em;
`;
const Bold = styled.span`
    font-weight: bold;
`;
const Light = styled.span`
    font-weight: 100;
`;
const OpenTargetsTitle = () => (
    <BannerTitle>
        <Bold> Open Targets </Bold>
        <Light>POSTGAP</Light>
    </BannerTitle>
);

const HomeContainer = styled.div`
    display: flex;
`;
const Home = () => (
    <HomeContainer>
        <OpenTargetsLogo width={40} height={40} fill="white" />
        <OpenTargetsTitle />
    </HomeContainer>
);

let Banner = () => (
    <BannerContainer>
        <Link to={{ pathname: '/' }}>
            <Home />
        </Link>
        <BannerLinks />
        <Search />
    </BannerContainer>
);

export default Banner;
