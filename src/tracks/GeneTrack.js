import React from 'react';
import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';

export const GENE_SLOT_HEIGHT = 30;

const GeneTrack = (props) => {
    return <BaseTrack {...props} parentHeight={GENE_SLOT_HEIGHT * props.slots.length}>
        {props.slots.map((slot, i) => {
            return slot.genes.map(gene => {
                return <GeneFeature key={gene.id} data={gene} slotOffset={GENE_SLOT_HEIGHT * i} slotHeight={GENE_SLOT_HEIGHT} />
            })
        })}
    </BaseTrack>
}

export default GeneTrack;
