import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { ensemblApi } from '../redux/sagas';
import { chromosomeLengths } from '../redux/chromosomeLengths';
import { transformEnsemblVariant } from '../redux/utils/transformEnsembl';

const HALF_INTERVAL = 1000000;

class VariantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoadedEnsemblVariant: false,
    };
  }
  componentDidMount() {
    const { variantId } = this.props.match.params;
    ensemblApi.fetchVariants([variantId]).then(data => {
      const gene = transformEnsemblVariant(data[variantId]);
      const { chrom, pos } = gene;
      this.setState({
        hasLoadedEnsemblVariant: true,
        chromosome: chrom,
        position: pos,
      });
    });
  }
  render() {
    if (this.state.hasLoadedEnsemblVariant) {
      const { variantId } = this.props.match.params;
      const { chromosome, position } = this.state;
      const chromosomeLength = chromosomeLengths[chromosome];
      const windowStart =
        position > HALF_INTERVAL ? position - HALF_INTERVAL : 0;
      const windowEnd =
        position + HALF_INTERVAL <= chromosomeLength
          ? position + HALF_INTERVAL
          : chromosomeLength;
      const params = {
        clickedId: variantId,
        clickedType: 'variant',
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
      return (
        <div style={{ textAlign: 'center', paddingTop: 100, fontSize: 18 }}>
          Fetching variant location and redirecting...
        </div>
      );
    }
  }
}

export default VariantPage;
