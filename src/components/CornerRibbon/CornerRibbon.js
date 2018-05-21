import React from 'react';

const CornerRibbon = ({ label }) => {
    return (
        <div
            style={{
                width: '200px',
                background: 'red',
                top: '25px',
                left: '-50px',
                textAlign: 'center',
                lineHeight: '50px',
                letterSpacing: '1px',
                color: 'white',
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
