import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
//  import { scalePoint } from 'd3-scale';

import GeneTrack, { GENE_SLOT_HEIGHT } from './tracks/GeneTrack';
import GeneVariantTrack from './tracks/GeneVariantTrack';
import VariantTrack from './tracks/VariantTrack';
import LeadVariantTrack from './tracks/LeadVariantTrack';
import { setLocation, selectors } from './store';
import VariantLeadVariantTrack from './tracks/VariantLeadVariantTrack';
// import DiseaseTrack from './tracks/DiseaseTrack';

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
        const { chromosome, location, parentWidth, genes, slots, variants, leadVariants, geneVariants, diseases } = this.props;
        const { start, end } = location;
        // console.log(parentWidth)
        // const diseaseScale = scalePoint().domain(diseases.map(d => d.id)).range([0, parentWidth]);
        // console.log(diseaseScale.domain())
        // console.log(diseaseScale.range())
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
                    <GeneVariantTrack geneVariants={geneVariants} start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <VariantTrack variants={variants} start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <VariantLeadVariantTrack start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <LeadVariantTrack leadVariants={leadVariants} start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card>
                {/* <Card title='LeadV2D'/> */}
                {/* <Card title='D'/> */}
                {/* <Card bodyStyle={{padding: 0, height: '30px'}}>
                    <DiseaseTrack diseases={diseases} diseaseScale={diseaseScale} start={start} end={end} zoomHandler={this.zoomHandler} windowResizeDebounceTime={50} />
                </Card> */}
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
        variants: selectors.getVisibleVariants(state),
        geneVariants: selectors.getVisibleGeneVariants(state),
        diseases: selectors.getDiseases(state),
        leadVariants: selectors.getVisibleLeadVariants(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLocation: location => dispatch(setLocation(location)),
    }
}

Browser = connect(mapStateToProps, mapDispatchToProps)(Browser);

export default Browser;
