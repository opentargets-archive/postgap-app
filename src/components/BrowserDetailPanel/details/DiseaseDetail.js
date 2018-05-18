import React from 'react';

import BaseDetail from './BaseDetail';
import { LinksDisease } from '../../../utils/links';

const DiseaseDetail = ({ disease, closeHandler }) => {
    return (
        <BaseDetail
            type={'Disease'}
            title={
                <LinksDisease efoId={disease.id}>{disease.name}</LinksDisease>
            }
            closeHandler={closeHandler}
        >
            {/* What should go here? */}
        </BaseDetail>
    );
};

export default DiseaseDetail;
