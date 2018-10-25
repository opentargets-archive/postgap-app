import React from 'react';
import { format } from 'd3';

const NotSignificant = () => (
    <span style={{ fontStyle: 'italic', color: '#CCC' }}>Not significant</span>
);

const NoData = () => (
    <span style={{ fontStyle: 'italic', color: '#CCC' }}>No data</span>
);

const NoConsequence = () => (
    <span style={{ fontStyle: 'italic', color: '#CCC' }}>No consequence</span>
);

// integer only
export const commaSeparate = format(',d');

// any number
export const renderNonZeroField = value =>
    value > 0 ? value.toPrecision(3) : <NotSignificant />;

export const renderNullableField = value =>
    value > 0 ? value.toPrecision(3) : <NoData />;

// gtex above threshold
const GTEX_SIGNIFICANCE_THRESHOLD = 0.999975;
export const renderGtexField = value =>
    value > GTEX_SIGNIFICANCE_THRESHOLD ? (
        value.toPrecision(6)
    ) : (
        <NotSignificant />
    );

export const renderGtexTissueField = value => {
    return value ? value.split('GTEx_')[1] : '';
};

export const renderVEPField = value =>
    value >= 0.65 ? value : value > 0 ? <NotSignificant /> : <NoData />;

export const renderVEPTermsField = value => (value ? value : <NoConsequence />);

export const underscoresToSpaces = str => str.replace('_', ' ');
