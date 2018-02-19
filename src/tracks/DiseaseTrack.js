import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import DiseaseFeature from '../features/DiseaseFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors
} from '../redux/store';

let DiseaseTrack = ({ diseases, setHover, setClicked, ...rest }) => {
  const handlers = { setHover, setClicked };
  return (
    <BaseTrack {...rest}>
      {diseases.map(d => (
        <DiseaseFeature
          key={d.efoId}
          data={d}
          diseaseScale={rest.diseaseScale}
          {...handlers}
        />
      ))}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    diseases: selectors.getDiseases(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHover: disease =>
      dispatch(
        setHoverEntity({ entityType: ENTITY_TYPE.DISEASE, entity: disease })
      ),
    setClicked: disease =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.DISEASE, entity: disease })
      )
  };
};

DiseaseTrack = connect(mapStateToProps, mapDispatchToProps)(DiseaseTrack);

export default DiseaseTrack;
