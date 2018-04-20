import React from 'react';
import { Table, Button, Col, Row, Icon } from 'antd';
import { CSVLink } from 'react-csv';

import { commaSeparate, renderNonZeroField } from './stringFormatters';
import { colors } from './theme';
import {
    LinksGene,
    LinksVariant,
    LinksLeadVariant,
    LinksDisease,
} from './links';
import DictionaryHelpTerm from './terms/DictionaryHelpTerm';

const renderIntField = value => commaSeparate(value);
const renderVariantField = value => (
    <LinksVariant variantId={value}>{value}</LinksVariant>
);

const renderLeadVariantField = value => (
    <LinksLeadVariant leadVariantId={value}>{value}</LinksLeadVariant>
);
const renderGeneField = (value, row) => (
    <LinksGene geneName={value} geneId={row.geneId}>
        {value}
    </LinksGene>
);
const renderDiseaseField = (value, row) => (
    <LinksDisease efoId={row.efoId}>
        <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            {value}
        </span>
    </LinksDisease>
);
const renderPubmedUrlField = (value, row) => (
    <a href={value} target={'_blank'}>
        <Icon type="link" />
    </a>
);

const comparatorStringField = field => (a, b) => {
    if (a[field] < b[field]) {
        return -1;
    }
    if (a[field] > b[field]) {
        return 1;
    }
    return 0;
};
const compareNumericField = field => (a, b) => {
    return a[field] - b[field];
};

const COLUMNS = [
    {
        title: 'Entities',
        children: [
            {
                title: 'Gene',
                dataIndex: 'geneSymbol',
                key: 'geneSymbol',
                fixed: 'left',
                render: renderGeneField,
                width: 100,
                // sorter: comparatorStringField('geneSym'),
            },
            {
                title: 'Variant',
                dataIndex: 'variantId',
                key: 'variantId',
                fixed: 'left',
                render: renderVariantField,
                width: 100,
                // sorter: comparatorStringField('ldSnpId'),
            },
            {
                title: 'Lead Variant',
                dataIndex: 'leadVariantId',
                key: 'leadVariantId',
                fixed: 'left',
                render: renderLeadVariantField,
                width: 120,
                // sorter: comparatorStringField('gwasSnpId'),
            },
            {
                title: 'Disease',
                dataIndex: 'efoName',
                key: 'efoName',
                fixed: 'left',
                render: renderDiseaseField,
                width: 220,
                // sorter: comparatorStringField('efoName'),
            },
        ],
    },
    {
        title: 'Gene - Variant',
        children: [
            {
                title: (
                    <DictionaryHelpTerm term={'otscore'} label={'G2V Score'} />
                ),
                dataIndex: 'otG2VScore',
                key: 'otG2VScore',
                render: renderNonZeroField,
                width: 120,
                // sorter: compareNumericField('otScore'),
            },
            {
                title: <DictionaryHelpTerm term={'vep'} label={'VEP'} />,
                dataIndex: 'vep',
                key: 'vep',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('vep'),
            },
            {
                title: <DictionaryHelpTerm term={'gtex'} label={'GTEx'} />,
                dataIndex: 'gtex',
                key: 'gtex',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('gtex'),
            },
            {
                title: <DictionaryHelpTerm term={'pchic'} label={'PCHiC'} />,
                dataIndex: 'pchic',
                key: 'pchic',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('pchic'),
            },
            {
                title: <DictionaryHelpTerm term={'dhs'} label={'DHS'} />,
                dataIndex: 'dhs',
                key: 'dhs',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('dhs'),
            },
            {
                title: (
                    <DictionaryHelpTerm term={'fantom5'} label={'Fantom5'} />
                ),
                dataIndex: 'fantom5',
                key: 'fantom5',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('fantom5'),
            },
        ],
    },
    {
        title: 'Variant - Lead Variant',
        children: [
            {
                title: (
                    <DictionaryHelpTerm
                        term={'r2'}
                        label={
                            <span>
                                LD (r<sup>2</sup>)
                            </span>
                        }
                    />
                ),
                dataIndex: 'r2',
                key: 'r2',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('r2'),
            },
        ],
    },
    {
        title: 'Lead Variant - Disease',
        children: [
            {
                title: (
                    <DictionaryHelpTerm term={'gwaspvalue'} label={'p-value'} />
                ),
                dataIndex: 'gwasPValue',
                key: 'gwasPValue',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('gwasPValue'),
            },
            {
                title: (
                    <DictionaryHelpTerm
                        term={'gwasoddsratio'}
                        label={'Odds Ratio'}
                    />
                ),
                dataIndex: 'gwasOddsRatio',
                key: 'gwasOddsRatio',
                render: renderNonZeroField,
                width: 100,
                // sorter: compareNumericField('gwasPValue'),
            },
            {
                title: (
                    <DictionaryHelpTerm
                        term={'gwassamplesize'}
                        label={
                            <React.Fragment>
                                <span>Sample</span>
                                <br />
                                <span>Size</span>
                            </React.Fragment>
                        }
                    />
                ),
                dataIndex: 'gwasSize',
                key: 'gwasSize',
                render: renderIntField,
                width: 100,
                // sorter: compareNumericField('gwasSampleSize'),
            },
            {
                title: 'Literature',
                dataIndex: 'gwasPMId',
                key: 'gwasPMId',
                render: renderPubmedUrlField,
                width: 100,
            },
        ],
    },
];

class EvidenceTable extends React.Component {
    render() {
        const {
            rows,
            loading,
            filterString,
            filename,
            pagination,
            onChange,
        } = this.props;
        const loadingConfig = {
            size: 'large',
            indicator: (
                <Icon
                    type="loading"
                    style={{ fontSize: 20, color: colors.primary, padding: 10 }}
                />
            ),
            spinning: true,
        };
        let loadingProp = {};
        if (loading) loadingProp = { loading: loadingConfig };

        let downloadData = [...rows];
        if (filterString) downloadData = [{ efoId: filterString }, ...rows];

        return (
            <Col>
                <Row align="right" style={{ paddingBottom: '5px' }}>
                    <Col align="right">
                        <CSVLink
                            data={downloadData}
                            filename={`${filename}.csv`}
                            target="_blank"
                        >
                            <Button
                                size="small"
                                type="primary"
                                ghost
                                style={{ marginRight: '5px' }}
                            >
                                CSV
                            </Button>
                        </CSVLink>
                        <CSVLink
                            data={downloadData}
                            filename={`${filename}.tsv`}
                            target="_blank"
                            separator={'\t'}
                        >
                            <Button size="small" type="primary" ghost>
                                TSV
                            </Button>
                        </CSVLink>
                    </Col>
                </Row>
                <Table
                    dataSource={rows}
                    columns={COLUMNS}
                    size="small"
                    bordered
                    scroll={{ x: 1700 }}
                    rowKey={d => d.index}
                    pagination={pagination}
                    onChange={onChange}
                    {...loadingProp}
                />
            </Col>
        );
    }
}

export default EvidenceTable;
