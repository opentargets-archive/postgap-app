import React from 'react';
import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';

const VariantTrack = (props) => {
    return <BaseTrack {...props}>
        {props.variants.map(d => <VariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default VariantTrack;
