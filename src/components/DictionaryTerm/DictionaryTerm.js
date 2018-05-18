import React from 'react';
import { Popover, Icon } from 'antd';

import dictionary from '../../constants/dictionary';
import reportAnalyticsEvent from '../../utils/reportAnalyticsEvent';
import { colors } from '../../theme';

const HelpTerm = ({ label, content }) => {
    return (
        <Popover
            content={<div style={{ maxWidth: 500 }}>{content}</div>}
            trigger="hover"
            onVisibleChange={visible => {
                if (visible) {
                    reportAnalyticsEvent({
                        category: 'Help',
                        action: 'Hovered over term',
                        label,
                    });
                }
            }}
        >
            <span>
                {label}{' '}
                <sup>
                    <Icon
                        type="question-circle-o"
                        style={{ color: colors.primary }}
                    />
                </sup>
            </span>
        </Popover>
    );
};

const DictionaryTerm = ({ term, label }) => {
    return <HelpTerm label={label} content={dictionary[term.toLowerCase()]} />;
};

export default DictionaryTerm;
