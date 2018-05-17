import React from 'react';
import _ from 'lodash';

import GeneDetail from './details/GeneDetail';
import VariantDetail from './details/VariantDetail';
import LeadVariantDetail from './details/LeadVariantDetail';
import DiseaseDetail from './details/DiseaseDetail';
import GeneVariantDetail from './details/GeneVariantDetail';
import VariantLeadVariantDetail from './details/VariantLeadVariantDetail';
import LeadVariantDiseaseDetail from './details/LeadVariantDiseaseDetail';

class Detail extends React.Component {
    components = {
        GeneDetail,
        VariantDetail,
        LeadVariantDetail,
        DiseaseDetail,
        GeneVariantDetail,
        VariantLeadVariantDetail,
        LeadVariantDiseaseDetail,
    };
    render() {
        const {
            clickedId,
            clickedType,
            clickedEntity,
            setClicked,
            chromosome,
        } = this.props;
        const clickedTypeUpperCasedFirstLetter =
            clickedType[0].toUpperCase() + clickedType.substr(1);
        const tagName = `${clickedTypeUpperCasedFirstLetter}Detail`;
        const Tag = this.components[tagName];
        const closeHandler = () => {
            setClicked(null, null, null);
        };
        return (
            <Tag
                {...{ [clickedType]: clickedEntity, closeHandler, chromosome }}
            />
        );
    }
}

let DetailPanel = ({
    clickedId,
    clickedType,
    clickedEntity,
    setClicked,
    chromosome,
}) => {
    let detail = null;
    if (clickedType && clickedEntity) {
        // dynamically generate component
        detail = (
            <Detail
                {...{
                    clickedId,
                    clickedType,
                    clickedEntity,
                    setClicked,
                    chromosome,
                }}
            />
        );
    }

    const placeholder = !clickedId ? (
        <div
            style={{
                border: '2px dashed #aaa',
                color: '#aaa',
                textAlign: 'center',
                height: '100%',
            }}
        >
            No selection
        </div>
    ) : null;

    return (
        <React.Fragment>
            {detail}
            {placeholder}
        </React.Fragment>
    );
};

export default DetailPanel;
