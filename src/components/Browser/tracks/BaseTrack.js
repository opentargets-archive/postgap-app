import React from 'react';
import { VictoryZoomContainer, VictoryAxis, VictoryChart } from 'victory';
import { withParentSize } from '@vx/responsive';

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
            <div
                style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
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
                    <VictoryAxis
                        style={{
                            axis: { opacity: 0 },
                            axisLabel: { opacity: 0 },
                            grid: { opacity: 0 },
                            ticks: { opacity: 0 },
                            tickLabels: { opacity: 0 },
                        }}
                    />
                    {this.props.children}
                </VictoryChart>
            </div>
        );
    }
}

BaseTrack = withParentSize(BaseTrack);

export default BaseTrack;
