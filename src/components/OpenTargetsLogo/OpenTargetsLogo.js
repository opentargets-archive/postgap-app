import React from 'react';

const OpenTargetsLogo = ({ width, height, fill }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 60 60"
            style={{ fill: fill }}
        >
            <g>
                <g>
                    <path d="M6.4,44.3c-1.8,0-3.4-0.7-4.5-1.9S0,39.6,0,37.9c0-3.5,2.9-6.4,6.4-6.4h21.9v0l15.3,0v12.8L6.4,44.3z" />
                    <path d="M28.2,47.2v6.4c0,3.5-2.9,6.4-6.4,6.4c-1.8,0-3.4-0.7-4.5-1.9c-1.2-1.2-1.9-2.8-1.9-4.5v-6.4H28.2z" />
                    <path d="M30.7,12.8V6.4c0-3.5,2.9-6.4,6.4-6.4c3.5,0,6.4,2.9,6.4,6.4v6.4H30.7z" />
                    <path d="M15.4,15.7h37.2c3.5,0,6.4,2.9,6.4,6.4c0,3.5-2.9,6.4-6.4,6.4l-18.3,0l-18.9,0V15.7z" />
                </g>
            </g>
        </svg>
    );
};

export default OpenTargetsLogo;
