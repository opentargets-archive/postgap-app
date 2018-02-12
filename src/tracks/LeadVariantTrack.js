import React, { Component } from 'react';
import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';

const leadVariants = [
    { id: 'rs123', pos: 109200000 },
    { id: 'rs125', pos: 109400000 },
    { id: 'rs127', pos: 109600000 },
];

const LeadVariantTrack = (props) => {
    return <BaseTrack {...props}>
        {leadVariants.map(d => <VariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default LeadVariantTrack;
