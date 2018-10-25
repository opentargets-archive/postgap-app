import React from 'react';
import { Card, Row, Col, Checkbox, Slider } from 'antd';
import _ from 'lodash';

import DictionaryTerm from '../../DictionaryTerm/DictionaryTerm';
import reportAnalyticsEvent from '../../../utils/reportAnalyticsEvent';

const checkboxOptions = [
    { label: 'VEP', value: 'vep' },
    { label: 'GTEx', value: 'gtex' },
    { label: 'PCHiC', value: 'pchic' },
    { label: 'DHS', value: 'dhs' },
    { label: 'Fantom5', value: 'fantom5' },
];

const reportAnalyticsG2VScore = _.debounce(
    options => reportAnalyticsEvent(options),
    500
);

let GeneVariantFilter = ({
    interval,
    g2VMustHaves,
    setFilterG2VScore,
    setFilterG2VMustHaves,
}) => {
    const changeHandler = value => {
        setFilterG2VMustHaves(value);
        if (value && value.length > 0) {
            reportAnalyticsEvent({
                category: 'Locus',
                action: 'Filtered by G2V must haves',
                label: `[${value}]`,
            });
        }
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
                    <h4>
                        <DictionaryTerm term="otg2vscore" label="G2V Score" />
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
                            max={6}
                            marks={{
                                0: '0',
                                2: 2,
                                4: 4,
                                6: 6,
                            }}
                            step={0.01}
                            defaultValue={interval}
                            onChange={value => {
                                setFilterG2VScore(value);
                                reportAnalyticsG2VScore({
                                    category: 'Locus',
                                    action: 'Filtered by G2V score',
                                    label: `[${value}]`,
                                });
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <h4>
                        <DictionaryTerm
                            term="otg2vmusthave"
                            label="Must have"
                        />
                    </h4>
                    <Checkbox.Group
                        style={{ width: '100%' }}
                        value={g2VMustHaves}
                        onChange={changeHandler}
                    >
                        <Row>
                            {checkboxOptions.map(option => (
                                <Col key={option.value} span={8}>
                                    <Checkbox value={option.value}>
                                        {option.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Col>
            </Row>
        </Card>
    );
};

export default GeneVariantFilter;
