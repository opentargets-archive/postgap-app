import React from 'react';
import { Card, Row, Col, Slider } from 'antd';
import _ from 'lodash';

import DictionaryHelpTerm from '../../../terms/DictionaryHelpTerm';
import reportAnalyticsEvent from '../../../reportAnalyticsEvent';

const reportAnalyticsLD = _.debounce(
    options => reportAnalyticsEvent(options),
    500
);

let VariantLeadVariantFilter = ({ interval, setFilterLD }) => {
    return (
        <Card bodyStyle={{ padding: 10 }} bordered={false}>
            <Row>
                <Col span={16}>
                    <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
                        Variant - Lead Variant
                    </span>
                </Col>
            </Row>
            <hr />
            <h4>
                <DictionaryHelpTerm
                    term="r2"
                    label={
                        <React.Fragment>
                            LD (r<sup>2</sup>)
                        </React.Fragment>
                    }
                />
            </h4>
            <div
                style={{ paddingLeft: 20, paddingRight: 30, paddingBottom: 0 }}
            >
                <Slider
                    range
                    min={0.7}
                    max={1}
                    marks={{ 0.7: 0.7, 0.8: 0.8, 0.9: 0.9, 1: 1 }}
                    step={0.01}
                    defaultValue={interval}
                    onChange={value => {
                        setFilterLD(value);
                        reportAnalyticsLD({
                            category: 'Locus',
                            action: 'Filtered by LD',
                            label: `[${value}]`,
                        });
                    }}
                />
            </div>
        </Card>
    );
};

export default VariantLeadVariantFilter;
