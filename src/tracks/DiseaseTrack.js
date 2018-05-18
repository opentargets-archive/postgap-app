import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

import BaseTrack from './BaseTrack';
import { DebouncedDiseaseFeatureSet } from '../features/DiseaseFeature';
export const DISEASE_SLOT_HEIGHT = 60;
export const DISEASE_TRACK_MIN_HEIGHT = 20;
export const DISEASE_SLOT_COLS = 5;

let DiseaseTrack = ({ diseases, setClicked, isInSelectedState, ...rest }) => {
    const quotient = Math.ceil(diseases.length / DISEASE_SLOT_COLS);
    const height =
        quotient > 0
            ? DISEASE_SLOT_HEIGHT * quotient
            : DISEASE_TRACK_MIN_HEIGHT;
    const verticalRange = _.range(0, diseases.length).map(
        i => DISEASE_SLOT_HEIGHT * (i % quotient)
    );
    const verticalScale = d3
        .scaleOrdinal()
        .domain(diseases.map(d => d.name).sort())
        .range(verticalRange);
    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <BaseTrack {...rest} parentHeight={height}>
                <DebouncedDiseaseFeatureSet
                    diseases={diseases}
                    diseaseScale={rest.diseaseScale}
                    verticalScale={verticalScale}
                    slotHeight={DISEASE_SLOT_HEIGHT}
                    setClicked={setClicked}
                    dimNonHighlighted={isInSelectedState}
                />
            </BaseTrack>
        </div>
    );
};

export default DiseaseTrack;
