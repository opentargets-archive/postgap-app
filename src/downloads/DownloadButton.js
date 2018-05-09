import React from 'react';
import { Button } from 'antd';
import { withApollo } from 'react-apollo';
import FileSaver from 'file-saver';

class DownloadButton extends React.Component {
    constructor() {
        super();
        this.runQuery = this.runQuery.bind(this);
        this.state = {
            data: null,
        };
    }
    runQuery() {
        const {
            fileType,
            filename,
            query,
            variables,
            transformer,
            client,
        } = this.props;
        client
            .query({
                query,
                variables,
            })
            .then(transformer)
            .then(rows => {
                if (!rows || rows.length === 0) {
                    console.info('Nothing to download.');
                    return;
                }
                let separator = '';
                if (fileType === 'csv') {
                    separator = ',';
                } else if (fileType === 'tsv') {
                    separator = '\t';
                } else {
                    throw Error(
                        'Unexpected fileType: valid values are ["csv", "tsv"].'
                    );
                }
                const headers = Object.keys(rows[0]);
                const headersStr = headers.map(d => `"${d}"`).join(separator);
                const rowsArr = rows.map(row =>
                    headers.map(header => (header in row ? row[header] : ''))
                );
                const rowsStr = rowsArr.map(row =>
                    row
                        .map(d => (typeof d === 'string' ? `"${d}"` : d))
                        .join(separator)
                );
                const content = [headersStr].concat(rowsStr).join('\n');
                const blob = new Blob([content], {
                    type: 'text/csv;charset=utf-8',
                });
                FileSaver.saveAs(blob, `${filename}.${fileType}`);
            });
    }
    render() {
        const { fileType } = this.props;
        return (
            <React.Fragment>
                <Button
                    size="small"
                    type="primary"
                    ghost
                    style={{ marginRight: '5px' }}
                    onClick={this.runQuery}
                >
                    {fileType.toUpperCase()}
                </Button>
            </React.Fragment>
        );
    }
}

DownloadButton = withApollo(DownloadButton);

export default DownloadButton;
