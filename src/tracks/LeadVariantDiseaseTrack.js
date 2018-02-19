import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import LeadVariantDiseaseFeature from '../features/LeadVariantDiseaseFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors
} from '../redux/store';

let LeadVariantDiseaseTrack = ({
  leadVariantDiseases,
  setHover,
  setClicked,
  ...rest
}) => {
  const handlers = { setHover, setClicked };
  return (
    <BaseTrack {...rest}>
      {leadVariantDiseases.map(d => (
        <LeadVariantDiseaseFeature
          key={d.id}
          data={d}
          {...handlers}
          diseaseScale={rest.diseaseScale}
        />
      ))}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    leadVariantDiseases: selectors.getVisibleLeadVariantDiseases(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHover: entity =>
      dispatch(
        setHoverEntity({ entityType: ENTITY_TYPE.LEAD_VARIANT_DISEASE, entity })
      ),
    setClicked: entity =>
      dispatch(
        setClickedEntity({
          entityType: ENTITY_TYPE.LEAD_VARIANT_DISEASE,
          entity
        })
      )
  };
};

LeadVariantDiseaseTrack = connect(mapStateToProps, mapDispatchToProps)(
  LeadVariantDiseaseTrack
);

export default LeadVariantDiseaseTrack;
