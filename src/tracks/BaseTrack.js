import React, { Component } from 'react';
import { VictoryLine, VictoryArea, VictoryLabel, VictoryZoomContainer, VictoryAxis, VictoryChart } from 'victory';
import { withParentSize } from '@vx/responsive';
import { connect } from 'react-redux';

class BaseTrack extends React.Component {
    render() {
        const { chromosome, location, zoomHandler } = this.props;
        const chrLength = 1000000000;
        const { start, end } = location;
        return (
        <VictoryChart
            width={900}
            height={30}
            padding={{left: 0, right: 0, top: 0, bottom: 0}}
            scale={{x: "linear"}} 
            domain={{x: [0, chrLength]}}             
            containerComponent={
                <VictoryZoomContainer
                // responsive={false}
                zoomDimension="x"
                zoomDomain={{x: [start, end]}}
                onZoomDomainChange={zoomHandler}
                minimumZoom={{x: 1}}
                />
            }
        >
            <VictoryAxis style={{stroke: null, fill:null}} />
            {this.props.children}
        </VictoryChart>
      );
    }
}

const mapStateToProps = state => {
    return {
        chromosome: state.chromosome,
        location: state.location,
    }
}

BaseTrack = connect(mapStateToProps)(BaseTrack);

export default BaseTrack;
