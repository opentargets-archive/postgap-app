import axios from 'axios';

const OT_API_BASE = 'https://api.opentargets.io/v3/platform/';
const OT_API_SEARCH = ({ query }) => `private/quicksearch?q=${query}&size=3`;

export default {
    fetchSearch(query) {
        const url = `${OT_API_BASE}${OT_API_SEARCH({ query })}`;
        return axios.get(url).then(response => {
            const data = [];
            if (response.data && response.data.data) {
                if (response.data.data.besthit) {
                    data.push({
                        id: response.data.data.besthit.data.id,
                        name: response.data.data.besthit.data.name,
                        type: response.data.data.besthit.data.type,
                    });
                }
                if (response.data.data.target) {
                    response.data.data.target.forEach(d => {
                        data.push({
                            id: d.data.id,
                            name: d.data.name,
                            type: d.data.type,
                        });
                    });
                }
                if (response.data.data.disease) {
                    response.data.data.disease.forEach(d => {
                        data.push({
                            id: d.data.id,
                            name: d.data.name,
                            type: d.data.type,
                        });
                    });
                }
            }
            return data;
        });
    },
};
