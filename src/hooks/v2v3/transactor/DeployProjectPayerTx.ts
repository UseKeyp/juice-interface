import * as constants from '@ethersproject/constants'
import { t } from '@lingui/macro'
import { ProjectMetadataContext } from 'contexts/projectMetadataContext'
import { TransactionContext } from 'contexts/transactionContext'
import { V2V3ContractsContext } from 'contexts/v2v3/V2V3ContractsContext'
import { TransactorInstance } from 'hooks/Transactor'
import { useWallet } from 'hooks/Wallet'
import { useContext } from 'react'
import { useV2ProjectTitle } from '../ProjectTitle'

export type DeployProjectPayerTxArgs = {
  customBeneficiaryAddress: string | undefined
  customMemo: string | undefined
  tokenMintingEnabled: boolean
  preferClaimed: boolean
}

export function useDeployProjectPayerTx(): TransactorInstance<DeployProjectPayerTxArgs> {
  const { transactor } = useContext(TransactionContext)
  const { contracts } = useContext(V2V3ContractsContext)
  const { userAddress } = useWallet()
  const { projectId } = useContext(ProjectMetadataContext)

  const projectTitle = useV2ProjectTitle()

  const DEFAULT_MEMO = ''
  const DEFAULT_METADATA = [0x1]

  return (
    {
      customBeneficiaryAddress,
      customMemo,
      tokenMintingEnabled,
      preferClaimed,
    },
    txOpts,
  ) => {
    if (!transactor || !projectId || !contracts) {
      txOpts?.onDone?.()
      return Promise.resolve(false)
    }

    return transactor(
      contracts?.JBETHERC20ProjectPayerDeployer,
      'deployProjectPayer',
      [
        projectId,
        customBeneficiaryAddress ?? constants.AddressZero, // defaultBeneficiary is none because we want tokens to go to msg.sender
        preferClaimed, // _defaultPreferClaimedTokens,
        customMemo ?? DEFAULT_MEMO, // _defaultMemo,
        DEFAULT_METADATA, //_defaultMetadata,
        !tokenMintingEnabled, // defaultPreferAddToBalance,
        contracts.JBDirectory.address, // _directory,
        userAddress, //, _owner
      ],
      {
        ...txOpts,
        title: t`Deploy Payment Address for ${projectTitle}`,
      },
    )
  }
}
