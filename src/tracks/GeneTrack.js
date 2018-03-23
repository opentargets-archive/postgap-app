import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';
import GeneVerticalFeature from '../features/GeneVerticalFeature';
import {
  setHoverEntityId,
  setClickedEntityId,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

export const GENE_SLOT_HEIGHT = 35;
export const GENE_TRACK_PADDING = 15;

let GeneTrack = props => {
  const height = GENE_SLOT_HEIGHT * props.slots.length + 2 * GENE_TRACK_PADDING;
  const { isInteractive } = props;
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <BaseTrack {...props} parentHeight={height}>
        {props.slots.map((slot, i) => {
          return slot.genes.map(gene => {
            if (props.geneIdsFiltered.indexOf(gene.id) >= 0) {
              return (
                <GeneVerticalFeature
                  key={gene.id}
                  data={gene}
                  slotOffset={GENE_SLOT_HEIGHT * i + GENE_TRACK_PADDING}
                  slotHeight={GENE_SLOT_HEIGHT}
                  trackHeight={height}
                  highlight={gene.interactive}
                  dimNonHighlighted={isInteractive}
                />
              );
            } else {
              return null;
            }
          });
        })}
        {props.slots.map((slot, i) => {
          return slot.genes.map(gene => {
            return (
              <GeneFeature
                key={gene.id}
                data={gene}
                slotOffset={GENE_SLOT_HEIGHT * i + GENE_TRACK_PADDING}
                slotHeight={GENE_SLOT_HEIGHT}
                setHoverGeneId={props.setHoverGeneId}
                setClickedGeneId={props.setClickedGeneId}
                highlight={gene.interactive}
                dimNonHighlighted={isInteractive}
              />
            );
          });
        })}
      </BaseTrack>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    slots: selectors.getSlotsInteractive(state),
    genes: selectors.getGenesInteractive(state),
    geneIdsFiltered: selectors.getGeneIdsFiltered(state),
    isInteractive: selectors.getIsInteractive(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverGeneId: geneId =>
      dispatch(
        setHoverEntityId({ entityType: ENTITY_TYPE.GENE, entityId: geneId })
      ),
    setClickedGeneId: geneId =>
      dispatch(
        setClickedEntityId({ entityType: ENTITY_TYPE.GENE, entityId: geneId })
      ),
  };
};

GeneTrack = connect(mapStateToProps, mapDispatchToProps)(GeneTrack);

export default GeneTrack;
