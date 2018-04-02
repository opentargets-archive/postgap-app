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
      />
    </g>
  );
};

class GeneVariantFeatureSet extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { geneVariants, startDebounced } = this.props;
    return (
      !_.isEqual(
        geneVariants.map(d => d.id),
        nextProps.geneVariants.map(d => d.id)
      ) || startDebounced !== nextProps.startDebounced
    );
  }
  render() {
    const { geneVariants, startDebounced } = this.props;
    return (
      <React.Fragment>
        {geneVariants.map(d => (
          <GeneVariantFeature
            key={d.id}
            data={d}
            xTop={d.geneTss - startDebounced}
            xBottom={d.variantPosition - startDebounced}
            height={80}
          />
        ))}
      </React.Fragment>
    );
  }
}

class GeneVariantFeature extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.xTop !== nextProps.xTop ||
      this.props.xBottom !== nextProps.xBottom
    );
  }
  render() {
    const {
      // scale,
      data,
      xTop,
      xBottom,
      height,
      // setHoverId,
      // setClickedId,
      // highlight,
      // dimNonHighlighted,
    } = this.props;
    // const { x, y } = scale;
    return (
      <ConnectorPath topX={xTop} topY={0} bottomX={xBottom} bottomY={height} />
    );
  }
}

export default GeneVariantFeature;
