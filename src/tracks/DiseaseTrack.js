import React from 'react';
import BaseTrack from './BaseTrack';
import DiseaseFeature from '../features/DiseaseFeature';

const DiseaseTrack = (props) => {        
    return <BaseTrack {...props}>
        {props.diseases.map(d => <DiseaseFeature key={d.id} data={d} diseaseScale={props.diseaseScale} />)}
    </BaseTrack>
}

export default DiseaseTrack;
