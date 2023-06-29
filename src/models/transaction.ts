import { BigNumberish, Signer, Transaction, providers } from 'ethers'

export enum TxStatus {
  pending = 'PENDING',
  success = 'SUCCESS',
  failed = 'FAILED',
}

type TransactionCallback = (e?: Transaction, signer?: Signer) => void

export interface TransactionCallbacks {
  onDone?: VoidFunction
  onConfirmed?: TransactionCallback
  onCancelled?: TransactionCallback
  onError?: ErrorCallback
}

export interface TransactionOptions extends TransactionCallbacks {
  title?: string
  value?: BigNumberish
}

export type TransactionLog = {
  id: number
  title: string
  createdAt: number
  callbacks?: TransactionCallbacks
  status: TxStatus.success | TxStatus.failed | TxStatus.pending
  tx: Partial<Pick<providers.TransactionResponse, 'hash' | 'timestamp'>> | null
}
