import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { ensemblApi } from '../redux/sagas';
import { chromosomeLengths } from '../redux/chromosomeLengths';
import { transformEnsemblGene } from '../redux/utils/transformEnsembl';

const HALF_INTERVAL = 1000000;

class GenePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedEnsemblGene: false,
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
        end,
      });
    });
  }
  render() {
    if (this.state.hasLoadedEnsemblGene) {
      const { geneId } = this.props.match.params;
      const { chromosome, start, end } = this.state;
      const chromosomeLength = chromosomeLengths[chromosome];
      const windowStart = start > HALF_INTERVAL ? start - HALF_INTERVAL : 0;
      const windowEnd =
        end + HALF_INTERVAL <= chromosomeLength
          ? end + HALF_INTERVAL
          : chromosomeLength;
      const params = {
        geneId,
        chromosome,
        start: windowStart,
        end: windowEnd,
      };
      return (
        <Redirect
          to={{
            pathname: '/locus',
            search: `?${queryString.stringify(params)}`,
          }}
        />
      );
    } else {
      return <div style={{ padding: '30px' }}>'Loading...'</div>;
    }
  }
}

export default GenePage;
