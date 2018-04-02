import React from 'react';
import { compose } from 'recompose';
import withDebouncedProps from './withDebouncedProps';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, Row, Col, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { scalePoint } from 'd3-scale';
import * as d3 from 'd3';
import FileSaver from 'file-saver';
import _ from 'lodash';

import GeneTrack, {
  GENE_SLOT_HEIGHT,
  GENE_TRACK_PADDING,
} from './tracks/GeneTrack';
import GeneVariantTrack from './tracks/GeneVariantTrack';
import VariantTrack from './tracks/VariantTrack';
import LeadVariantTrack from './tracks/LeadVariantTrack';
import VariantLeadVariantTrack from './tracks/VariantLeadVariantTrack';
import DiseaseTrack, {
  DISEASE_SLOT_HEIGHT,
  DISEASE_TRACK_MIN_HEIGHT,
  DISEASE_SLOT_COLS,
} from './tracks/DiseaseTrack';
import LeadVariantDiseaseTrack from './tracks/LeadVariantDiseaseTrack';
import { commaSeparate } from './stringFormatters';
import DictionaryHelpTerm from './terms/DictionaryHelpTerm';
import Spinner from './Spinner';
import { chromosomeLengths } from './redux/chromosomeLengths';

const LOCUS_BROWSER_QUERY = gql`
  query LocusBrowserQuery($chromosome: String, $start: Int, $end: Int) {
    locus(chromosome: $chromosome, start: $start, end: $end) {
      genes {
        id
        symbol
        chromosome
        tss
        start
        end
        forwardStrand
        canonicalTranscript {
          id
          start
          end
          forwardStrand
          exons {
            id
            start
            end
          }
          tss
          translationStart
          translationEnd
        }
      }
      variants {
        id
        chromosome
        position
      }
      leadVariants {
        id
        chromosome
        position
      }
      diseases {
        id
        name
      }
      geneVariants {
        id
        geneId
        geneSymbol
        geneChromosome
        geneTss
        canonicalTranscript {
          start
          end
          forwardStrand
        }
        variantId
        variantChromosome
        variantPosition
        # TODO: otG2VScore: Float
        vep
        gtex
        pchic
        fantom5
        dhs
        nearest
      }
      variantLeadVariants {
        id
        variantId
        variantChromosome
        variantPosition
        leadVariantId
        leadVariantChromosome
        leadVariantPosition
        r2
      }
      leadVariantDiseases {
        id
        leadVariantId
        leadVariantPosition
        leadVariantChromosome
        efoId
        efoName
        gwasBeta
        gwasPMId
        gwasSize
        gwasStudy
        gwasPValue
        gwasOddsRatio
      }
    }
  }
`;

const calculateGeneSlots = (genes, location) => {
  const sortedGenes = _.sortBy(genes, ['start']);
  const slots = [];
  const minXOffset = (location.end - location.start) * 0.15; // 15% of browser window
  sortedGenes.forEach(gene => {
    const suitableSlots = slots.filter(
      slot => gene.start > slot.end + minXOffset
    );
    if (suitableSlots.length > 0) {
      suitableSlots[0].genes.push(gene);
      suitableSlots[0].end = gene.end;
    } else {
      const newSlot = { genes: [gene], end: gene.end };
      slots.push(newSlot);
    }
  });
  return slots;
};

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.zoomHandler = this.zoomHandler.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
  }

  zoomHandler(domain) {
    const query = queryString.parse(this.props.location.search);
    const { chromosome } = query;
    const chromosomeLength = chromosomeLengths[chromosome];
    const MAX_WINDOW_WIDTH = 2500000;
    let start = Math.round(domain.x[0]);
    let end = Math.round(domain.x[1]);
    if (end - start > MAX_WINDOW_WIDTH) {
      // cannot zoom out more than 2.5MB window
      // TODO: use mouse percentage rather than midpoint to trim excess
      const excess = Math.round((end - start - MAX_WINDOW_WIDTH) / 2);
      start += excess;
      end -= excess;
    }
    if (start < 0) start = 0;
    if (end > chromosomeLength) end = chromosomeLength;
    setLocationInUrl({ start, end, chromosome }, this.props.history);
  }

  onDownloadClick() {
    const { filename, filterString } = this.props;
    const query = queryString.parse(this.props.location.search);
    const { chromosome } = query;
    const start = parseInt(query.start);
    const end = parseInt(query.end);

    // grab all the tracks
    const tracks = d3.selectAll('.VictoryContainer > svg');

    // get their common width and heights
    const width = tracks.attr('width');
    const heights = tracks.nodes().map(d => d.clientHeight);

    // get cumulative heights
    const cumulativeHeights = [];
    heights.reduce(function(a, b, i) {
      return (cumulativeHeights[i] = a + b);
    }, 0);
    const titleOffset = 100;
    const fullHeight =
      cumulativeHeights[cumulativeHeights.length - 1] + titleOffset;

    // construct a group element from each and offset
    const tracksAsGs = tracks.nodes().map((d, i) => {
      const d2 = d.cloneNode(true);
      d2.setAttribute(
        'transform',
        `translate(0,${
          i > 0 ? cumulativeHeights[i - 1] + titleOffset : titleOffset
        })`
      );
      return d2.outerHTML.replace(/svg/g, 'g');
    });

    // add title track
    const titleG = `<g><text x="${width /
      2}" y="20" text-anchor="middle" style="fill: black; font-size: 20px;">POSTGAP locus ${chromosome}:${start}-${end}</text><text x="${width /
      2}" text-anchor="middle" y="50" style="fill: black; font-size: 16px;">${filterString}</text></g>`;
    tracksAsGs.push(titleG);

    // download
    var blob = new Blob(
      [
        `<svg width="${width}" height="${fullHeight}" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="locusClip"><rect x="0" y="0" width="${width}" height="${fullHeight}"/></clipPath></defs><g clip-path="url(#locusClip)">${tracksAsGs.join(
          ''
        )}</g></svg>`,
      ],
      { type: 'application/svg+xml' }
    );
    FileSaver.saveAs(blob, `${filename}.svg`);
  }

  render() {
    const query = queryString.parse(this.props.location.search);
    const { chromosome } = query;
    const start = parseInt(query.start);
    const end = parseInt(query.end);

    const queryDebounced = queryString.parse(
      this.props.locationDebounced.search
    );
    const { chromosome: chromosomeDebounced } = queryDebounced;
    const startDebounced = parseInt(queryDebounced.start);
    const endDebounced = parseInt(queryDebounced.end);

    const labelColSize = 4;
    const commonProps = {
      location: {
        start,
        end,
        chromosome,
      },
      locationDebounced: {
        startDebounced,
        endDebounced,
      },
      chromosomeLength: chromosomeLengths[chromosome],
      zoomHandler: this.zoomHandler,
      windowResizeDebounceTime: 50,
    };
    return (
      <Query
        query={LOCUS_BROWSER_QUERY}
        variables={{
          start: startDebounced,
          end: endDebounced,
          chromosome: chromosomeDebounced,
        }}
      >
        {({ loading, error, data }) => {
          {
            /* if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>; */
          }
          if (!data || !data.locus) return null;
          const genes = data.locus.genes;
          const slots = calculateGeneSlots(genes, commonProps.location);
          const diseases = data.locus.diseases;
          const diseaseScale = scalePoint().domain(
            diseases.map(d => d.name).sort()
          );
          const diseaseSlotsCount = Math.ceil(
            diseases.length / DISEASE_SLOT_COLS
          );
          return (
            <div>
              <Row>
                <Col offset={labelColSize} span={24 - labelColSize}>
                  <Card bodyStyle={{ padding: 10 }}>
                    <span>{`Human ${chromosome}:${commaSeparate(
                      start
                    )}-${commaSeparate(end)}`}</span>
                    <Button
                      size="small"
                      type="primary"
                      ghost
                      style={{ marginRight: '5px', float: 'right' }}
                      onClick={this.onDownloadClick}
                    >
                      SVG
                    </Button>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={labelColSize}>
                  <DictionaryHelpTerm
                    term={'genes'}
                    label={
                      <span
                        style={{
                          fontWeight: 100,
                          fontStyle: 'italic',
                          textAlign: 'right',
                        }}
                      >
                        Genes
                      </span>
                    }
                  />
                </Col>
                <Col span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: `${GENE_SLOT_HEIGHT * slots.length +
                        GENE_TRACK_PADDING * 2}px`,
                      position: 'relative',
                    }}
                  >
                    <GeneTrack slots={slots} {...commonProps} />
                    <Spinner showIcon={true} />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col offset={labelColSize} span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: '80px',
                      position: 'relative',
                    }}
                  >
                    <GeneVariantTrack
                      geneVariants={data.locus.geneVariants}
                      {...commonProps}
                    />
                    <Spinner />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={labelColSize}>
                  <DictionaryHelpTerm
                    term={'variants'}
                    label={
                      <span
                        style={{
                          fontWeight: 100,
                          fontStyle: 'italic',
                          textAlign: 'right',
                        }}
                      >
                        Variants
                      </span>
                    }
                  />
                </Col>
                <Col span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: '20px',
                      position: 'relative',
                    }}
                  >
                    <VariantTrack
                      variants={data.locus.variants}
                      {...commonProps}
                    />
                    <Spinner />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col offset={labelColSize} span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: '80px',
                      position: 'relative',
                    }}
                  >
                    <VariantLeadVariantTrack
                      variantLeadVariants={data.locus.variantLeadVariants}
                      {...commonProps}
                    />
                    <Spinner />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={labelColSize}>
                  <DictionaryHelpTerm
                    term={'leadvariants'}
                    label={
                      <span
                        style={{
                          fontWeight: 100,
                          fontStyle: 'italic',
                          textAlign: 'right',
                        }}
                      >
                        Lead Variants
                      </span>
                    }
                  />
                </Col>
                <Col span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: '20px',
                      position: 'relative',
                    }}
                  >
                    <LeadVariantTrack
                      leadVariants={data.locus.leadVariants}
                      {...commonProps}
                    />
                    <Spinner />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col offset={labelColSize} span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: '80px',
                      position: 'relative',
                    }}
                  >
                    <LeadVariantDiseaseTrack
                      leadVariantDiseases={data.locus.leadVariantDiseases}
                      diseaseScale={diseaseScale}
                      {...commonProps}
                    />
                    <Spinner />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={labelColSize}>
                  <DictionaryHelpTerm
                    term={'diseases'}
                    label={
                      <span
                        style={{
                          fontWeight: 100,
                          fontStyle: 'italic',
                          textAlign: 'right',
                        }}
                      >
                        Diseases
                      </span>
                    }
                  />
                </Col>
                <Col span={24 - labelColSize}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                      height: `${
                        diseaseSlotsCount > 0
                          ? DISEASE_SLOT_HEIGHT * diseaseSlotsCount
                          : DISEASE_TRACK_MIN_HEIGHT
                      }px`,
                      position: 'relative',
                    }}
                  >
                    <DiseaseTrack
                      diseases={data.locus.diseases}
                      diseaseScale={diseaseScale}
                      {...commonProps}
                    />
                    <Spinner />
                  </Card>
                </Col>
              </Row>
            </div>
          );
        }}
      </Query>
    );
  }
}

const setLocationInUrl = (location, history) => {
  const oldQueryParams = queryString.parse(history.location.search);
  const newQueryParams = queryString.stringify({
    ...oldQueryParams,
    ...location,
  });
  history.replace({
    ...history.location,
    search: newQueryParams,
  });
};

// const withData = graphql(DATA_QUERY, {
//   options: props => ({
//     variables: { name: props.valueDebounced },
//   }),
// });

const BROWSER_API_DEBOUNCE = 500;

Browser = withDebouncedProps({
  debounce: BROWSER_API_DEBOUNCE,
  propNames: ['location'],
})(Browser);
Browser = withRouter(Browser);
// Browser = compose(
//   // withState,
//   withDebouncedProps({ debounce: 2000, propNames: [ 'location' ] })
//   // withData,
// )(Browser);

export default Browser;
