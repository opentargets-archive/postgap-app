import React from 'react';
import { withRouter } from 'react-router-dom';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';

import { otApi, ensemblApi } from './redux/sagas';
import { colors } from './theme';

const Option = Select.Option;

class SearchHome extends React.Component {
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
    // only query if at least three characters have been typed
    if (value.length > 2) {
      this.lastFetchId += 1;
      this.setState({ data: [], options: [], fetching: true });
      Promise.all([
        otApi.fetchSearch(value),
        ensemblApi.fetchSearch(value),
      ]).then(([otData, ensemblData]) => {
        const data = [...ensemblData, ...otData];
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
              }}
            >
              {d.type}{' '}
            </span>
            <span style={{ color: colors.secondary }}>{d.name}</span>
          </Option>
        ))}
      </Select>
    );
  }
}

SearchHome = withRouter(SearchHome);

export default SearchHome;
