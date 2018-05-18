import React from 'react';
import { Spin, Icon } from 'antd';

import { colors } from '../../theme';

let Spinner = ({ loading, showIcon }) => {
    const loadingIcon = (
        <Icon
            type="loading"
            style={{
                fontSize: 20,
                color: colors.primary,
                padding: 10,
                opacity: showIcon ? 1 : 0,
            }}
            spin
        />
    );
    if (loading) {
        return (
            <Spin
                indicator={loadingIcon}
                size="large"
                spinning={true}
                delay={300}
            />
        );
    }
    return null;
};

export default Spinner;
