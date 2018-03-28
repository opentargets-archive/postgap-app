import React from 'react';
import Text from 'react-svg-text';
import * as d3 from 'd3';

import { colors } from '../theme';

const PADDING = 0.1; // 10%
const calculateDiseaseScaleRange = width => [
  width * PADDING,
  width * (1 - PADDING),
];

class DiseaseFeature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textWidth: null };
  }
  componentDidMount() {
    const textHeight =
      12 * (this[this.props.data.efoId].state.wordsByLines.length + 1);
    const textWidth = d3.max(
      this[this.props.data.efoId].state.wordsByLines,
      d => d.width
    );
    this.setState({ textWidth, textHeight });
  }
  componentDidUpdate() {
    const textHeight =
      12 * (this[this.props.data.efoId].state.wordsByLines.length + 1);
    const textWidth = d3.max(
      this[this.props.data.efoId].state.wordsByLines,
      d => d.width
    );
    if (textWidth !== this.state.textWidth)
      this.setState({ textWidth, textHeight });
  }
  render() {
    const {
      data,
      diseaseScale,
      slotOffset,
      width,
      setHoverId,
      setClickedId,
      highlight,
      dimNonHighlighted,
    } = this.props;
    const { textWidth, textHeight } = this.state;
    const margin = 3;

    diseaseScale.range(calculateDiseaseScaleRange(width)); // TODO: refactor to set range in better location
    const diseaseColor = highlight
      ? colors.secondary
      : dimNonHighlighted ? 'lightgrey' : colors.primary;
    const backgroundColor = highlight
      ? '#eee'
      : dimNonHighlighted ? 'white' : '#eee';
    const textColor = highlight
      ? 'black'
      : dimNonHighlighted ? 'lightgrey' : 'black';

    const point = (
      <circle
        cx={0}
        cy={10}
        r={4}
        style={{
          stroke: diseaseColor,
          strokeWidth: 2,
          fill: 'white',
          pointerEvents: 'none',
        }}
      />
    );
    const label = (
      <Text
        ref={t => {
          this[this.props.data.efoId] = t;
        }}
        x={0}
        y={20}
        width={130}
        textAnchor="middle"
        verticalAnchor="start"
        style={{ fill: textColor, fontSize: '12px', pointerEvents: 'none' }}
      >
        {data.efoName}
      </Text>
    );
    if (data.efoName === 'gout')
      console.log(
        data.efoName,
        textWidth,
        textHeight,
        diseaseScale(data.efoName),
        slotOffset
      );
    const background = textWidth ? (
      <rect
        style={{ fill: backgroundColor, stroke: diseaseColor }}
        x={-textWidth / 2 - margin}
        y={14 - margin}
        width={textWidth + 2 * margin}
        height={textHeight}
        rx={2}
        ry={2}
        onMouseEnter={() => {
          setHoverId(data.efoId);
        }}
        onMouseLeave={() => {
          setHoverId(null);
        }}
        onClick={() => {
          setClickedId(data.efoId);
        }}
      />
    ) : null;
    return (
      <g transform={`translate(${diseaseScale(data.efoName)},${slotOffset})`}>
        {background}
        {point}
        {label}
      </g>
    );
  }
}

export default DiseaseFeature;
