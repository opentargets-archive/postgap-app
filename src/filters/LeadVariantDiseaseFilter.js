import React from 'react';
import { connect } from 'react-redux';
import { Card, Slider } from 'antd';

import { setFilterGwasPValue, selectors } from '../redux/store';

let LeadVariantDiseaseFilter = ({ interval, setFilterGwasPValue, max }) => {
  return (
    <Card title="V2LeadV Filter">
      <h4>GWAS p-value</h4>
      <Slider
        range
        min={0}
        max={max ? max : 100}
        marks={{
          0: 0,
          8: 'Genome-wide significance',
          [max]: max.toPrecision(3)
        }}
        step={0.1}
        defaultValue={interval}
        onChange={value => {
          setFilterGwasPValue(value);
        }}
      />
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    interval: state.filters.gwasPValue,
    max: selectors.getMaxMinusLogGwasPValue(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterGwasPValue: interval => dispatch(setFilterGwasPValue(interval))
  };
};

LeadVariantDiseaseFilter = connect(mapStateToProps, mapDispatchToProps)(
  LeadVariantDiseaseFilter
);

export default LeadVariantDiseaseFilter;
