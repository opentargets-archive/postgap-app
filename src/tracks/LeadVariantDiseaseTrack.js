import React from 'react';
import BaseTrack from './BaseTrack';
import LeadVariantDiseaseFeature from '../features/LeadVariantDiseaseFeature';

const LeadVariantDiseaseTrack = (props) => {
    return <BaseTrack {...props}>
        {props.leadVariantDiseases.map(d => <LeadVariantDiseaseFeature key={d.id} data={d} diseaseScale={props.diseaseScale} />)}
    </BaseTrack>
}

export default LeadVariantDiseaseTrack;
