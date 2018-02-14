import React from 'react';

const ScaleFeature = (props) => {
    const { x, y } = props.scale;
    const ticks = x.ticks();
    if (ticks.length > 1) {
        const tickInterval = ticks[1] - ticks[0]; // linear
        return ticks.filter(tick => {
            const b = (tick % (tickInterval * 2) === 0)
            return b;
        })
        .map(tick => <rect
            key={tick}
            x={x(tick)}
            y={y(1)}
            width={x(tick + tickInterval) - x(tick)}
            height={y(0) - y(1)}
            style={{ fill: 'black' }}
        />)
    }
    return null;
}

export default ScaleFeature;
