import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

import GeneTrack, { GENE_SLOT_HEIGHT } from './tracks/GeneTrack';
import GeneVariantTrack from './tracks/GeneVariantTrack';
import VariantTrack from './tracks/VariantTrack';
import LeadVariantTrack from './tracks/LeadVariantTrack';
import { setLocation, selectors } from './store';
import VariantLeadVariantTrack from './tracks/VariantLeadVariantTrack';

class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.zoomHandler = this.zoomHandler.bind(this);
    }

    zoomHandler (domain) {
        let start = Math.round(domain.x[0]);
        let end = Math.round(domain.x[1]);
        if (start < 0) start = 0;
        // if (end > this.state.chrLength) end = this.state.chrLength;
        this.props.setLocation({ start, end });
    }

    render() {
        const { chromosome, location, parentWidth, genes, slots } = this.props;
        const { start, end } = location;
        return (
            <div>
                <Card title={`Human ${chromosome}:${start}-${end}`}
                    // style={{padding: 0, margin: 0}}
                    // cover={<NavTrack zoomHandler={this.zoomHandler} />}
                >
                    
                </Card>

                <Card bodyStyle={{padding: 0, height: `${GENE_SLOT_HEIGHT * slots.length}px`}}>
                    <GeneTrack genes={genes} slots={slots} start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <GeneVariantTrack start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <VariantTrack start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <VariantLeadVariantTrack start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <LeadVariantTrack start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card title='LeadV2D'/>
                <Card title='D'/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chromosome: state.chromosome,
        location: state.location,
        slots: selectors.getSlots(state),
        genes: selectors.getVisibleGenes(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLocation: location => dispatch(setLocation(location)),
    }
}

Browser = connect(mapStateToProps, mapDispatchToProps)(Browser);

export default Browser;
