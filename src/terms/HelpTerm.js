import React, { Component } from 'react';
import { Popover, Badge, Icon } from 'antd';

const HelpTerm = ({term, content}) => {
    return <Popover content={content} trigger="hover">
        {/* <span style={{
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            textDecorationColor: 'blue',
        }}>{term}</span> */}
        <span>{term} <sup><Icon type='question-circle-o' style={{color: 'blue'}} /></sup></span>
    </Popover>
}

export default HelpTerm;
