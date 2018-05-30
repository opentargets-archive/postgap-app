import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import EvidenceTable from '../EvidenceTable/EvidenceTable';
import TableDownloadButton from '../TableDownloadButton/TableDownloadButton';
import BrowserTableQuery from './BrowserTableQuery.gql';

const BROWSER_TABLE_QUERY = gql`
    ${BrowserTableQuery}
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
        query={BROWSER_TABLE_QUERY}
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
            if (error) return <p>Error :(</p>;

            let pagination = {
                total: 0,
                current: 1,
                pageSize: 10,
            };
            let rows = [];
            if (data && data.locusTable) {
                pagination.total = data.locusTable.total;
                pagination.current =
                    data.locusTable.offset / pagination.pageSize + 1;

                rows = data.locusTable.rows;
            }

            const downloadVariables = {
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
                limit: 1000000,
            };
            const csvDownload = (
                <TableDownloadButton
                    filename={filename}
                    fileType={'csv'}
                    query={BROWSER_TABLE_QUERY}
                    transformer={response => response.data.locusTable.rows}
                    variables={downloadVariables}
                    filterString={filterString}
                />
            );
            const tsvDownload = (
                <TableDownloadButton
                    filename={filename}
                    fileType={'tsv'}
                    query={BROWSER_TABLE_QUERY}
                    transformer={response => response.data.locusTable.rows}
                    variables={downloadVariables}
                    filterString={filterString}
                />
            );

            return (
                <EvidenceTable
                    {...{ filename, filterString, loading }}
                    rows={rows}
                    pagination={pagination}
                    csvDownload={csvDownload}
                    tsvDownload={tsvDownload}
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
