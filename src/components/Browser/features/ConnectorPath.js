import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../theme';

const Path = styled.path`
    stroke: ${({ highlight, dim }) =>
        highlight ? colors.secondary : dim ? 'lightgrey' : 'grey'};
    fill: none;
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
`;

const ConnectorPath = ({
    topX,
    topY,
    bottomX,
    bottomY,
    onClick,
    onMouseEnter,
    onMouseLeave,
    highlight,
    dimNonHighlighted,
}) => {
    const controlY = (bottomY + topY) / 2;
    const d = `M${topX},${topY} C${topX},${controlY}, ${bottomX},${controlY} ${bottomX},${bottomY}`;
    const handlers = { onClick, onMouseEnter, onMouseLeave };
    return (
        <Path
            d={d}
            highlight={highlight}
            dim={dimNonHighlighted}
            {...handlers}
        />
    );
};

export default ConnectorPath;
