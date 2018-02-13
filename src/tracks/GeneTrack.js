import React from 'react';
import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';
import GeneVerticalFeature from '../features/GeneVerticalFeature';

export const GENE_SLOT_HEIGHT = 30;

const GeneTrack = (props) => {
    const height = GENE_SLOT_HEIGHT * props.slots.length;
    return <BaseTrack {...props} parentHeight={height}>
        {props.slots.map((slot, i) => {
            return slot.genes.map(gene => {
                return <GeneVerticalFeature key={gene.id} data={gene} slotOffset={GENE_SLOT_HEIGHT * i} slotHeight={GENE_SLOT_HEIGHT} trackHeight={height} />
            })
        })}
        {props.slots.map((slot, i) => {
            return slot.genes.map(gene => {
                return <GeneFeature key={gene.id} data={gene} slotOffset={GENE_SLOT_HEIGHT * i} slotHeight={GENE_SLOT_HEIGHT} />
            })
        })}
    </BaseTrack>
}

export default GeneTrack;
