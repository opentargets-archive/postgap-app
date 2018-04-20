import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import EvidenceTable from './EvidenceTable';

const LOCUS_TABLE_QUERY = gql`
    query LocusTableQuery(
        $chromosome: String
        $start: Int
        $end: Int
        $g2VMustHaves: [String]
        $g2VScore: [Float]
        $r2: [Float]
        $gwasPValue: [Float]
        $selectedId: String
        $selectedType: String
        $limit: Int
        $offset: Int
    ) {
        locusTable(
            chromosome: $chromosome
            start: $start
            end: $end
            g2VMustHaves: $g2VMustHaves
            g2VScore: $g2VScore
            r2: $r2
            gwasPValue: $gwasPValue
            selectedId: $selectedId
            selectedType: $selectedType
            limit: $limit
            offset: $offset
        ) {
            total
            offset
            limit
            rows {
                index
                geneId
                geneSymbol
                geneChromosome
                geneTss
                variantId
                variantChromosome
                variantPosition
                leadVariantId
                efoId
                efoName
                otG2VScore
                vep
                gtex
                pchic
                fantom5
                dhs
                nearest
                r2
                gwasPValue
                gwasOddsRatio
                gwasBeta
                gwasSize
                gwasPMId
                gwasStudy
            }
        }
    }
`;

const BrowserTable = ({
    chromosome,
    start,
    end,
    g2VMustHaves,
    g2VScore,
    r2,
    gwasPValue,
    selectedId,
    selectedType,
    filename,
    filterString,
}) => (
    <Query
        query={LOCUS_TABLE_QUERY}
        variables={{
            chromosome,
            start,
            end,
            g2VMustHaves,
            g2VScore,
            r2,
            gwasPValue,
            selectedId,
            selectedType,
            offset: 0,
            limit: 10,
        }}
        fetchPolicy="network-only"
    >
        {({ loading, error, data, fetchMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            let pagination = {
                total: 0,
                current: 1,
                pageSize: 10,
            };
            if (data && data.locusTable) {
                pagination.total = data.locusTable.total;
                pagination.current =
                    data.locusTable.offset / pagination.pageSize + 1;
            }

            return (
                <EvidenceTable
                    {...{ filename, filterString }}
                    rows={data.locusTable.rows}
                    pagination={pagination}
                    onChange={(pagination, filters, sorter) => {
                        // TODO: support sorting and possibly filtering
                        fetchMore({
                            variables: {
                                offset:
                                    (pagination.current - 1) *
                                    pagination.pageSize,
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return fetchMoreResult;
                            },
                        });
                    }}
                />
            );
        }}
    </Query>
);

export default BrowserTable;
