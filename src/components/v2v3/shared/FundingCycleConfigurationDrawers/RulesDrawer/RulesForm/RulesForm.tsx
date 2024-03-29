import { isAddress } from '@ethersproject/address'
import { Trans } from '@lingui/macro'
import { Button, Form, Space, Switch } from 'antd'
import FormItemLabel from 'components/FormItemLabel'
import ReconfigurationStrategySelector from 'components/ReconfigurationStrategy/ReconfigurationStrategySelector'
import {
  HOLD_FEES_EXPLAINATION,
  USE_DATASOURCE_FOR_REDEEM_EXPLAINATION,
} from 'components/v2v3/V2V3Project/V2V3FundingCycleSection/settingExplanations'
import {
  ballotStrategiesFn,
  DEFAULT_BALLOT_STRATEGY,
} from 'constants/v2v3/ballotStrategies'
import { useAppDispatch } from 'hooks/AppDispatch'
import { useAppSelector } from 'hooks/AppSelector'
import isEqual from 'lodash/isEqual'
import { BallotStrategy } from 'models/ballot'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { editingV2ProjectActions } from 'redux/slices/editingV2Project'
import { getBallotStrategyByAddress } from 'utils/v2v3/ballotStrategies'
import TokenMintingExtra from './TokenMintingExtra'

export default function RulesForm({
  onFormUpdated,
  onFinish,
}: {
  onFormUpdated?: (updated: boolean) => void
  onFinish: VoidFunction
}) {
  const dispatch = useAppDispatch()
  const { fundingCycleMetadata, fundingCycleData } = useAppSelector(
    state => state.editingV2Project,
  )

  // Form initial values set by default
  const initialValues = useMemo(
    () => ({
      pausePay: fundingCycleMetadata.pausePay,
      allowMinting: fundingCycleMetadata.allowMinting,
      ballotStrategy: getBallotStrategyByAddress(
        fundingCycleData.ballot ?? DEFAULT_BALLOT_STRATEGY.address,
      ),
      allowSetTerminals: fundingCycleMetadata.global.allowSetTerminals,
      holdFees: fundingCycleMetadata.holdFees,
      useDataSourceForRedeem: fundingCycleMetadata.useDataSourceForRedeem,
    }),
    [fundingCycleData, fundingCycleMetadata],
  )

  const [showMintingWarning, setShowMintingWarning] = useState<boolean>(false)
  const [ballotStrategy, setBallotStrategy] = useState<BallotStrategy>(
    initialValues.ballotStrategy,
  )
  const [pausePay, setPausePay] = useState<boolean>(initialValues.pausePay)
  const [allowSetTerminals, setAllowSetTerminals] = useState<boolean>(
    initialValues.allowSetTerminals,
  )
  const [allowMinting, setAllowMinting] = useState<boolean>(
    initialValues.allowMinting,
  )
  const [holdFees, setHoldFees] = useState<boolean>(initialValues.holdFees)
  const [useDataSourceForRedeem, setUseDataSourceForRedeem] = useState<boolean>(
    initialValues.useDataSourceForRedeem,
  )

  useEffect(() => {
    const hasFormUpdated =
      initialValues.allowMinting !== allowMinting ||
      initialValues.pausePay !== pausePay ||
      initialValues.allowSetTerminals !== allowSetTerminals ||
      !isEqual(initialValues.ballotStrategy, ballotStrategy)

    onFormUpdated?.(hasFormUpdated)
  }, [
    onFormUpdated,
    initialValues,
    pausePay,
    allowMinting,
    ballotStrategy,
    allowSetTerminals,
  ])

  const onFormSaved = useCallback(() => {
    dispatch(editingV2ProjectActions.setPausePay(pausePay))
    dispatch(editingV2ProjectActions.setAllowMinting(allowMinting))
    dispatch(editingV2ProjectActions.setAllowSetTerminals(allowSetTerminals))
    dispatch(editingV2ProjectActions.setBallot(ballotStrategy.address))
    dispatch(editingV2ProjectActions.setHoldFees(holdFees))
    dispatch(
      editingV2ProjectActions.setUseDataSourceForRedeem(useDataSourceForRedeem),
    )
    onFinish?.()
  }, [
    dispatch,
    onFinish,
    ballotStrategy,
    pausePay,
    allowMinting,
    allowSetTerminals,
    holdFees,
    useDataSourceForRedeem,
  ])

  const disableSaveButton =
    !ballotStrategy || !isAddress(ballotStrategy.address)

  return (
    <Form layout="vertical" onFinish={onFormSaved}>
      <Space direction="vertical" size="large">
        <div className="rounded-sm bg-smoke-75 stroke-none p-8 shadow-[10px_10px_0px_0px_#E7E3DC] dark:bg-slate-400 dark:shadow-[10px_10px_0px_0px_#2D293A]">
          <Form.Item
            extra={
              <Trans>
                When enabled, your project cannot receive direct payments.
              </Trans>
            }
          >
            <div className="flex font-medium text-black dark:text-slate-100">
              <Switch
                className="mr-2"
                onChange={setPausePay}
                checked={pausePay}
              />
              <Trans>Pause payments</Trans>
            </div>
          </Form.Item>
          <Form.Item
            extra={
              <TokenMintingExtra showMintingWarning={showMintingWarning} />
            }
          >
            <div className="flex text-black dark:text-slate-100">
              <Switch
                className="mr-2"
                onChange={checked => {
                  setShowMintingWarning(checked)
                  setAllowMinting(checked)
                }}
                checked={allowMinting}
              />
              <Trans>Allow token minting</Trans>
            </div>
          </Form.Item>

          <Form.Item
            extra={
              <Trans>
                When enabled, the project owner can set the project's payment
                terminals.
              </Trans>
            }
          >
            <div className="flex font-medium text-black dark:text-slate-100">
              <Switch
                className="mr-2"
                onChange={checked => {
                  setAllowSetTerminals(checked)
                }}
                checked={allowSetTerminals}
              />
              <Trans>Allow terminal configuration</Trans>
            </div>
          </Form.Item>
          <Form.Item name="holdfees" extra={HOLD_FEES_EXPLAINATION}>
            <Switch
              className="mr-2"
              onChange={checked => {
                setHoldFees(checked)
              }}
              checked={holdFees}
            />
            <Trans>Hold fees</Trans>
          </Form.Item>
          <Form.Item
            name="useDataSourceForRedeem"
            extra={USE_DATASOURCE_FOR_REDEEM_EXPLAINATION}
          >
            <Switch
              className="mr-2"
              onChange={checked => {
                setUseDataSourceForRedeem(checked)
              }}
              checked={useDataSourceForRedeem}
            />
            <Trans>Use data source for redeem</Trans>
          </Form.Item>
        </div>

        <Form.Item
          className="rounded-sm bg-smoke-75 stroke-none p-8 shadow-[10px_10px_0px_0px_#E7E3DC] dark:bg-slate-400 dark:shadow-[10px_10px_0px_0px_#2D293A]"
          label={
            <FormItemLabel>
              <Trans>Reconfiguration rules</Trans>
            </FormItemLabel>
          }
        >
          <ReconfigurationStrategySelector
            ballotStrategies={ballotStrategiesFn()}
            selectedStrategy={ballotStrategy}
            onChange={setBallotStrategy}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" disabled={disableSaveButton}>
            <Trans>Save rules</Trans>
          </Button>
        </Form.Item>
      </Space>
    </Form>
  )
}
