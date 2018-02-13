import React from 'react';
import BaseTrack from './BaseTrack';
import VariantFeature from '../features/VariantFeature';

const LeadVariantTrack = (props) => {
    return <BaseTrack {...props}>
        {props.leadVariants.map(d => <VariantFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default LeadVariantTrack;
