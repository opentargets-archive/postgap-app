import React from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { scalePoint } from 'd3-scale';

import ScaleTrack from './tracks/ScaleTrack';
import GeneTrack, { GENE_SLOT_HEIGHT } from './tracks/GeneTrack';
import GeneVariantTrack from './tracks/GeneVariantTrack';
import VariantTrack from './tracks/VariantTrack';
import LeadVariantTrack from './tracks/LeadVariantTrack';
import { setLocation, selectors } from './redux/store';
import VariantLeadVariantTrack from './tracks/VariantLeadVariantTrack';
import DiseaseTrack from './tracks/DiseaseTrack';
import LeadVariantDiseaseTrack from './tracks/LeadVariantDiseaseTrack';
import { commaSeparate } from './stringFormatters';
import DictionaryHelpTerm from './terms/DictionaryHelpTerm';

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.zoomHandler = this.zoomHandler.bind(this);
  }

  zoomHandler(domain) {
    const { chromosome } = this.props.location;
    const { chromosomeLength } = this.props;
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
    this.props.setLocation({ start, end, chromosome });
  }

  render() {
    const { location, slots, diseases } = this.props;
    const { start, end, chromosome } = location;
    const diseaseScale = scalePoint().domain(diseases.map(d => d.efoId));
    const diseaseSlotsCount = Math.ceil(diseases.length / 5);
    const labelColSize = 4;
    const commonProps = {
      start,
      end,
      chromosome,
      zoomHandler: this.zoomHandler,
      windowResizeDebounceTime: 50,
    };
    return (
      <div>
        <Row>
          <Col offset={labelColSize} span={24 - labelColSize}>
            <Card bodyStyle={{ padding: 10 }}>
              <span>{`Human ${chromosome}:${commaSeparate(
                start
              )}-${commaSeparate(end)}`}</span>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col offset={labelColSize} span={24 - labelColSize}>
            <Card bodyStyle={{ padding: 0, height: '10px' }}>
              <ScaleTrack {...commonProps} />
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
                height: `${GENE_SLOT_HEIGHT * slots.length}px`,
              }}
            >
              <GeneTrack {...commonProps} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col offset={labelColSize} span={24 - labelColSize}>
            <Card bodyStyle={{ padding: 0, height: '80px' }}>
              <GeneVariantTrack {...commonProps} />
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
            <Card bodyStyle={{ padding: 0, height: '20px' }}>
              <VariantTrack {...commonProps} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col offset={labelColSize} span={24 - labelColSize}>
            <Card bodyStyle={{ padding: 0, height: '80px' }}>
              <VariantLeadVariantTrack {...commonProps} />
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
            <Card bodyStyle={{ padding: 0, height: '20px' }}>
              <LeadVariantTrack {...commonProps} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col offset={labelColSize} span={24 - labelColSize}>
            <Card bodyStyle={{ padding: 0, height: '80px' }}>
              <LeadVariantDiseaseTrack
                diseaseScale={diseaseScale}
                {...commonProps}
              />
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
              bodyStyle={{ padding: 0, height: `${60 * diseaseSlotsCount}px` }}
            >
              <DiseaseTrack diseaseScale={diseaseScale} {...commonProps} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chromosome: selectors.getChromosome(state),
    location: selectors.getLocation(state),
    slots: selectors.getSlots(state),
    diseases: selectors.getDiseases(state),
    chromosomeLength: selectors.getChromosomeLength(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => dispatch(setLocation(location)),
  };
};

Browser = connect(mapStateToProps, mapDispatchToProps)(Browser);

export default Browser;
