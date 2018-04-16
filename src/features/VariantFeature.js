import React from 'react';
import _ from 'lodash';

import { colors } from '../theme';

export const DebouncedVariantFeatureSet = ({
  start,
  end,
  startDebounced,
  endDebounced,
  children,
  scale,
  range,
  variants,
  setClicked,
}) => {
  const { x } = scale;
  const width = x.range()[1] - x.range()[0];
  const translateX = -(start - startDebounced);
  const scaleFactorX = width / (end - start);
  return (
    <g
      transform={`scale(${scaleFactorX},1) translate(${translateX},0)`}
      strokeWidth={2.0 / scaleFactorX}
    >
      <VariantFeatureSet
        variants={variants}
        startDebounced={startDebounced}
        setClicked={setClicked}
      />
    </g>
  );
};

class VariantFeatureSet extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { variants, startDebounced } = this.props;
    return (
      !_.isEqual(variants.map(d => d.id), nextProps.variants.map(d => d.id)) ||
      startDebounced !== nextProps.startDebounced
    );
  }
  render() {
    const { variants, startDebounced, setClicked } = this.props;
    return (
      <React.Fragment>
        {variants.map(d => (
          <VariantFeature
            key={d.id}
            data={d}
            x={d.position - startDebounced}
            height={20}
            setClicked={setClicked}
          />
        ))}
      </React.Fragment>
    );
  }
}

class VariantFeature extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { x, height } = this.props;
    return x !== nextProps.x || height !== nextProps.height;
  }
  render() {
    const { x, height, data, setClicked } = this.props;
    const variantColor = colors.primary;
    // highlight
    //   ? colors.secondary
    //   : dimNonHighlighted ? 'lightgrey' : colors.primary;

    return (
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        style={{ stroke: variantColor }}
        onClick={() => setClicked(data.id)}
      />
    );
  }
}

{
  /* onMouseEnter={() => {
        setHoverId(data.id);
      }}
      onMouseLeave={() => {
        setHoverId(null);
      }}
      onClick={() => {
        setClickedId(data.id);
      }} */
}

export default VariantFeature;
