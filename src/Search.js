import React from 'react';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';

import { otApi } from './redux/sagas';
const Option = Select.Option;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchSearchResults = debounce(this.fetchSearchResults, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false
  };
  fetchSearchResults = value => {
    this.lastFetchId += 1;
    this.setState({ data: [], fetching: true });
    otApi.fetchSearch(value).then(data => {
      this.setState({ data, fetching: false });
    });
  };
  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false
    });
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
        style={{ width: '100%' }}
      >
        {data.map(d => (
          <Option key={d.id}>
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 100,
                fontSize: '0.7em'
              }}
            >
              {d.type}{' '}
            </span>
            <span style={{ color: d.type === 'target' ? 'blue' : 'green' }}>
              {d.name}
            </span>
          </Option>
        ))}
      </Select>
    );
  }
}

export default Search;
