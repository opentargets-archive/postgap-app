import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Checkbox, Slider } from 'antd';

import {
  setFilterG2VScore,
  setFilterG2VMustHaves,
  selectors,
} from '../redux/store';

const checkboxOptions = [
  { label: 'VEP', value: 'vep' },
  { label: 'GTEx', value: 'gtex' },
  { label: 'PCHiC', value: 'pchic' },
  { label: 'DHS', value: 'dhs' },
  { label: 'Fantom5', value: 'fantom5' },
];

let GeneVariantFilter = ({
  interval,
  g2VMustHaves,
  setFilterG2VScore,
  setFilterG2VMustHaves,
}) => {
  const changeHandler = value => {
    setFilterG2VMustHaves(value);
  };
  return (
    <Card bodyStyle={{ padding: 10 }} bordered={false}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            Gene - Variant
          </span>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col span={12}>
          <h4>Aggregated Open Targets Score</h4>
          <div style={{ paddingLeft: 20, paddingRight: 30, paddingBottom: 0 }}>
            <Slider
              range
              min={0}
              max={1}
              marks={{
                0: '0',
                0.5: 0.5,
                1: 1,
              }}
              step={0.01}
              defaultValue={interval}
              onChange={value => {
                setFilterG2VScore(value);
              }}
            />
          </div>
        </Col>
        <Col span={12}>
          <h4>Must have</h4>
          <Checkbox.Group
            style={{ width: '100%' }}
            value={g2VMustHaves}
            onChange={changeHandler}
          >
            <Row>
              {checkboxOptions.map(option => (
                <Col key={option.value} span={8}>
                  <Checkbox value={option.value}>{option.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    g2VMustHaves: state.filters.g2VMustHaves,
    interval: selectors.getFilterG2VScore(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterG2VMustHaves: g2VMustHaves =>
      dispatch(setFilterG2VMustHaves(g2VMustHaves)),
    setFilterG2VScore: interval => dispatch(setFilterG2VScore(interval)),
  };
};

GeneVariantFilter = connect(mapStateToProps, mapDispatchToProps)(
  GeneVariantFilter
);

export default GeneVariantFilter;
