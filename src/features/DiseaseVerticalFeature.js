import React from 'react';

import { colors } from '../theme';

const DiseaseVerticalFeature = ({ x, y, data, dimNonHighlighted }) => {
    const diseaseColor = data.selected
        ? colors.secondary
        : dimNonHighlighted ? 'lightgrey' : 'grey';
    return (
        <line
            x1={x}
            y1={y}
            x2={x}
            y2={0}
            style={{ stroke: diseaseColor, strokeWidth: 1 }}
        />
    );
};

export default DiseaseVerticalFeature;
