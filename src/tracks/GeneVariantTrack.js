import React, { Component } from 'react';
import BaseTrack from './BaseTrack';
import GeneVariantFeature from '../features/GeneVariantFeature';

const geneVariants = [
    { id: 'CELSR2-rs123', geneTss: 109250019, ldSnpPos: 109200000 },
    { id: 'CELSR2-rs124', geneTss: 109250019, ldSnpPos: 109210000 },
    // { id: 'rs121', pos: 109230000 },
    // { id: 'rs122', pos: 109200000 },
    // { id: 'rs125', pos: 109400000 },
    // { id: 'rs126', pos: 109410000 },
    // { id: 'rs128', pos: 109420000 },
    // { id: 'rs129', pos: 109425000 },
    // { id: 'rs130', pos: 109430000 },
    // { id: 'rs127', pos: 109600000 },
];

const GeneVariantTrack = (props) => {
    return <BaseTrack {...props}>
        {geneVariants.map(d => <GeneVariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default GeneVariantTrack;
