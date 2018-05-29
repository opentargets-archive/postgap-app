import React from 'react';
import _ from 'lodash';

import ConnectorPath from './ConnectorPath';

export const DebouncedVariantLeadVariantFeatureSet = ({
    start,
    end,
    startDebounced,
    endDebounced,
    children,
    scale,
    range,
    variantLeadVariants,
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
            <VariantLeadVariantFeatureSet
                variantLeadVariants={variantLeadVariants}
                startDebounced={startDebounced}
                setClicked={setClicked}
                dimNonHighlighted={dimNonHighlighted}
            />
        </g>
    );
};

class VariantLeadVariantFeatureSet extends React.Component {
    shouldComponentUpdate(nextProps) {
        const {
            variantLeadVariants,
            startDebounced,
            dimNonHighlighted,
        } = this.props;
        return (
            !_.isEqual(
                variantLeadVariants.map(d => d.id),
                nextProps.variantLeadVariants.map(d => d.id)
            ) ||
            !_.isEqual(
                variantLeadVariants.map(d => d.selected),
                nextProps.variantLeadVariants.map(d => d.selected)
            ) ||
            startDebounced !== nextProps.startDebounced ||
            dimNonHighlighted !== nextProps.dimNonHighlighted
        );
    }
    render() {
        const {
            variantLeadVariants,
            startDebounced,
            setClicked,
            dimNonHighlighted,
        } = this.props;
        return (
            <React.Fragment>
                {variantLeadVariants.map(d => (
                    <VariantLeadVariantFeature
                        key={d.id}
                        data={d}
                        xTop={d.vPos - startDebounced}
                        xBottom={d.lvPos - startDebounced}
                        height={60}
                        setClicked={setClicked}
                        dimNonHighlighted={dimNonHighlighted}
                    />
                ))}
            </React.Fragment>
        );
    }
}

class VariantLeadVariantFeature extends React.Component {
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
                onClick={() => setClicked(data.id, 'variantLeadVariant')}
                dimNonHighlighted={dimNonHighlighted}
                highlight={data.selected}
            />
        );
    }
}

export default VariantLeadVariantFeature;
