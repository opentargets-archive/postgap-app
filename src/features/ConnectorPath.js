import React from 'react';

import { colors } from '../theme';

const ConnectorPath = ({
    topX,
    topY,
    bottomX,
    bottomY,
    onClick,
    onMouseEnter,
    onMouseLeave,
    dimNonHighlighted,
}) => {
    const controlY = (bottomY + topY) / 2;
    const d = `M${topX},${topY} C${topX},${controlY}, ${bottomX},${controlY} ${bottomX},${bottomY}`;
    const handlers = { onClick, onMouseEnter, onMouseLeave };
    return (
        <path
            d={d}
            style={{
                stroke: d.selected
                    ? colors.secondary
                    : dimNonHighlighted ? 'lightgrey' : 'grey',
                fill: 'none',
                strokeWidth: 1,
                vectorEffect: 'non-scaling-stroke',
            }}
            {...handlers}
        />
    );
};

export default ConnectorPath;
