import React, { Component } from 'react';
import HelpTerm from "./HelpTerm";
import DICTIONARY from './dictionary';

const DictionaryHelpTerm = ({ term }) => {
    return <HelpTerm 
        term={term}
        content={DICTIONARY[term.toLowerCase()]}
    />;
}

export default DictionaryHelpTerm;
