import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
    text-align: center;
    padding-top: 50px;
    font-size: 1.5em;
    color: ${({ error, theme }) =>
        error ? theme.colors.secondary : theme.colors.primary};
`;

export default Message;
