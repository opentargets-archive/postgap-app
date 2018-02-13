import React from 'react';
import BaseTrack from './BaseTrack';
import GeneVariantFeature from '../features/GeneVariantFeature';

const GeneVariantTrack = (props) => {
    return <BaseTrack {...props}>
        {props.geneVariants.map(d => <GeneVariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default GeneVariantTrack;
