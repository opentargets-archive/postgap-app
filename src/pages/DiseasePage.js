import React from 'react';
import { Card, Row, Col } from 'antd';

import DiseaseTable from '../components/DiseaseTable/DiseaseTable';

class DiseasePage extends React.Component {
    render() {
        const { efoId } = this.props.match.params;
        return (
            <div style={{ padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card bodyStyle={{ padding: 10 }}>
                            <DiseaseTable
                                efoId={efoId}
                                filename={`OpenTargetsPOSTGAP-disease.${efoId}`}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DiseasePage;
