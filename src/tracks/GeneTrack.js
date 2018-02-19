import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';
import GeneVerticalFeature from '../features/GeneVerticalFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors
} from '../redux/store';

export const GENE_SLOT_HEIGHT = 30;

let GeneTrack = props => {
  const height = GENE_SLOT_HEIGHT * props.slots.length;
  return (
    <BaseTrack {...props} parentHeight={height}>
      {props.slots.map((slot, i) => {
        return slot.genes.map(gene => {
          return (
            <GeneVerticalFeature
              key={gene.id}
              data={gene}
              slotOffset={GENE_SLOT_HEIGHT * i}
              slotHeight={GENE_SLOT_HEIGHT}
              trackHeight={height}
            />
          );
        });
      })}
      {props.slots.map((slot, i) => {
        return slot.genes.map(gene => {
          return (
            <GeneFeature
              key={gene.id}
              data={gene}
              slotOffset={GENE_SLOT_HEIGHT * i}
              slotHeight={GENE_SLOT_HEIGHT}
              setHoverGene={props.setHoverGene}
              setClickedGene={props.setClickedGene}
            />
          );
        });
      })}
    </BaseTrack>
  );
};

const mapStateToProps = state => {
  return {
    slots: selectors.getSlots(state),
    genes: selectors.getVisibleGenes(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHoverGene: gene =>
      dispatch(setHoverEntity({ entityType: ENTITY_TYPE.GENE, entity: gene })),
    setClickedGene: gene =>
      dispatch(setClickedEntity({ entityType: ENTITY_TYPE.GENE, entity: gene }))
  };
};

GeneTrack = connect(mapStateToProps, mapDispatchToProps)(GeneTrack);

export default GeneTrack;
