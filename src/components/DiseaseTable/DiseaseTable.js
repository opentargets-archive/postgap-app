import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import EvidenceTable from '../EvidenceTable/EvidenceTable';
import TableDownloadButton from '../TableDownloadButton/TableDownloadButton';
import Message from '../Message/Message';
import DiseaseTableQuery from './DiseaseTableQuery.gql';

const DISEASE_TABLE_QUERY = gql`
    ${DiseaseTableQuery}
`;

const DiseaseTable = props => (
    <Query
        query={DISEASE_TABLE_QUERY}
        variables={{
            efoId: props.efoId,
            offset: 0,
            limit: 10,
        }}
        fetchPolicy="cache-and-network"
    >
        {({ loading, error, data, fetchMore }) => {
            const { filename } = props;
            if (error) {
                return <Message error>Error fetching data.</Message>;
            }

            let pagination = {
                total: 0,
                current: 1,
                pageSize: 10,
            };
            let rows = [];
            if (data && data.diseaseTable) {
                pagination.total = data.diseaseTable.total;
                pagination.current =
                    data.diseaseTable.offset / pagination.pageSize + 1;

                rows = data.diseaseTable.rows;
            }

            const csvDownload = (
                <TableDownloadButton
                    filename={filename}
                    fileType={'csv'}
                    query={DISEASE_TABLE_QUERY}
                    transformer={response => response.data.diseaseTable.rows}
                    variables={{
                        efoId: props.efoId,
                        offset: 0,
                        limit: 1000000,
                    }}
                />
            );

            const tsvDownload = (
                <TableDownloadButton
                    filename={filename}
                    fileType={'tsv'}
                    query={DISEASE_TABLE_QUERY}
                    transformer={response => response.data.diseaseTable.rows}
                    variables={{
                        efoId: props.efoId,
                        offset: 0,
                        limit: 1000000,
                    }}
                />
            );

            return (
                <EvidenceTable
                    {...props}
                    rows={rows}
                    loading={loading}
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

export default DiseaseTable;
