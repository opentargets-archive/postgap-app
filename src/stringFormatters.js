import React from 'react';
import { format } from 'd3';

// integer only
export const commaSeparate = format(',d');

// any number
export const renderNonZeroField = value =>
    value > 0 ? (
        value.toPrecision(3)
    ) : (
        <span style={{ fontStyle: 'italic', color: '#CCC' }}>
            Not significant
        </span>
    );

export const renderNullableField = value =>
    value > 0 ? (
        value.toPrecision(3)
    ) : (
        <span style={{ fontStyle: 'italic', color: '#CCC' }}>No data</span>
    );

// gtex above threshold
const GTEX_SIGNIFICANCE_THRESHOLD = 0.999975;
export const renderGtexField = value =>
    value > GTEX_SIGNIFICANCE_THRESHOLD ? (
        value.toPrecision(3)
    ) : (
        <span style={{ fontStyle: 'italic', color: '#CCC' }}>
            Not significant
        </span>
    );

export const underscoresToSpaces = str => str.replace('_', ' ');
