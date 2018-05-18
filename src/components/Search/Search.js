import React from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';

import reportAnalyticsEvent from '../../reportAnalyticsEvent';
import { otApi } from '../../redux/sagas';
import { colors } from '../../theme';

const Option = Select.Option;

const SEARCH_QUERY = gql`
    query SearchQuery($queryString: String) {
        search(queryString: $queryString) {
            id
            name
            type
        }
    }
`;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.lastFetchId = 0;
        this.fetchSearchResults = debounce(this.fetchSearchResults, 800);
    }
    state = {
        data: [],
        value: [],
        fetching: false,
    };
    fetchSearchResults = value => {
        const { client } = this.props;
        // only query if at least three characters have been typed
        if (value.length > 2) {
            reportAnalyticsEvent({
                category: 'Search',
                action: 'Entered query string',
                value,
            });

            // reset options
            this.setState({ data: [], options: [], fetching: true });

            // call for results
            Promise.all([
                otApi.fetchSearch(value),
                client
                    .query({
                        query: SEARCH_QUERY,
                        variables: { queryString: value },
                    })
                    .then(response => {
                        if (response.data && response.data.search) {
                            return response.data.search;
                        } else {
                            return [];
                        }
                    }),
            ]).then(([otData, gqlData]) => {
                const data = [...gqlData, ...otData];

                // set options
                this.setState({ data, options: data, fetching: false });
            });
        }
    };
    handleChange = value => {
        this.setState({
            value: [],
            data: [],
            fetching: false,
        });

        // value is an array of the selected items, but contains only key, label pairs
        const keys = value.map(entry => entry.key);

        // only allow one entry before redirect (for now)
        if (keys.length === 1) {
            const key = keys[0];
            const item = this.state.options.find(item => item.id === key);

            reportAnalyticsEvent({
                category: 'Search',
                action: 'Selected option',
                label: item.type,
                value: item.id,
            });

            switch (item.type) {
                case 'target':
                    this.props.history.push({
                        pathname: `/gene/${item.id}`,
                    });
                    break;
                case 'disease':
                    this.props.history.push({
                        pathname: `/disease/${item.id}`,
                    });
                    break;
                case 'variant':
                    this.props.history.push({
                        pathname: `/variant/${item.id}`,
                    });
                    break;
                default:
                    throw Error('Unexpected item type');
            }
        }
    };
    render() {
        const { fetching, data, value } = this.state;
        return (
            <Select
                mode="multiple"
                labelInValue
                value={value}
                placeholder="Search for a gene, disease or variant..."
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchSearchResults}
                onChange={this.handleChange}
                style={{ width: '100%', maxWidth: 400 }}
            >
                {data.map(d => (
                    <Option key={d.id}>
                        <span
                            style={{
                                fontStyle: 'italic',
                                fontWeight: 100,
                                fontSize: '0.7em',
                                color: colors.primary,
                            }}
                        >
                            {d.type}{' '}
                        </span>
                        <span style={{ color: colors.grey }}>{d.name}</span>
                    </Option>
                ))}
            </Select>
        );
    }
}

Search = withApollo(withRouter(Search));

export default Search;
