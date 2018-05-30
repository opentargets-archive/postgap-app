import React from 'react';
import styled from 'styled-components';

import { colors } from '../../theme';

const CornerRibbonContainer = styled.div`
    width: 80px;
    background: ${colors.secondary};
    top: 10px;
    left: -20px;
    text-align: center;
    line-height: 20px;
    letter-spacing: 1px;
    color: white;
    font-weight: bold;
    transform: rotate(-45deg);
    position: fixed;
    z-index: 1003;
`;

const CornerRibbon = ({ label }) => {
    return <CornerRibbonContainer>{label}</CornerRibbonContainer>;
};

export default CornerRibbon;
