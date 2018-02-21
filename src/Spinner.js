import React from 'react';
import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';

import { selectors } from './redux/store';

let Spinner = ({ loading }) => {
  const loadingIcon = (
    <Icon type="loading" style={{ fontSize: 30, color: 'white' }} spin />
  );
  if (loading) {
    return (
      <Spin indicator={loadingIcon} size="large" style={{ float: 'right' }} />
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    loading: selectors.getIsLoading(state)
  };
};

Spinner = connect(mapStateToProps)(Spinner);

export default Spinner;
