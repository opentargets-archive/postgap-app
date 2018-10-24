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
const A = styled.a`
    color: ${colors.primaryLighter};
    font-weight: bold;
    :hover {
        color: ${colors.primaryLight};
    }
`;
// const MailChimpSignup = () => (
//     <div>
//         <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css" />
//         <style type="text/css">
//             {'#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}'}
//             /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
//             We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
//         </style>
//         <div id="mc_embed_signup" style={{background:'#fff', clear:'left', font:'14px Helvetica,Arial,sans-serif', width:'100%'}} />
//         <form action="https://opentargets.us17.list-manage.com/subscribe/post?u=d11d0467053c1d4b918eb8738&amp;id=f084c7a7c2" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
//             <div id="mc_embed_signup_scroll">
//                 <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required />
//                 <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_d11d0467053c1d4b918eb8738_f084c7a7c2" tabindex="-1" value="" /></div>
//                 <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" /></div>
//             </div>
//         </form>
//     </div>
// )
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
            border: `2px solid white`,
        }}
    >
        <P
            style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2em',
            }}
        >
            Welcome to Open Targets POSTGAP!
        </P>
        <P>This website shows output from the Ensembl/POSTGAP pipeline.</P>

        <P>
            You might also be interested in our{' '}
            <A href="http://genetics.opentargets.org" target="_blank">
                Genetics Portal
            </A>.
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
