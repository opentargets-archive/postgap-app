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
      />
    </g>
  );
};

class VariantLeadVariantFeatureSet extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { variantLeadVariants, startDebounced } = this.props;
    return (
      !_.isEqual(
        variantLeadVariants.map(d => d.id),
        nextProps.variantLeadVariants.map(d => d.id)
      ) || startDebounced !== nextProps.startDebounced
    );
  }
  render() {
    const { variantLeadVariants, startDebounced } = this.props;
    return (
      <React.Fragment>
        {variantLeadVariants.map(d => (
          <VariantLeadVariantFeature
            key={d.id}
            data={d}
            xTop={d.variantPosition - startDebounced}
            xBottom={d.leadVariantPosition - startDebounced}
            height={80}
          />
        ))}
      </React.Fragment>
    );
  }
}

class VariantLeadVariantFeature extends React.Component {
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

/* onMouseEnter={() => {
        setHoverId(data.id);
      }}
      onMouseLeave={() => {
        setHoverId(null);
      }}
      onClick={() => {
        setClickedId(data.id);
      }}
      highlight={highlight}
      dimNonHighlighted={dimNonHighlighted} */

export default VariantLeadVariantFeature;
