import React, { Component } from 'react';
import BaseTrack from './BaseTrack';
import VariantLeadVariantFeature from '../features/VariantLeadVariantFeature';

const variantLeadVariants = [
    { id: 'rs123-rs121', ldSnpPos: 109200000, leadSnpPos: 109230000 },
    { id: 'rs123-rs124', ldSnpPos: 109200000, leadSnpPos: 109210000 },
    // { id: 'rs121', pos: 109230000 },
    // { id: 'rs122', pos: 109200000 },
    // { id: 'rs125', pos: 109400000 },
    { id: 'rs125-rs126', ldSnpPos: 109400000, leadSnpPos: 109410000 },
    { id: 'rs125-rs128', ldSnpPos: 109400000, leadSnpPos: 109420000 },
    // { id: 'rs126', pos: 109410000 },
    // { id: 'rs128', pos: 109420000 },
    // { id: 'rs129', pos: 109425000 },
    // { id: 'rs130', pos: 109430000 },
    // { id: 'rs127', pos: 109600000 },
];

const VariantLeadVariantTrack = (props) => {
    return <BaseTrack {...props}>
        {variantLeadVariants.map(d => <VariantLeadVariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default VariantLeadVariantTrack;
