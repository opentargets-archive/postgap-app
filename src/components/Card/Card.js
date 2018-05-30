import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    background: white;
    padding: ${props => (props.padded ? '5px' : 0)};
    height: ${props => (props.height ? props.height : null)};
    margin-bottom: 2px;
`;

export default Card;
