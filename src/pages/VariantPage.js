import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { chromosomeLengths } from '../redux/chromosomeLengths';

const HALF_INTERVAL = 1000000;

const VARIANT_LOCATION_QUERY = gql`
    query VariantLocationQuery($variantId: String) {
        variantLocation(variantId: $variantId) {
            chromosome
            position
            isVariant
            isLeadVariant
        }
    }
`;

class VariantPage extends React.Component {
    render() {
        const { variantId } = this.props.match.params;
        return (
            <Query
                query={VARIANT_LOCATION_QUERY}
                variables={{ variantId }}
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
                                Fetching variant location and redirecting...
                            </div>
                        );
                    }
                    if (error) return <p>Error :(</p>;

                    if (data && data.variantLocation) {
                        const {
                            chromosome,
                            position,
                            isLeadVariant,
                        } = data.variantLocation;
                        const chromosomeLength = chromosomeLengths[chromosome];
                        const windowStart =
                            position > HALF_INTERVAL
                                ? position - HALF_INTERVAL
                                : 0;
                        const windowEnd =
                            position + HALF_INTERVAL <= chromosomeLength
                                ? position + HALF_INTERVAL
                                : chromosomeLength;
                        const clickedType = isLeadVariant
                            ? 'leadVariant'
                            : 'variant';
                        const params = {
                            clickedId: variantId,
                            clickedType,
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
                                Could not find variant {variantId}
                            </div>
                        );
                    }
                }}
            </Query>
        );
    }
}

export default VariantPage;
