import React, { Component } from 'react';
import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';

const variants = [
    { id: 'rs123', pos: 109200000 },
    { id: 'rs124', pos: 109210000 },
    { id: 'rs121', pos: 109230000 },
    { id: 'rs122', pos: 109200000 },
    { id: 'rs125', pos: 109400000 },
    { id: 'rs126', pos: 109410000 },
    { id: 'rs128', pos: 109420000 },
    { id: 'rs129', pos: 109425000 },
    { id: 'rs130', pos: 109430000 },
    { id: 'rs127', pos: 109600000 },
];

const VariantTrack = (props) => {
    return <BaseTrack {...props}>
        {variants.map(d => <VariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default VariantTrack;
