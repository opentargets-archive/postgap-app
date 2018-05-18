import React from 'react';
import { Table } from 'antd';

import BaseDetail from './BaseDetail';
import DictionaryTerm from '../../DictionaryTerm/DictionaryTerm';
import { LinksGene, LinksVariant } from '../../../utils/linkFormatters';
import {
    renderNonZeroField,
    renderVEPField,
    renderVEPTermsField,
    renderGtexField,
} from '../../../utils/stringFormatters';

const GeneVariantDetail = ({ geneVariant, closeHandler }) => {
    const d = geneVariant;
    const tableData = [
        {
            key: 'otG2VScore',
            label: 'G2V Score',
            value: renderNonZeroField(d.otG2VScore),
        },
        {
            key: 'otG2VReason',
            label: 'G2V Reason',
            value: d.otG2VReason,
        },
        {
            key: 'vep',
            label: 'VEP',
            value: renderVEPField(d.vep),
        },
        {
            key: 'vepTerms',
            label: 'VEP Consequences',
            value: renderVEPTermsField(d.vepTerms),
        },
        {
            key: 'gtex',
            label: 'GTEx',
            value: renderGtexField(d.gtex),
        },
        {
            key: 'pchic',
            label: 'PCHiC',
            value: renderNonZeroField(d.pchic),
        },
        {
            key: 'dhs',
            label: 'DHS',
            value: renderNonZeroField(d.dhs),
        },
        {
            key: 'fantom5',
            label: 'Fantom5',
            value: renderNonZeroField(d.fantom5),
        },
    ];
    const tableColumns = [
        {
            key: 'label',
            title: 'Label',
            dataIndex: 'label',
            width: 100,
            render: (text, row) => (
                <DictionaryTerm term={row.key} label={row.label} />
            ),
        },
        {
            key: 'value',
            title: 'Value',
            dataIndex: 'value',
            width: 100,
            // render: renderNonZeroField,
        },
    ];
    return (
        <BaseDetail
            type={'Gene - Variant'}
            title={
                <React.Fragment>
                    <LinksGene
                        geneName={geneVariant.geneSymbol}
                        geneId={geneVariant.geneId}
                    >
                        {geneVariant.geneSymbol}
                    </LinksGene>
                    {' - '}
                    <LinksVariant vId={geneVariant.vId}>
                        {geneVariant.vId}
                    </LinksVariant>
                </React.Fragment>
            }
            closeHandler={closeHandler}
        >
            <Table
                dataSource={tableData}
                columns={tableColumns}
                size="small"
                pagination={false}
                showHeader={false}
            />
        </BaseDetail>
    );
};

export default GeneVariantDetail;
