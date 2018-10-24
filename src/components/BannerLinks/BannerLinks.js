import React from 'react';
import styled from 'styled-components';

const navigation = [
    {
        label: 'Open Targets Platform',
        link: 'https://www.targetvalidation.org/',
    },
    { label: 'Github', link: 'https://github.com/opentargets/postgap-app' },
    {
        label: 'Feedback',
        link:
            'mailto:support@targetvalidation.org?Subject=Open%20Targets%20POSTGAP%20-%20help%20request',
    },
];

const A = styled.a`
    color: white;
    display: block;
    text-decoration: none;
    padding-right: 1.2em;
    display: block;
`;

const BannerLink = ({ label, link }) => (
    <li>
        <A href={link} target="_blank">
            {label}
        </A>
    </li>
);

const BannerLinksContainer = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    justify-self: stretch;
    flex-grow: 1;
`;

const BannerLinks = () => (
    <BannerLinksContainer>
        {navigation.map(d => <BannerLink key={d.label} {...d} />)}
    </BannerLinksContainer>
);

export default BannerLinks;
