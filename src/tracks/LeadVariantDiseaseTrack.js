import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import LeadVariantDiseaseFeature from '../features/LeadVariantDiseaseFeature';
import {
  setHoverEntityId,
  setClickedEntityId,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

let LeadVariantDiseaseTrack = ({
  leadVariantDiseasesInteractive,
  isInteractive,
  setHoverId,
  setClickedId,
  ...rest
}) => {
  const handlers = { setHoverId, setClickedId };
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <BaseTrack {...rest}>
        {leadVariantDiseasesInteractive.map(d => (
          <LeadVariantDiseaseFeature
            key={d.id}
            data={d}
            {...handlers}
            diseaseScale={rest.diseaseScale}
            highlight={d.interactive}
            dimNonHighlighted={isInteractive}
          />
        ))}
      </BaseTrack>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    leadVariantDiseasesInteractive: selectors.getLeadVariantDiseasesInteractive(
      state
    ),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverId: entityId =>
      dispatch(
        setHoverEntityId({
          entityType: ENTITY_TYPE.LEAD_VARIANT_DISEASE,
          entityId,
        })
      ),
    setClickedId: entityId =>
      dispatch(
        setClickedEntityId({
          entityType: ENTITY_TYPE.LEAD_VARIANT_DISEASE,
          entityId,
        })
      ),
  };
};

LeadVariantDiseaseTrack = connect(mapStateToProps, mapDispatchToProps)(
  LeadVariantDiseaseTrack
);

export default LeadVariantDiseaseTrack;
