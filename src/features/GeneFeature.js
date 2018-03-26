import React from 'react';

class GeneFeature extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textWidth: null };
  }
  componentDidMount() {
    const box = this.text.getBBox();
    this.setState({ textWidth: box.width, textBottom: box.y + box.height });
  }
  componentDidUpdate() {
    const box = this.text.getBBox();
    if (box.width !== this.state.textWidth) {
      this.setState({ textWidth: box.width, textBottom: box.y + box.height });
    }
  }
  render() {
    const {
      scale,
      data,
      slotOffset,
      slotHeight,
      setHoverGeneId,
      setClickedGeneId,
      highlight,
      dimNonHighlighted,
    } = this.props;
    const { x } = scale;
    const { textWidth, textBottom } = this.state;
    const margin = 3;

    const exonHeight = slotHeight * 0.3;
    const yExonTop = 0;
    const ySpit = exonHeight / 2;
    const yText = slotHeight * 0.65;
    const geneColor = highlight
      ? 'red'
      : dimNonHighlighted ? 'lightgrey' : 'blue';
    const backgroundColor = highlight
      ? '#eee'
      : dimNonHighlighted ? 'white' : '#eee';
    const textColor = highlight
      ? 'black'
      : dimNonHighlighted ? 'lightgrey' : 'black';
    const spitWidth =
      x(data.canonicalTranscript.end) - x(data.canonicalTranscript.start);
    const backgroundWidth = Math.max(textWidth, spitWidth);
    const backgroundHeight = textBottom - yExonTop;

    const spit = (
      <line
        x1={x(data.canonicalTranscript.start)}
        y1={ySpit}
        x2={x(data.canonicalTranscript.end)}
        y2={ySpit}
        style={{ stroke: geneColor, strokeWidth: 1, pointerEvents: 'none' }}
      />
    );
    const exons = data.canonicalTranscript.exons.map(d => (
      <rect
        key={d.id}
        x={x(d.start)}
        y={yExonTop}
        width={x(d.end) - x(d.start)}
        height={exonHeight}
        style={{
          stroke: geneColor,
          strokeWidth: 1,
          fill: 'white',
          pointerEvents: 'none',
        }}
      />
    ));
    const label = (
      <text
        ref={t => {
          this.text = t;
        }}
        x={x(data.canonicalTranscript.start)}
        y={yText}
        style={{ fill: textColor, fontSize: '12px', pointerEvents: 'none' }}
      >
        {data.strand === 1 ? `${data.name}>` : `<${data.name}`}
      </text>
    );
    const background = textWidth ? (
      <rect
        style={{ fill: backgroundColor, stroke: geneColor }}
        x={x(data.canonicalTranscript.start) - margin}
        y={yExonTop - margin}
        width={backgroundWidth + 2 * margin}
        height={backgroundHeight + 2 * margin}
        rx={2}
        ry={2}
        onMouseEnter={() => {
          setHoverGeneId(data.id);
        }}
        onMouseLeave={() => {
          setHoverGeneId(null);
        }}
        onClick={() => {
          setClickedGeneId(data.id);
        }}
      />
    ) : null;
    return (
      <g transform={`translate(0,${slotOffset})`}>
        {background}
        {spit}
        {exons}
        {label}
      </g>
    );
  }
}

export default GeneFeature;
