import React from 'react';

const BannerLink = ({ href, children, last = false }) => (
    <li
        style={{
            display: 'inline-block',
            height: 30,
            paddingRight: last ? 0 : 15,
        }}
    >
        <a
            style={{
                color: 'white',
            }}
            href={href}
            target="_blank"
        >
            {children}
        </a>
    </li>
);

const BannerLinks = ({ children }) => (
    <ul
        style={{
            listStyle: 'none',
            marginLeft: 0,
            marginBottom: 0,
            paddingLeft: 0,
            textAlign: 'right',
            width: '100%',
        }}
    >
        <BannerLink href="https://www.targetvalidation.org/">
            Open Targets Platform
        </BannerLink>
        <BannerLink href="https://github.com/opentargets/postgap-app">
            Github
        </BannerLink>
        <BannerLink
            last
            href="mailto:support@targetvalidation.org?Subject=Open%20Targets%20POSTGAP%20-%20help%20request"
        >
            Feedback
        </BannerLink>
    </ul>
);

export default BannerLinks;
