import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiData } from 'src/api/types';
import { formatTimeAgo, truncateHash } from '../../../utils';
import { DetailCard } from '../../base';
import { CopyToClipboard } from '../../utility';

export interface BlockCarouselCardProps {
  block: ApiData.Block;
}

export const BlockCarouselCard: React.FC<BlockCarouselCardProps> = ({
  block,
}) => {
  const { t } = useTranslation();
  const {
    hash: blockHash,
    header: { height: blockHeight, era_id: era, timestamp },
    body: { deploy_hashes: deployHashes },
  } = block;

  const rows = [
    {
      key: `blockHeight-${blockHash}`,
      detailKey: t('block-height'),
      value: blockHeight,
    },
    { key: `era-${blockHash}`, detailKey: t('era'), value: era },
    {
      key: `deploys=${blockHash}`,
      detailKey: t('deploy'),
      value: deployHashes.length,
    },
    {
      key: `age-${blockHash}`,
      detailKey: t('age'),
      value: formatTimeAgo(new Date(timestamp)),
    },
    {
      key: `hash-${blockHash}`,
      detailKey: t('block-hash'),
      value: (
        <>
          <Link
            to={{
              pathname: `/block/${blockHash}`,
            }}>
            {truncateHash(blockHash)}
          </Link>
          <CopyToClipboard textToCopy={blockHash} />
        </>
      ),
    },
  ];

  return <DetailCard rows={rows} />;
};
