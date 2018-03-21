import React from 'react';
import { connect } from 'react-redux';

import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';
import GeneVerticalFeature from '../features/GeneVerticalFeature';
import {
  setHoverEntity,
  setClickedEntity,
  ENTITY_TYPE,
  selectors,
} from '../redux/store';

export const GENE_SLOT_HEIGHT = 35;
export const GENE_TRACK_PADDING = 15;

let GeneTrack = props => {
  const height = GENE_SLOT_HEIGHT * props.slots.length + 2 * GENE_TRACK_PADDING;
  const { isInteractive } = props;
  return (
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
              setHoverGene={props.setHoverGene}
              setClickedGene={props.setClickedGene}
              highlight={gene.interactive}
              dimNonHighlighted={isInteractive}
            />
          );
        });
      })}
    </BaseTrack>
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
    setHoverGene: gene =>
      dispatch(setHoverEntity({ entityType: ENTITY_TYPE.GENE, entity: gene })),
    setClickedGene: gene =>
      dispatch(
        setClickedEntity({ entityType: ENTITY_TYPE.GENE, entity: gene })
      ),
  };
};

GeneTrack = connect(mapStateToProps, mapDispatchToProps)(GeneTrack);

export default GeneTrack;
