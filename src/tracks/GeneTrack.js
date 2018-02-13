import React from 'react';
import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';

const GeneTrack = (props) => {
    return <BaseTrack {...props}>
        {props.genes.map(d => <GeneFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default GeneTrack;
