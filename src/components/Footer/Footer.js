import React from 'react';
import { Row, Col, Layout, Icon } from 'antd';

import pkg from '../../../package.json';
import { colors } from '../../theme';

const FooterHeader = ({ children }) => (
    <h3
        style={{
            color: colors.grey,
        }}
    >
        {children}
    </h3>
);

const FooterItem = ({ children }) => (
    <li
        style={{
            color: colors.grey,
        }}
    >
        {children}
    </li>
);

const FooterItemLink = ({ href, children }) => (
    <FooterItem>
        <a
            style={{
                color: colors.grey,
            }}
            href={href}
            target="_blank"
        >
            {children}
        </a>
    </FooterItem>
);

const FooterList = ({ children }) => (
    <ul
        style={{
            listStyle: 'none',
            marginLeft: 0,
            paddingLeft: 0,
        }}
    >
        {children}
    </ul>
);

const FooterIcon = ({ href, type }) => (
    <li
        style={{
            color: colors.grey,
            display: 'inline-block',
            paddingRight: 5,
        }}
    >
        <a
            style={{
                color: colors.grey,
            }}
            href={href}
            target="_blank"
        >
            <Icon type={type} style={{ fontSize: 20 }} />
        </a>
    </li>
);

const Footer = () => (
    <Layout.Footer style={{ backgroundColor: '#cecfcf', height: 200 }}>
        <Row>
            <Col span={6}>
                <FooterHeader>About</FooterHeader>
                <FooterList>
                    <FooterItem>Version {pkg.version}</FooterItem>
                    <FooterItemLink href="https://github.com/opentargets/postgap-app">
                        Github codebase
                    </FooterItemLink>
                    {/* <FooterItem><a href='' target='_blank'>Privacy notice</a></FooterItem> */}
                    <FooterItemLink
                        href="http://www.targetvalidation.org/terms-of-use"
                        target="_blank"
                    >
                        Terms of use
                    </FooterItemLink>
                </FooterList>
            </Col>
            <Col span={6}>
                <FooterHeader>Open Targets Network</FooterHeader>
                <FooterList>
                    <FooterItemLink href="https://www.opentargets.org/">
                        Open Targets Consortium
                    </FooterItemLink>
                    <FooterItemLink href="https://www.targetvalidation.org/">
                        Open Targets Platform
                    </FooterItemLink>
                    <FooterItemLink href="https://link.opentargets.io/">
                        LINK
                    </FooterItemLink>
                    <FooterItemLink href="https://dorothea.opentargets.io/">
                        DoRothEA
                    </FooterItemLink>
                    {/* (LIterature coNcept Knowledgebase) / (Discrimant ...) */}
                </FooterList>
            </Col>
            <Col span={6}>
                <FooterHeader>Partners</FooterHeader>
                <FooterList>
                    <FooterItemLink href="https://www.biogen.com">
                        Biogen
                    </FooterItemLink>
                    <FooterItemLink href="http://www.ebi.ac.uk">
                        EMBL-EBI
                    </FooterItemLink>
                    <FooterItemLink href="http://www.gsk.com">
                        GSK
                    </FooterItemLink>
                    <FooterItemLink href="https://www.takeda.com">
                        Takeda
                    </FooterItemLink>
                    <FooterItemLink href="http://www.sanger.ac.uk">
                        Wellcome Sanger Institute
                    </FooterItemLink>
                </FooterList>
            </Col>
            <Col span={6}>
                <FooterHeader>Help</FooterHeader>
                <FooterList>
                    <FooterItemLink href="http://api.opentargets.io/v3/platform/docs">
                        API Documentation
                    </FooterItemLink>
                    <FooterItemLink href="mailto:support@targetvalidation.org?Subject=Open%20Targets%20POSTGAP%20-%20help%20request">
                        support@targetvalidation.org
                    </FooterItemLink>
                </FooterList>
                <FooterHeader>Connect with us</FooterHeader>
                <FooterList>
                    <FooterIcon
                        href="https://www.facebook.com/OpenTargets/"
                        type="facebook"
                    />
                    <FooterIcon
                        href="http://twitter.com/targetvalidate"
                        type="twitter"
                    />
                    <FooterIcon
                        href="https://www.linkedin.com/company/centre-for-therapeutic-target-validation"
                        type="linkedin"
                    />
                    <FooterIcon
                        href="https://www.youtube.com/channel/UCLMrondxbT0DIGx5nGOSYOQ"
                        type="youtube"
                    />
                    <FooterIcon
                        href="https://medium.com/opentargets"
                        type="medium"
                    />
                    <FooterIcon
                        href="https://github.com/opentargets"
                        type="github"
                    />
                </FooterList>
            </Col>
        </Row>
    </Layout.Footer>
);

export default Footer;
