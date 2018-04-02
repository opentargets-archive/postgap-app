import React from 'react';
import _ from 'lodash';
import * as d3 from 'd3';

import BaseTrack from './BaseTrack';
import DiseaseFeature from '../features/DiseaseFeature';
import DiseaseVerticalFeature from '../features/DiseaseVerticalFeature';
export const DISEASE_SLOT_HEIGHT = 60;
export const DISEASE_TRACK_MIN_HEIGHT = 20;
export const DISEASE_SLOT_COLS = 5;

let DiseaseTrack = ({
  diseases,
  diseaseIdsFiltered,
  // isInteractive,
  // setHoverId,
  // setClickedId,
  ...rest
}) => {
  // const handlers = { setHoverId, setClickedId };
  const quotient = Math.ceil(diseases.length / DISEASE_SLOT_COLS);
  const height =
    quotient > 0 ? DISEASE_SLOT_HEIGHT * quotient : DISEASE_TRACK_MIN_HEIGHT;
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
        {diseases.map(d => {
          {
            /* if (diseaseIdsFiltered.indexOf(d.id) >= 0) { */
          }
          return (
            <DiseaseVerticalFeature
              key={d.id}
              data={d}
              diseaseScale={rest.diseaseScale}
              slotHeight={DISEASE_SLOT_HEIGHT}
              slotOffset={verticalScale(d.name)}
            />
          );
          {
            /* } else {
            return null;
          } */
          }
        })}

        {diseases.map(d => (
          <DiseaseFeature
            key={d.id}
            data={d}
            diseaseScale={rest.diseaseScale}
            slotHeight={DISEASE_SLOT_HEIGHT}
            slotOffset={verticalScale(d.name)}
          />
        ))}
      </BaseTrack>
    </div>
  );
};

// {...handlers}
//                 highlight={d.interactive}
//                 dimNonHighlighted={isInteractive}

// {...handlers}
//             highlight={d.interactive}
// dimNonHighlighted={isInteractive}

export default DiseaseTrack;
