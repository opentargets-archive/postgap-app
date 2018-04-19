import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import queryString from 'query-string';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import withDebouncedProps from '../withDebouncedProps';
import Browser from '../Browser';
// import BrowserTable from '../BrowserTable';
import VariantLeadVariantFilter from '../filters/VariantLeadVariantFilter';
import DetailPanel from '../DetailPanel';
import LeadVariantDiseaseFilter from '../filters/LeadVariantDiseaseFilter';
import GeneVariantFilter from '../filters/GeneVariantFilter';

const LOCUS_QUERY = gql`
    query LocusBrowserQuery(
        $chromosome: String
        $start: Int
        $end: Int
        $g2VMustHaves: [String]
        $g2VScore: [Float]
        $r2: [Float]
        $gwasPValue: [Float]
        $selectedId: String
        $selectedType: String
    ) {
        locus(
            chromosome: $chromosome
            start: $start
            end: $end
            g2VMustHaves: $g2VMustHaves
            g2VScore: $g2VScore
            r2: $r2
            gwasPValue: $gwasPValue
            selectedId: $selectedId
            selectedType: $selectedType
        ) {
            genes {
                id
                symbol
                chromosome
                tss
                start
                end
                forwardStrand
                canonicalTranscript {
                    id
                    start
                    end
                    forwardStrand
                    exons {
                        id
                        start
                        end
                    }
                    tss
                    translationStart
                    translationEnd
                }
                selected
            }
            variants {
                id
                chromosome
                position
                selected
            }
            leadVariants {
                id
                chromosome
                position
                selected
            }
            diseases {
                id
                name
                selected
            }
            geneVariants {
                id
                geneId
                geneSymbol
                geneChromosome
                geneTss
                canonicalTranscript {
                    start
                    end
                    forwardStrand
                }
                variantId
                variantChromosome
                variantPosition
                otG2VScore
                vep
                gtex
                pchic
                fantom5
                dhs
                nearest
                selected
            }
            variantLeadVariants {
                id
                variantId
                variantChromosome
                variantPosition
                leadVariantId
                leadVariantChromosome
                leadVariantPosition
                r2
                selected
            }
            leadVariantDiseases {
                id
                leadVariantId
                leadVariantPosition
                leadVariantChromosome
                efoId
                efoName
                gwasBeta
                gwasPMId
                gwasSize
                gwasStudy
                gwasPValue
                gwasOddsRatio
                selected
            }
            maxGwasPValue
        }
    }
`;

class LocusPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filtersVisible: true };
        this.toggleFilters = this.toggleFilters.bind(this);
        this.setLocationInUrl = this.setLocationInUrl.bind(this);
        this.setClickedInUrl = this.setClickedInUrl.bind(this);
        this.setFilterOtG2VScoreInUrl = this.setFilterOtG2VScoreInUrl.bind(
            this
        );
        this.setFilterOtG2VMustHavesInUrl = this.setFilterOtG2VMustHavesInUrl.bind(
            this
        );
        this.setFilterLDInUrl = this.setFilterLDInUrl.bind(this);
        this.setFilterGwasPValueInUrl = this.setFilterGwasPValueInUrl.bind(
            this
        );
    }

    toggleFilters() {
        this.setState({ filtersVisible: !this.state.filtersVisible });
    }

    setLocationInUrl(location) {
        const history = this.props.history;
        const oldQueryParams = queryString.parse(history.location.search);
        const newQueryParams = queryString.stringify({
            ...oldQueryParams,
            ...location,
        });
        history.replace({
            ...history.location,
            search: newQueryParams,
        });
    }

    setClickedInUrl(clickedId, clickedType) {
        const history = this.props.history;
        const oldQueryParams = queryString.parse(history.location.search);
        const newQueryParams = queryString.stringify({
            ...oldQueryParams,
            clickedId,
            clickedType,
        });
        history.replace({
            ...history.location,
            search: newQueryParams,
        });
    }

    setFilterOtG2VScoreInUrl(interval) {
        const history = this.props.history;
        const oldQueryParams = queryString.parse(history.location.search);
        const newQueryParams = queryString.stringify({
            ...oldQueryParams,
            otG2VScoreStart: interval[0],
            otG2VScoreEnd: interval[1],
        });
        history.replace({
            ...history.location,
            search: newQueryParams,
        });
    }

    setFilterOtG2VMustHavesInUrl(mustHaves) {
        const history = this.props.history;
        const oldQueryParams = queryString.parse(history.location.search);
        const newQueryParams = queryString.stringify({
            ...oldQueryParams,
            otG2VMustHaves: mustHaves,
        });
        history.replace({
            ...history.location,
            search: newQueryParams,
        });
    }

    setFilterLDInUrl(interval) {
        const history = this.props.history;
        const oldQueryParams = queryString.parse(history.location.search);
        const newQueryParams = queryString.stringify({
            ...oldQueryParams,
            ldStart: interval[0],
            ldEnd: interval[1],
        });
        history.replace({
            ...history.location,
            search: newQueryParams,
        });
    }

    setFilterGwasPValueInUrl(interval) {
        const history = this.props.history;
        const oldQueryParams = queryString.parse(history.location.search);
        const newQueryParams = queryString.stringify({
            ...oldQueryParams,
            gwasPValueStart: interval[0],
            gwasPValueEnd: interval[1],
        });
        history.replace({
            ...history.location,
            search: newQueryParams,
        });
    }

    render() {
        const query = queryString.parse(this.props.location.search);
        const { chromosome } = query;
        const start = parseInt(query.start, 10);
        const end = parseInt(query.end, 10);

        const queryDebounced = queryString.parse(
            this.props.locationDebounced.search
        );
        const { chromosome: chromosomeDebounced } = queryDebounced;
        const startDebounced = parseInt(queryDebounced.start, 10);
        const endDebounced = parseInt(queryDebounced.end, 10);

        const { clickedId, clickedType } = query;

        const filename = `POSTGAP-locus.${chromosome}.${start}-${end}`;
        const filterOtG2VScore = [
            query.otG2VScoreStart ? parseFloat(query.otG2VScoreStart) : 0,
            query.otG2VScoreEnd ? parseFloat(query.otG2VScoreEnd) : 1,
        ];
        const filterOtG2VScoreDebounced = [
            queryDebounced.otG2VScoreStart
                ? parseFloat(queryDebounced.otG2VScoreStart)
                : 0,
            queryDebounced.otG2VScoreEnd
                ? parseFloat(queryDebounced.otG2VScoreEnd)
                : 1,
        ];
        const filterOtG2VMustHaves = query.otG2VMustHaves
            ? typeof query.otG2VMustHaves === 'string'
              ? [query.otG2VMustHaves]
              : query.otG2VMustHaves
            : [];
        const filterLD = [
            query.ldStart ? parseFloat(query.ldStart) : 0.7,
            query.ldEnd ? parseFloat(query.ldEnd) : 1,
        ];
        const filterLDDebounced = [
            queryDebounced.ldStart ? parseFloat(queryDebounced.ldStart) : 0.7,
            queryDebounced.ldEnd ? parseFloat(queryDebounced.ldEnd) : 1,
        ];

        const filterGwasPValue = [
            query.gwasPValueStart ? parseFloat(query.gwasPValueStart) : 0,
            query.gwasPValueEnd
                ? parseFloat(query.gwasPValueEnd)
                : Number.MAX_SAFE_INTEGER,
        ];
        const filterGwasPValueDebounced = [
            queryDebounced.gwasPValueStart
                ? parseFloat(queryDebounced.gwasPValueStart)
                : 0,
            queryDebounced.gwasPValueEnd
                ? parseFloat(queryDebounced.gwasPValueEnd)
                : Number.MAX_SAFE_INTEGER,
        ];

        const isInSelectedState = clickedId;
        return (
            <Query
                query={LOCUS_QUERY}
                variables={{
                    start: startDebounced,
                    end: endDebounced,
                    chromosome: chromosomeDebounced,
                    g2VMustHaves: filterOtG2VMustHaves,
                    g2VScore: filterOtG2VScoreDebounced,
                    r2: filterLDDebounced,
                    gwasPValue: filterGwasPValueDebounced,
                    selectedId: clickedId,
                    selectedType: clickedType,
                }}
                fetchPolicy="network-only"
            >
                {({ loading, error, data }) => {
                    let clickedEntity = null;
                    const field = `${clickedType}s`;
                    if (data && data.locus && data.locus[field]) {
                        const clickedWithinData = data.locus[field].filter(
                            d => d.id === clickedId
                        );
                        if (clickedWithinData.length > 0) {
                            clickedEntity = clickedWithinData[0];
                        }
                    }

                    let maxGwasPValue = Number.MAX_SAFE_INTEGER;
                    if (data && data.locus && data.locus.maxGwasPValue) {
                        // grab from response
                        maxGwasPValue = data.locus.maxGwasPValue;
                        // ensure rounded up to 1dp (since slider has 0.1 precision)
                        maxGwasPValue = Math.ceil(maxGwasPValue * 10) / 10.0;
                    }

                    return (
                        <div style={{ padding: '30px' }}>
                            <Col gutter={6}>
                                {this.state.filtersVisible ? (
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
                                                    setFilterG2VScore={
                                                        this
                                                            .setFilterOtG2VScoreInUrl
                                                    }
                                                    g2VMustHaves={
                                                        filterOtG2VMustHaves
                                                    }
                                                    setFilterG2VMustHaves={
                                                        this
                                                            .setFilterOtG2VMustHavesInUrl
                                                    }
                                                />
                                            </Col>
                                            <Col span={6}>
                                                <VariantLeadVariantFilter
                                                    interval={filterLD}
                                                    setFilterLD={
                                                        this.setFilterLDInUrl
                                                    }
                                                />
                                            </Col>
                                            <Col span={6}>
                                                <LeadVariantDiseaseFilter
                                                    interval={filterGwasPValue}
                                                    setFilterGwasPValue={
                                                        this
                                                            .setFilterGwasPValueInUrl
                                                    }
                                                    max={maxGwasPValue}
                                                />
                                            </Col>
                                        </Row>
                                    </Card>
                                ) : (
                                    <Button
                                        type="primary"
                                        ghost
                                        onClick={this.toggleFilters}
                                    >
                                        Filters
                                    </Button>
                                )}

                                <Row gutter={16} style={{ height: '16px' }} />

                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Browser
                                            filename={filename}
                                            filterString={'todo'}
                                            filterOtG2VScore={filterOtG2VScore}
                                            filterLD={filterLD}
                                            chromosome={chromosome}
                                            start={start}
                                            end={end}
                                            chromosomeDebounced={
                                                chromosomeDebounced
                                            }
                                            startDebounced={startDebounced}
                                            endDebounced={endDebounced}
                                            setLocation={this.setLocationInUrl}
                                            setClicked={this.setClickedInUrl}
                                            data={data}
                                            isInSelectedState={
                                                isInSelectedState
                                            }
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <DetailPanel
                                            {...{
                                                clickedId,
                                                clickedType,
                                                clickedEntity,
                                                setClicked: this
                                                    .setClickedInUrl,
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={16} style={{ height: '16px' }} />

                                {/* <Row gutter={16}>
            <Col span={24}>
              <Card bodyStyle={{ padding: 10 }}>
                <BrowserTable
                  filename={filename}
                  filterString={this.props.filterString}
                />
              </Card>
            </Col>
          </Row> */}
                            </Col>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

const API_DEBOUNCE = 500;

LocusPage = withDebouncedProps({
    debounce: API_DEBOUNCE,
    propNames: ['location'],
})(LocusPage);

export default LocusPage;
