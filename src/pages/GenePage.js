import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { ensemblApi } from '../redux/sagas';
import { transformEnsemblGene } from '../redux/utils/transformEnsembl';

class GenePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedEnsemblGene: false
    };
  }
  componentDidMount() {
    const { geneId } = this.props.match.params;
    ensemblApi.fetchGenes([geneId]).then(data => {
      const gene = transformEnsemblGene(data[geneId]);
      const { chromosome, start, end } = gene;
      this.setState({
        hasLoadedEnsemblGene: true,
        chromosome,
        start,
        end
      });
    });
  }
  render() {
    if (this.state.hasLoadedEnsemblGene) {
      const { geneId } = this.props.match.params;
      const { chromosome, start, end } = this.state;
      const params = {
        selected: [geneId],
        chromosome,
        start,
        end
      };
      return (
        <Redirect
          to={{
            pathname: '/locus',
            search: `?${queryString.stringify(params)}`
          }}
        />
      );
    } else {
      return 'Loading...';
    }
  }
}

export default GenePage;
