import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import chromosomeLengths from '../constants/chromosomeLengths';

const HALF_INTERVAL = 1000000;

const GENE_LOCATION_QUERY = gql`
    query GeneLocationQuery($geneId: String) {
        geneLocation(geneId: $geneId) {
            chromosome
            start
            end
        }
    }
`;

class GenePage extends React.Component {
    render() {
        const { geneId } = this.props.match.params;
        return (
            <Query
                query={GENE_LOCATION_QUERY}
                variables={{ geneId }}
                fetchPolicy="cache-and-network"
            >
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <div
                                style={{
                                    textAlign: 'center',
                                    paddingTop: 100,
                                    fontSize: 18,
                                }}
                            >
                                Fetching gene location and redirecting...
                            </div>
                        );
                    }
                    if (error) return <p>Error :(</p>;

                    if (data && data.geneLocation) {
                        const { chromosome, start, end } = data.geneLocation;
                        const chromosomeLength = chromosomeLengths[chromosome];
                        const windowStart =
                            start > HALF_INTERVAL ? start - HALF_INTERVAL : 0;
                        const windowEnd =
                            end + HALF_INTERVAL <= chromosomeLength
                                ? end + HALF_INTERVAL
                                : chromosomeLength;
                        const params = {
                            clickedId: geneId,
                            clickedType: 'gene',
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
                            <div
                                style={{
                                    textAlign: 'center',
                                    paddingTop: 100,
                                    fontSize: 18,
                                }}
                            >
                                Could not find gene {geneId}
                            </div>
                        );
                    }
                }}
            </Query>
        );
    }
}

export default GenePage;
