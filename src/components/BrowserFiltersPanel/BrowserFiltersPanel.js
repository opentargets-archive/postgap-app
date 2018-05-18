import React from 'react';
import { Card, Row, Col, Button } from 'antd';

import VariantLeadVariantFilter from './filters/VariantLeadVariantFilter';
import LeadVariantDiseaseFilter from './filters/LeadVariantDiseaseFilter';
import GeneVariantFilter from './filters/GeneVariantFilter';

class BrowserFiltersPanel extends React.Component {
    constructor() {
        super();
        this.state = { filtersVisible: true };
        this.toggleFilters = this.toggleFilters.bind(this);
    }

    toggleFilters() {
        this.setState({ filtersVisible: !this.state.filtersVisible });
    }

    render() {
        const {
            filterOtG2VScore,
            filterOtG2VMustHaves,
            filterLD,
            filterGwasPValue,
            setFilterG2VScore,
            setFilterG2VMustHaves,
            setFilterLD,
            setFilterGwasPValue,
            maxGwasPValue,
        } = this.props;
        return this.state.filtersVisible ? (
            <Card
                bodyStyle={{
                    background: 'white',
                    padding: '2px',
                }}
            >
                <Row
                    style={{
                        padding: '10px 10px 0px 10px',
                    }}
                >
                    <Col span={16}>
                        <h4>Filters </h4>
                    </Col>
                    <Col span={8}>
                        <Button
                            style={{ float: 'right' }}
                            icon="close"
                            type="primary"
                            shape="circle"
                            size="small"
                            ghost
                            onClick={this.toggleFilters}
                        />
                    </Col>
                </Row>
                <Row gutter={2}>
                    <Col span={12}>
                        <GeneVariantFilter
                            interval={filterOtG2VScore}
                            setFilterG2VScore={setFilterG2VScore}
                            g2VMustHaves={filterOtG2VMustHaves}
                            setFilterG2VMustHaves={setFilterG2VMustHaves}
                        />
                    </Col>
                    <Col span={6}>
                        <VariantLeadVariantFilter
                            interval={filterLD}
                            setFilterLD={setFilterLD}
                        />
                    </Col>
                    <Col span={6}>
                        <LeadVariantDiseaseFilter
                            interval={filterGwasPValue}
                            setFilterGwasPValue={setFilterGwasPValue}
                            max={maxGwasPValue}
                        />
                    </Col>
                </Row>
            </Card>
        ) : (
            <Button type="primary" ghost onClick={this.toggleFilters}>
                Filters
            </Button>
        );
    }
}

export default BrowserFiltersPanel;
