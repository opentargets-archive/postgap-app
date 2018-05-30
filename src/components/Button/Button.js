import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    margin: 0 5px;
    padding: 0 0.3em;
    border-radius: 3px;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    font-size: 0.8em;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        color: white;
        border: 1px solid white;
        background: ${props => props.theme.colors.primary};
    }
`;

export default Button;
