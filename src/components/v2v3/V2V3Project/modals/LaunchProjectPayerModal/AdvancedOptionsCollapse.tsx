import * as constants from '@ethersproject/constants'
import { t, Trans } from '@lingui/macro'
import { Form, FormInstance, Input, Space, Switch } from 'antd'
import { EthAddressInput } from 'components/inputs/EthAddressInput'
import { FormImageUploader } from 'components/inputs/FormImageUploader'
import { MinimalCollapse } from 'components/MinimalCollapse'
import TooltipLabel from 'components/TooltipLabel'
import { V2V3ProjectContext } from 'contexts/v2v3/V2V3ProjectContext'
import { useContext, useState } from 'react'

import type { AdvancedOptionsFields } from './LaunchProjectPayerModal'

const defaultAdvancedOptions: AdvancedOptionsFields = {
  memo: '',
  memoImageUrl: undefined,
  tokenMintingEnabled: true,
  preferClaimed: false,
  customBeneficiaryAddress: undefined,
}

export default function AdvancedOptionsCollapse({
  form,
}: {
  form: FormInstance<AdvancedOptionsFields>
}) {
  const { tokenAddress } = useContext(V2V3ProjectContext)

  // need state for this field to update dom
  const [tokenMintingEnabled, setTokenMintingEnabled] = useState<boolean>(
    form.getFieldValue('tokenMintingEnabled') === false ? false : true,
  )

  const [customBeneficiaryEnabled, setCustomBeneficiaryEnabled] =
    useState<boolean>(Boolean(form.getFieldValue('customBeneficiaryAddress')))

  return (
    <MinimalCollapse header={<Trans>Advanced (optional)</Trans>}>
      <Space size="middle" direction="vertical" className="w-full">
        <Form form={form} initialValues={defaultAdvancedOptions}>
          <div>
            <TooltipLabel
              label={t`Payment memo`}
              tip={
                <Trans>
                  The onchain memo for each payment made to this address. The
                  project's payment feed will include the memo alongside the
                  payment.
                </Trans>
              }
            />
            <Form.Item name={'memo'}>
              <Input type="string" autoComplete="off" className="mt-1" />
            </Form.Item>
            <Form.Item name={'memoImageUrl'}>
              <FormImageUploader text={t`Add image`} />
            </Form.Item>
          </div>
          <div className="flex">
            <TooltipLabel
              label={t`Token minting enabled`}
              tip={t`Determines whether tokens will be minted from payments to this address.`}
            />
            <Form.Item
              name={'tokenMintingEnabled'}
              initialValue={tokenMintingEnabled}
            >
              <Switch
                className="ml-4"
                onChange={setTokenMintingEnabled}
                checked={tokenMintingEnabled}
              />
            </Form.Item>
          </div>
          {tokenMintingEnabled &&
          tokenAddress &&
          tokenAddress !== constants.AddressZero ? (
            <div className="flex">
              <TooltipLabel
                label={t`Mint tokens as ERC-20`}
                tip={
                  <Trans>
                    When checked, payments to this address will mint this
                    project's ERC-20 tokens to the beneficiary's wallet.
                    Payments will cost more gas. When unchecked, Juicebox will
                    track the beneficiary's new tokens when they pay. The
                    beneficiary can claim their ERC-20 tokens at any time.
                  </Trans>
                }
              />
              <Form.Item name={'preferClaimed'} valuePropName="checked">
                <Switch className="ml-4" />
              </Form.Item>
            </div>
          ) : null}

          {tokenMintingEnabled ? (
            <div className="mb-2 flex">
              <TooltipLabel
                label={t`Custom token beneficiary`}
                tip={
                  <Trans>
                    By default, newly minted tokens will go to the wallet who
                    sends funds to the address. You can enable this to set the
                    token beneficiary to a custom address.
                  </Trans>
                }
              />
              <Switch
                className="ml-4"
                onChange={checked => {
                  setCustomBeneficiaryEnabled(checked)
                  if (!checked) {
                    form.setFieldsValue({ customBeneficiaryAddress: undefined })
                  }
                }}
                checked={customBeneficiaryEnabled}
              />
            </div>
          ) : null}
          {tokenMintingEnabled && customBeneficiaryEnabled ? (
            <EthAddressInput
              value={form.getFieldValue('customBeneficiaryAddress')}
              onChange={value =>
                form.setFieldsValue({ customBeneficiaryAddress: value })
              }
            />
          ) : null}
        </Form>
      </Space>
    </MinimalCollapse>
  )
}
