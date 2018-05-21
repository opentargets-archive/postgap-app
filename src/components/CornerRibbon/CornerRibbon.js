import React from 'react';

import { colors } from '../../theme';

const CornerRibbon = ({ label }) => {
    return (
        <div
            style={{
                width: '120px',
                background: colors.secondary,
                top: '15px',
                left: '-30px',
                textAlign: 'center',
                lineHeight: '30px',
                letterSpacing: '1px',
                color: 'white',
                fontWeight: 'bold',
                transform: 'rotate(-45deg)',

                position: 'fixed',
                zIndex: 1003,
            }}
        >
            {label}
        </div>
    );
};

export default CornerRibbon;
