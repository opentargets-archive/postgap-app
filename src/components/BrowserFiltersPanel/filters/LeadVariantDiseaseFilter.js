import React from 'react';
import { Card, Row, Col, Slider } from 'antd';
import _ from 'lodash';

import DictionaryHelpTerm from '../../../terms/DictionaryHelpTerm';
import reportAnalyticsEvent from '../../../utils/reportAnalyticsEvent';

const reportAnalyticsGwasPValue = _.debounce(
    options => reportAnalyticsEvent(options),
    500
);

class LeadVariantDiseaseFilter extends React.Component {
    componentDidUpdate(prevProps) {
        const { interval, setFilterGwasPValue, max } = this.props;

        // we should check the filter interval is
        // still contained within [0, max]
        if (interval[1] > max) {
            console.info(
                `gwasPValue filter ${interval} outside maximum bound ${max}, so updating`
            );
            setFilterGwasPValue([interval[0] > max ? 0 : interval[0], max]);
        }

        // if the maximum possible value changed,
        // and interval[1] matched the previous max,
        // we should update it to track max
        const maxChanged = prevProps.max !== max;
        const intervalUpperDidEqualMax =
            prevProps.interval[1] === prevProps.max;
        const intervalUpperIsNowLess = interval[1] < max;
        if (maxChanged && intervalUpperDidEqualMax && intervalUpperIsNowLess) {
            console.info(
                `gwasPValue filter previously tracked maximum bound, so updating\n`,
                `previous interval: ${prevProps.interval}, max: ${
                    prevProps.max
                }\n`,
                `current interval: ${interval}, max: ${max}`
            );
            setFilterGwasPValue([interval[0] > max ? 0 : interval[0], max]);
        }
    }
    render() {
        const { interval, setFilterGwasPValue, max } = this.props;
        return (
            <Card bodyStyle={{ padding: 10 }} bordered={false}>
                <Row>
                    <Col span={16}>
                        <span style={{ fontWeight: 100, fontStyle: 'italic' }}>
                            Lead Variant - Disease
                        </span>
                    </Col>
                </Row>
                <hr />
                <h4>
                    <DictionaryHelpTerm
                        term="gwaspvalue"
                        label={
                            <React.Fragment>
                                -log<sub>10</sub>(GWAS p-value)
                            </React.Fragment>
                        }
                    />
                </h4>
                <div
                    style={{
                        paddingLeft: 20,
                        paddingRight: 30,
                        paddingBottom: 0,
                    }}
                >
                    <Slider
                        range
                        min={0}
                        max={max ? max : Number.MAX_SAFE_INTEGER}
                        marks={{
                            0: '0',
                            [max]: max.toPrecision(3),
                        }}
                        step={0.1}
                        value={interval}
                        onChange={value => {
                            setFilterGwasPValue(value);
                            reportAnalyticsGwasPValue({
                                category: 'Locus',
                                action: 'Filtered by GWAS p-value',
                                label: `[${value}]`,
                            });
                        }}
                    />
                </div>
            </Card>
        );
    }
}

export default LeadVariantDiseaseFilter;
