import React from 'react';
import { Popover, Icon } from 'antd';

import { colors } from '../theme';

const HelpTerm = ({ label, content }) => {
  return (
    <Popover content={content} trigger="hover">
      <span>
        {label}{' '}
        <sup>
          <Icon type="question-circle-o" style={{ color: colors.primary }} />
        </sup>
      </span>
    </Popover>
  );
};

export default HelpTerm;
