import React from 'react';
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
      {geneVariants.map(d => (
        <GeneVariantFeature
          key={d.id}
          data={d}
          xTop={d.geneTss - startDebounced}
          xBottom={d.variantPosition - startDebounced}
          height={80}
        />
      ))}
    </g>
  );
};

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
