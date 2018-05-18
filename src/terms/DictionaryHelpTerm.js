import React from 'react';
import HelpTerm from './HelpTerm';
import DICTIONARY from '../constants/dictionary';

const DictionaryHelpTerm = ({ term, label }) => {
    return <HelpTerm label={label} content={DICTIONARY[term.toLowerCase()]} />;
};

export default DictionaryHelpTerm;
