import { Trans } from '@lingui/macro'
import { Col, Image, Row } from 'antd'
import ExternalLink from 'components/ExternalLink'
import Paragraph from 'components/Paragraph'
import { NFT_IMAGE_SIDE_LENGTH } from 'components/v2v3/shared/FundingCycleConfigurationDrawers/NftDrawer/NftUpload'
import { useAppSelector } from 'hooks/AppSelector'
import { DEFAULT_NFT_MAX_SUPPLY } from 'hooks/NftRewards'
import { classNames } from 'utils/classNames'

export default function NftSummarySection() {
  const {
    nftRewards: { rewardTiers },
  } = useAppSelector(state => state.editingV2Project)

  return (
    <div>
      <h4 className="mb-0 text-black dark:text-slate-100">
        <Trans>NFTs</Trans>
      </h4>
      {rewardTiers?.map((rewardTier, index) => (
        <Row
          className={classNames(
            'flex w-full py-4',
            index !== rewardTiers.length - 1
              ? 'border-x-0 border-t-0 border-b border-solid border-smoke-200 dark:border-grey-600'
              : '',
          )}
          key={index}
          gutter={16}
        >
          <Col md={4} className="flex items-center justify-center">
            <Image
              className="object-cover"
              src={rewardTier.imageUrl ?? '/assets/banana-od.webp'}
              alt={rewardTier.name}
              height={NFT_IMAGE_SIDE_LENGTH}
              width={NFT_IMAGE_SIDE_LENGTH}
            />
          </Col>
          <Col className="flex flex-col justify-center" md={8}>
            <span className="text-lg font-medium text-black dark:text-slate-100">
              {rewardTier.name}
            </span>
            <p className="mb-0">
              <Trans>
                <span className="font-medium">Contribution floor:</span>{' '}
                {rewardTier.contributionFloor} ETH
              </Trans>
            </p>
            {rewardTier.maxSupply &&
            rewardTier.maxSupply !== DEFAULT_NFT_MAX_SUPPLY ? (
              <span>
                <Trans>
                  <span className="font-medium">Max. supply:</span>{' '}
                  <span>{rewardTier.maxSupply}</span>
                </Trans>
              </span>
            ) : null}
            {rewardTier.externalLink && (
              <span>
                <Trans>
                  <span className="font-medium">Website:</span>{' '}
                  <ExternalLink href={rewardTier.externalLink}>
                    {rewardTier.externalLink}
                  </ExternalLink>
                </Trans>
              </span>
            )}
          </Col>
          <Col md={12} className="flex flex-col justify-center">
            {rewardTier.description && (
              <div className="mt-12">
                <Trans>
                  <span className="font-medium">Description: </span>
                  <Paragraph
                    description={rewardTier.description}
                    characterLimit={124}
                  />
                </Trans>
              </div>
            )}
          </Col>
        </Row>
      ))}
    </div>
  )
}
