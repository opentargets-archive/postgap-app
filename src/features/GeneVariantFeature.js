import React from 'react';
import _ from 'lodash';

import ConnectorPath from './ConnectorPath';

export const DebouncedGeneVariantFeatureSet = ({
    start,
    end,
    startDebounced,
    endDebounced,
    children,
    scale,
    range,
    geneVariants,
    setClicked,
    dimNonHighlighted,
}) => {
    const { x } = scale;
    const width = x.range()[1] - x.range()[0];
    const translateX = -(start - startDebounced);
    const scaleFactorX = width / (end - start);
    return (
        // strokeWidth={1.0 / scaleFactorX}
        <g transform={`scale(${scaleFactorX},1) translate(${translateX},0)`}>
            <GeneVariantFeatureSet
                geneVariants={geneVariants}
                startDebounced={startDebounced}
                setClicked={setClicked}
                dimNonHighlighted={dimNonHighlighted}
            />
        </g>
    );
};

class GeneVariantFeatureSet extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { geneVariants, startDebounced, dimNonHighlighted } = this.props;
        return (
            !_.isEqual(
                geneVariants.map(d => d.id),
                nextProps.geneVariants.map(d => d.id)
            ) ||
            !_.isEqual(
                geneVariants.map(d => d.selected),
                nextProps.geneVariants.map(d => d.selected)
            ) ||
            startDebounced !== nextProps.startDebounced ||
            dimNonHighlighted !== nextProps.dimNonHighlighted
        );
    }
    render() {
        const {
            geneVariants,
            startDebounced,
            setClicked,
            dimNonHighlighted,
        } = this.props;
        return (
            <React.Fragment>
                {geneVariants.map(d => (
                    <GeneVariantFeature
                        key={d.id}
                        data={d}
                        xTop={d.geneTss - startDebounced}
                        xBottom={d.vPos - startDebounced}
                        height={80}
                        setClicked={setClicked}
                        dimNonHighlighted={dimNonHighlighted}
                    />
                ))}
            </React.Fragment>
        );
    }
}

class GeneVariantFeature extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.dimNonHighlighted !== nextProps.dimNonHighlighted ||
            this.props.data.selected !== nextProps.data.selected ||
            this.props.xTop !== nextProps.xTop ||
            this.props.xBottom !== nextProps.xBottom
        );
    }
    render() {
        const {
            data,
            xTop,
            xBottom,
            height,
            setClicked,
            dimNonHighlighted,
        } = this.props;
        return (
            <ConnectorPath
                topX={xTop}
                topY={0}
                bottomX={xBottom}
                bottomY={height}
                onClick={() => setClicked(data.id, 'geneVariant')}
                dimNonHighlighted={dimNonHighlighted}
                highlight={data.selected}
            />
        );
    }
}

export default GeneVariantFeature;
