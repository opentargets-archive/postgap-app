import React from 'react';

const DiseasePage = ({ match }) => {
  return `Disease: ${match.params.efoId}`;
};

export default DiseasePage;
