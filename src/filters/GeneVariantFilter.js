import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Checkbox } from 'antd';

import { setFilterG2VMustHaves } from '../redux/store';

const checkboxOptions = [
  { label: 'VEP', value: 'vep' },
  { label: 'GTEx', value: 'gtex' },
  { label: 'PCHiC', value: 'pchic' },
  { label: 'DHS', value: 'dhs' },
  { label: 'Fantom5', value: 'fantom5' }
];

let GeneVariantFilter = ({ g2VMustHaves, setFilterG2VMustHaves }) => {
  const changeHandler = value => {
    setFilterG2VMustHaves(value);
  };
  return (
    <Card bodyStyle={{ padding: 10 }}>
      <Row>
        <Col span={16}>
          <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
            Gene - Variant
          </span>
        </Col>
      </Row>
      <hr />
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
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    g2VMustHaves: state.filters.g2VMustHaves
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilterG2VMustHaves: g2VMustHaves =>
      dispatch(setFilterG2VMustHaves(g2VMustHaves))
  };
};

GeneVariantFilter = connect(mapStateToProps, mapDispatchToProps)(
  GeneVariantFilter
);

export default GeneVariantFilter;
