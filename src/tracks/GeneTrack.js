import React, { Component } from 'react';
import BaseTrack from './BaseTrack';
import GeneFeature from '../features/GeneFeature';

const genes = [
    {
        id: 'ENSG00000134243',
        description: 'sortilin 1 [Source:HGNC Symbol;Acc:HGNC:11186]',
        start: 109309568,
        end: 109397951,
        strand: -1,
        biotype: 'protein_coding',
        name: 'SORT1',
        chromosome: '1',
        canonicalTranscript: {
          id: 'ENST00000256637',
          start: 109309570,
          end: 109397951,
          exons: [
            {
              id: 'ENSE00000958074',
              start: 109397587,
              end: 109397951
            },
            {
              id: 'ENSE00003493181',
              start: 109369530,
              end: 109369589
            },
            {
              id: 'ENSE00003483854',
              start: 109367408,
              end: 109367481
            },
            {
              id: 'ENSE00003496428',
              start: 109355367,
              end: 109355469
            },
            {
              id: 'ENSE00003682938',
              start: 109354367,
              end: 109354531
            },
            {
              id: 'ENSE00000912895',
              start: 109350929,
              end: 109351002
            },
            {
              id: 'ENSE00000912897',
              start: 109347483,
              end: 109347532
            },
            {
              id: 'ENSE00000912899',
              start: 109345751,
              end: 109345881
            },
            {
              id: 'ENSE00000912900',
              start: 109342014,
              end: 109342158
            },
            {
              id: 'ENSE00000912902',
              start: 109340724,
              end: 109340879
            },
            {
              id: 'ENSE00000912904',
              start: 109336240,
              end: 109336346
            },
            {
              id: 'ENSE00003629480',
              start: 109327499,
              end: 109327601
            },
            {
              id: 'ENSE00000912908',
              start: 109326992,
              end: 109327160
            },
            {
              id: 'ENSE00001152449',
              start: 109324899,
              end: 109325089
            },
            {
              id: 'ENSE00000912912',
              start: 109322932,
              end: 109323121
            },
            {
              id: 'ENSE00000912914',
              start: 109317853,
              end: 109317969
            },
            {
              id: 'ENSE00001152424',
              start: 109316850,
              end: 109316958
            },
            {
              id: 'ENSE00003483084',
              start: 109314672,
              end: 109314778
            },
            {
              id: 'ENSE00001124417',
              start: 109314261,
              end: 109314384
            },
            {
              id: 'ENSE00001348032',
              start: 109309570,
              end: 109314057
            }
          ],
          translationStart: 109314043,
          translationEnd: 109397892
        }
    }
];

const GeneTrack = (props) => {
    return <BaseTrack {...props}>
        {genes.map(d => <GeneFeature key={d.id} data={d} />)}
    </BaseTrack>
}

export default GeneTrack;
