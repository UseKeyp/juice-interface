import { PlusCircleOutlined } from '@ant-design/icons'
import { t, Trans } from '@lingui/macro'
import { Button, Form, Radio, Space } from 'antd'
import { FormItemExt } from 'components/formItems/formItemExt'
import TooltipIcon from 'components/TooltipIcon'
import DistributionLimit from 'components/v2v3/shared/DistributionLimit'
import { DistributionSplitCard } from 'components/v2v3/shared/DistributionSplitCard'
import { CurrencyName } from 'constants/currency'
import { useWallet } from 'hooks/Wallet'
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import { Split } from 'models/splits'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { classNames } from 'utils/classNames'
import { fromWad, parseWad } from 'utils/format/formatNumber'
import { v2v3ProjectRoute } from 'utils/routes'
import {
  adjustedSplitPercents,
  getNewDistributionLimit,
  getTotalSplitsPercentage,
} from 'utils/v2v3/distributions'
import { MAX_DISTRIBUTION_LIMIT, splitPercentFrom } from 'utils/v2v3/math'
import { DistributionSplitModal } from '../../../DistributionSplitModal'
import { PayoutConfigurationExplainerCollapse } from './PayoutConfigurationExplainerCollapse'
import SpecificLimitModal from './SpecificLimitModal'

type DistributionType = 'amount' | 'percent'

export function DistributionSplitsSection({
  distributionLimit,
  setDistributionLimit,
  currencyName,
  onCurrencyChange,
  editableSplits,
  lockedSplits,
  onSplitsChanged,
  formItemProps,
}: {
  distributionLimit: string | undefined
  setDistributionLimit: (distributionLimit: string) => void
  currencyName: CurrencyName
  onCurrencyChange: (currencyName: CurrencyName) => void
  editableSplits: Split[]
  lockedSplits: Split[]
  onSplitsChanged: (splits: Split[]) => void
} & FormItemExt) {
  const { userAddress } = useWallet()

  const distributionLimitIsInfinite =
    !distributionLimit || parseWad(distributionLimit).eq(MAX_DISTRIBUTION_LIMIT)

  const [addSplitModalVisible, setAddSplitModalVisible] =
    useState<boolean>(false)

  const [distributionType, setDistributionType] = useState<DistributionType>(
    distributionLimitIsInfinite ? 'percent' : 'amount',
  )

  const [specificLimitModalOpen, setSpecificLimitModalOpen] =
    useState<boolean>(false)

  const allSplits = lockedSplits.concat(editableSplits)

  const renderSplitCard = useCallback(
    (split: Split, index: number, isLocked?: boolean) => {
      if (!split) return
      const isFirstSplit =
        editableSplits.length === 0 ||
        (editableSplits.length === 1 && index === 0)
      return (
        <DistributionSplitCard
          key={`split-${index}`}
          split={split}
          splits={allSplits}
          distributionLimit={distributionLimit}
          setDistributionLimit={setDistributionLimit}
          onSplitsChanged={onSplitsChanged}
          onCurrencyChange={isFirstSplit ? onCurrencyChange : undefined}
          currencyName={currencyName}
          isLocked={isLocked}
          onSplitDelete={split => {
            let adjustedSplits = allSplits
            if (!distributionLimitIsInfinite && allSplits.length !== 1) {
              const newDistributionLimit = getNewDistributionLimit({
                currentDistributionLimit: distributionLimit,
                newSplitAmount: 0,
                editingSplitPercent: split.percent,
              }).toString()
              adjustedSplits = adjustedSplitPercents({
                splits: editableSplits,
                oldDistributionLimit: distributionLimit,
                newDistributionLimit,
              })
              setDistributionLimit(newDistributionLimit)
            }
            if (allSplits.length === 1) setDistributionLimit('0')
            const splitsAfterDelete = filter(
              adjustedSplits,
              // compare splits but ignore percent because it has been adjusted
              s =>
                !isEqual(
                  { ...s, percent: undefined },
                  { ...split, percent: undefined },
                ),
            )
            onSplitsChanged(splitsAfterDelete)
          }}
        />
      )
    },
    [
      editableSplits,
      allSplits,
      distributionLimit,
      setDistributionLimit,
      onSplitsChanged,
      onCurrencyChange,
      currencyName,
      distributionLimitIsInfinite,
    ],
  )

  useEffect(() => {
    setDistributionType(distributionLimitIsInfinite ? 'percent' : 'amount')
  }, [distributionLimitIsInfinite])

  if (!allSplits) return null

  const totalSplitsPercentage = getTotalSplitsPercentage(allSplits)
  const totalSplitsPercentageInvalid = totalSplitsPercentage > 100
  const remainingSplitsPercentage = 100 - getTotalSplitsPercentage(allSplits) // this amount goes to the project owner
  let ownerSplit: Split

  if (remainingSplitsPercentage) {
    ownerSplit = {
      beneficiary: userAddress,
      percent: splitPercentFrom(remainingSplitsPercentage).toNumber(),
    } as Split
  }

  function OwnerSplitCard() {
    return (
      <DistributionSplitCard
        split={ownerSplit}
        splits={allSplits}
        distributionLimit={distributionLimit}
        setDistributionLimit={setDistributionLimit}
        onSplitsChanged={onSplitsChanged}
        onCurrencyChange={onCurrencyChange}
        currencyName={currencyName}
        isLocked
        isProjectOwner
      />
    )
  }

  return (
    <Form.Item
      {...formItemProps}
      className={classNames('mb-0 block', formItemProps?.className)}
    >
      <Space className="min-h-0 w-full" direction="vertical" size="large">
        <Form.Item className="mb-0">
          <p className="text-black dark:text-slate-100">
            <Trans>Choose how you would like to configure your payouts.</Trans>
          </p>
          <PayoutConfigurationExplainerCollapse className="mb-4" />
          <Radio.Group
            onChange={e => {
              const newType = e.target.value
              if (newType === 'percent') {
                setDistributionLimit(fromWad(MAX_DISTRIBUTION_LIMIT))
                setDistributionType(newType)
              } else if (newType === 'amount') {
                if (editableSplits.length) {
                  setSpecificLimitModalOpen(true)
                } else {
                  setDistributionLimit('0')
                  setDistributionType(newType)
                }
                if (
                  remainingSplitsPercentage &&
                  remainingSplitsPercentage !== 100
                ) {
                  editableSplits.push(ownerSplit)
                }
              }
            }}
            value={distributionType}
          >
            <Space direction="vertical">
              <Radio value="amount">
                <Trans>Amounts</Trans>
                <p className="text-sm font-normal">
                  <Trans>
                    Distribute a specific amount of funds to entities each
                    funding cycle. Your distribution limit will equal the{' '}
                    <strong>sum of all payout amounts.</strong>
                  </Trans>
                </p>
              </Radio>
              <Radio value="percent">
                <Trans>Percentages</Trans>
                <p className="text-sm font-normal">
                  <Trans>
                    Distribute a percentage of all funds received to entities.
                    Your distribution limit will be <strong>infinite</strong>.
                  </Trans>
                </p>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Space className="w-full" direction="vertical" size="small">
          {editableSplits.map((split, index) => renderSplitCard(split, index))}
        </Space>
        {lockedSplits ? (
          <Space className="w-full" direction="vertical" size="small">
            {lockedSplits.map((split, index) =>
              renderSplitCard(split, index, true),
            )}
          </Space>
        ) : null}
        {totalSplitsPercentageInvalid ? (
          <span className="font-medium text-error-500 dark:text-error-400">
            <Trans>Sum of percentages cannot exceed 100%.</Trans>
          </span>
        ) : remainingSplitsPercentage > 0 && distributionLimit !== '0' ? (
          <OwnerSplitCard />
        ) : null}
        <Form.Item
          extra={
            <Space size="small">
              <Trans>
                Payouts to Ethereum addresses incur a 2.5% JBX membership fee
              </Trans>
              <TooltipIcon
                tip={
                  <Trans>
                    When distributing, payouts to Ethereum addresses incur a
                    2.5% JBX membership fee. Payouts to other Juicebox projects
                    don't incur fees. Your project will receive (the{' '}
                    <Link href={v2v3ProjectRoute({ projectId: 1 })}>
                      JuiceboxDAO
                    </Link>{' '}
                    token) in return at the current issuance rate.
                  </Trans>
                }
              />
            </Space>
          }
        >
          <Button
            type="dashed"
            onClick={() => {
              setAddSplitModalVisible(true)
            }}
            block
            icon={<PlusCircleOutlined />}
          >
            <span>
              <Trans>Add payout recipient</Trans>
            </span>
          </Button>
        </Form.Item>
        <div className="flex justify-between">
          <span className="text-black dark:text-slate-100">
            <Trans>
              Distribution Limit{' '}
              <TooltipIcon
                tip={t`The maximum amount of funds that can be distributed from the treasury each funding cycle.`}
                placement={'topLeft'}
                iconClassName="mr-1"
              />
              :
            </Trans>
          </span>
          <span>
            <strong>
              <DistributionLimit
                distributionLimit={parseWad(distributionLimit)}
                currencyName={currencyName}
                showTooltip
              />
            </strong>
          </span>
        </div>
      </Space>
      <DistributionSplitModal
        open={addSplitModalVisible}
        onSplitsChanged={onSplitsChanged}
        mode={'Add'}
        splits={allSplits}
        distributionLimit={distributionLimit}
        setDistributionLimit={setDistributionLimit}
        currencyName={currencyName}
        onCurrencyChange={onCurrencyChange}
        onClose={() => setAddSplitModalVisible(false)}
      />
      <SpecificLimitModal
        open={specificLimitModalOpen}
        onClose={() => setSpecificLimitModalOpen(false)}
        setDistributionLimit={setDistributionLimit}
        currencyName={currencyName}
        onCurrencyChange={onCurrencyChange}
      />
    </Form.Item>
  )
}
