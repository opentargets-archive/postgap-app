import React from 'react';
import HelpTerm from './HelpTerm';
import DICTIONARY from './dictionary';

const DictionaryHelpTerm = ({ term, label }) => {
  return <HelpTerm label={label} content={DICTIONARY[term.toLowerCase()]} />;
};

export default DictionaryHelpTerm;
