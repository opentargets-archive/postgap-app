import React from 'react';
import { Popover, Icon } from 'antd';

const HelpTerm = ({ label, content }) => {
  return (
    <Popover content={content} trigger="hover">
      <span>
        {label}{' '}
        <sup>
          <Icon type="question-circle-o" style={{ color: 'blue' }} />
        </sup>
      </span>
    </Popover>
  );
};

export default HelpTerm;
