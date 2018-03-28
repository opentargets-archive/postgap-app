import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';

import { setDiseasePage } from '../redux/store';
import DiseaseTable from '../DiseaseTable';

class DiseasePage extends React.Component {
  componentDidMount() {
    const { efoId } = this.props.match.params;
    const { setDiseasePage } = this.props;
    setDiseasePage(efoId);
  }
  render() {
    const { efoId } = this.props.match.params;
    return (
      <div style={{ padding: '30px' }}>
        <Row gutter={16}>
          <Col span={24}>
            <Card bodyStyle={{ padding: 10 }}>
              <DiseaseTable filename={`POSTGAP-disease.${efoId}`} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rows: state.diseasePage.rows,
    loading: state.diseasePage.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDiseasePage: efoId => dispatch(setDiseasePage(efoId)),
  };
};

DiseasePage = connect(mapStateToProps, mapDispatchToProps)(DiseasePage);

export default DiseasePage;
