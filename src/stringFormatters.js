import React from 'react';
import { format } from 'd3';

// integer only
export const commaSeparate = format(',d');

// any number
export const renderNonZeroField = value =>
  value > 0 ? (
    value.toPrecision(3)
  ) : (
    <span style={{ fontStyle: 'italic', color: '#CCC' }}>No data</span>
  );
