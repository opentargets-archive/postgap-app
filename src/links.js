import React from 'react';
import { Popover } from 'antd';

export const LinkOpenTargetsGene = ({ geneId, text = 'Open Targets' }) => (
  <a
    href={`http://www.targetvalidation.org/target/${geneId}`}
    target={'_blank'}
  >
    {text}
  </a>
);
export const LinkOpenTargetsDisease = ({ efoId, text = 'Open Targets' }) => (
  <a
    href={`http://www.targetvalidation.org/disease/${efoId}`}
    target={'_blank'}
  >
    {text}
  </a>
);
export const LinkEnsemblGene = ({ geneId, text = 'Ensembl' }) => (
  <a
    href={`http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${geneId}`}
    target={'_blank'}
  >
    {text}
  </a>
);
export const LinkEnsemblVariant = ({ variantId, text = 'Ensembl' }) => (
  <a
    href={`http://www.ensembl.org/Homo_sapiens/Variation/Explore?v=${variantId}`}
    target={'_blank'}
  >
    {text}
  </a>
);
export const LinkGwasCatalogVariant = ({
  variantId,
  text = 'GWAS Catalog',
}) => (
  <a
    href={`https://www.ebi.ac.uk/gwas/search?query=${variantId}`}
    target={'_blank'}
  >
    {text}
  </a>
);
export const LinkGwasCatalogDisease = ({ efoId, text = 'GWAS Catalog' }) => (
  <a
    href={`https://www.ebi.ac.uk/gwas/search?query=${efoId}`}
    target={'_blank'}
  >
    {text}
  </a>
);

export const LinksGene = ({ geneId, children }) => (
  <Popover
    content={
      <React.Fragment>
        <LinkOpenTargetsGene geneId={geneId} />
        <br />
        <LinkEnsemblGene geneId={geneId} />
      </React.Fragment>
    }
  >
    <a>{children}</a>
  </Popover>
);

export const LinksVariant = ({ variantId, children }) => (
  <Popover content={<LinkEnsemblVariant variantId={variantId} />}>
    <a>{children}</a>
  </Popover>
);

export const LinksLeadVariant = ({ leadVariantId, children }) => (
  <Popover
    content={
      <React.Fragment>
        <LinkEnsemblVariant variantId={leadVariantId} />
        <br />
        <LinkGwasCatalogVariant variantId={leadVariantId} />
      </React.Fragment>
    }
  >
    <a>{children}</a>
  </Popover>
);

export const LinksDisease = ({ efoId, children }) => (
  <Popover
    content={
      <React.Fragment>
        <LinkOpenTargetsDisease efoId={efoId} />
        <br />
        <LinkGwasCatalogDisease efoId={efoId} />
      </React.Fragment>
    }
  >
    <a>{children}</a>
  </Popover>
);
