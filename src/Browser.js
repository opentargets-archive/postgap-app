import React from 'react';
import { Card } from 'antd';
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

class Browser extends React.Component {
  constructor(props) {
    super(props);
    this.zoomHandler = this.zoomHandler.bind(this);
  }

  zoomHandler(domain) {
    const { chromosome } = this.props.location;
    let start = Math.round(domain.x[0]);
    let end = Math.round(domain.x[1]);
    if (start < 0) start = 0;
    // if (end > this.state.chrLength) end = this.state.chrLength;
    this.props.setLocation({ start, end, chromosome });
  }

  render() {
    const { location, slots, diseases } = this.props;
    const { start, end, chromosome } = location;
    const diseaseScale = scalePoint().domain(diseases.map(d => d.efoId));
    const commonProps = {
      start,
      end,
      chromosome,
      zoomHandler: this.zoomHandler,
      windowResizeDebounceTime: 50
    };
    return (
      <div>
        <Card bodyStyle={{ padding: 10 }}>
          <span>{`Human ${chromosome}:${commaSeparate(start)}-${commaSeparate(
            end
          )}`}</span>
        </Card>
        <Card bodyStyle={{ padding: 0, height: '10px' }}>
          <ScaleTrack {...commonProps} />
        </Card>
        <Card
          bodyStyle={{
            padding: 0,
            height: `${GENE_SLOT_HEIGHT * slots.length}px`
          }}
        >
          <GeneTrack {...commonProps} />
        </Card>
        <Card bodyStyle={{ padding: 0, height: '80px' }}>
          <GeneVariantTrack {...commonProps} />
        </Card>
        <Card bodyStyle={{ padding: 0, height: '15px' }}>
          <VariantTrack {...commonProps} />
        </Card>
        <Card bodyStyle={{ padding: 0, height: '80px' }}>
          <VariantLeadVariantTrack {...commonProps} />
        </Card>
        <Card bodyStyle={{ padding: 0, height: '15px' }}>
          <LeadVariantTrack {...commonProps} />
        </Card>
        <Card bodyStyle={{ padding: 0, height: '80px' }}>
          <LeadVariantDiseaseTrack
            diseaseScale={diseaseScale}
            {...commonProps}
          />
        </Card>
        <Card bodyStyle={{ padding: 0, height: '60px' }}>
          <DiseaseTrack diseaseScale={diseaseScale} {...commonProps} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chromosome: state.chromosome,
    location: state.location,
    slots: selectors.getSlots(state),
    diseases: selectors.getDiseases(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => dispatch(setLocation(location))
  };
};

Browser = connect(mapStateToProps, mapDispatchToProps)(Browser);

export default Browser;
