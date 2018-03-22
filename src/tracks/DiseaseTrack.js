import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as d3 from 'd3';

import BaseTrack from './BaseTrack';
import DiseaseFeature from '../features/DiseaseFeature';
import DiseaseVerticalFeature from '../features/DiseaseVerticalFeature';
import {
  setHoverEntityId,
  setClickedEntityId,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';
export const DISEASE_SLOT_HEIGHT = 60;

let DiseaseTrack = ({
  diseases,
  diseaseIdsFiltered,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  const quotient = Math.ceil(diseases.length / 5);
  const height = DISEASE_SLOT_HEIGHT * quotient;
  const verticalRange = _.range(0, diseases.length).map(
    i => DISEASE_SLOT_HEIGHT * (i % quotient)
  );
  const verticalScale = d3
    .scaleOrdinal()
    .domain(diseases.map(d => d.efoName).sort())
    .range(verticalRange);
  return (
    <BaseTrack {...rest} parentHeight={height}>
      {diseases.map(d => {
        if (diseaseIdsFiltered.indexOf(d.efoId) >= 0) {
          return (
            <DiseaseVerticalFeature
              key={d.efoId}
              data={d}
              diseaseScale={rest.diseaseScale}
              slotHeight={DISEASE_SLOT_HEIGHT}
              slotOffset={verticalScale(d.efoName)}
              {...handlers}
              highlight={d.interactive}
              dimNonHighlighted={isInteractive}
            />
          );
        } else {
          return null;
        }
      })}

      {diseases.map(d => (
        <DiseaseFeature
          key={d.efoId}
          data={d}
          diseaseScale={rest.diseaseScale}
          slotHeight={DISEASE_SLOT_HEIGHT}
          slotOffset={verticalScale(d.efoName)}
          {...handlers}
          highlight={d.interactive}
          dimNonHighlighted={isInteractive}
        />
      ))}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    diseases: selectors.getDiseasesInteractive(state),
    diseaseIdsFiltered: selectors.getDiseaseIdsFiltered(state),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverId: entityId =>
      dispatch(setHoverEntityId({ entityType: ENTITY_TYPE.DISEASE, entityId })),
    setClickedId: entityId =>
      dispatch(
        setClickedEntityId({ entityType: ENTITY_TYPE.DISEASE, entityId })
      ),
  };
};

DiseaseTrack = connect(mapStateToProps, mapDispatchToProps)(DiseaseTrack);

export default DiseaseTrack;
