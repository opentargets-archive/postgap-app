import React from 'react';
import { VictoryZoomContainer, VictoryAxis, VictoryChart } from 'victory';
import { withParentSize } from '@vx/responsive';
import { connect } from 'react-redux';

import { selectors } from '../redux/store';

class BaseTrack extends React.Component {
  render() {
    const {
      location,
      zoomHandler,
      parentWidth,
      parentHeight,
      chromosomeLength,
    } = this.props;
    const { start, end } = location;
    return (
      <VictoryChart
        width={parentWidth}
        height={parentHeight}
        padding={{ left: 0, right: 0, top: 0, bottom: 0 }}
        scale={{ x: 'linear' }}
        domain={{ x: [0, chromosomeLength] }}
        containerComponent={
          <VictoryZoomContainer
            responsive={false}
            zoomDimension="x"
            zoomDomain={{ x: [start, end] }}
            onZoomDomainChange={zoomHandler}
            minimumZoom={{ x: 1 }}
          />
        }
      >
        <VictoryAxis style={{ stroke: null, fill: null }} />
        {this.props.children}
      </VictoryChart>
    );
  }
}

const mapStateToProps = state => {
  return {
    chromosome: selectors.getChromosome(state),
    chromosomeLength: selectors.getChromosomeLength(state),
    location: selectors.getLocation(state),
  };
};

BaseTrack = connect(mapStateToProps)(withParentSize(BaseTrack));

export default BaseTrack;
