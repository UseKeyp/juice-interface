import { BigHeading } from '../home/BigHeading'
import EtherscanLink from '../../components/EtherscanLink'
import CopyTextButton from '../../components/CopyTextButton'
import RampProvider from './RampProvider'
import { Collapse } from 'antd'
import AddFundsQAs from './AddFundsQAs'
import Image from 'next/image'
import { useWallet } from '../../hooks/Wallet'
import { useEthBalanceQuery } from '../../hooks/EthBalance'
import { BigNumberish } from '@ethersproject/bignumber'
import { onRampList } from './onRampList'
import { useCurrencyConverter } from '../../hooks/CurrencyConverter'
import { formatEther } from 'ethers/lib/utils'
import useMobile from '../../hooks/Mobile'
import ETHAmount from '../../components/currency/ETHAmount'

export default function AddFunds() {
  const isMobile = useMobile()
  const { userAddress } = useWallet()
  //TODO: troubleshoot submitRamp

  // const {submitRamp} = useRamp()
  const { data: userBalanceWei } = useEthBalanceQuery(userAddress)
  const converter = useCurrencyConverter()
  const userBalanceUsd = converter.wadToCurrency(userBalanceWei, 'USD', 'ETH')
  const userBalanceUsdFormatted: BigNumberish | number = userBalanceUsd
    ? formatEther(userBalanceUsd)
    : 0

  return (
    <div className="mx-auto flex max-w-[1080px] flex-col p-5">
      <div className="flex flex-row gap-x-2">
        <BigHeading text={'Your Wallet'} />
        <div className="flex items-end text-xs">
          <div className="flex">Powered by Keyp</div>
        </div>
        <div className="flex items-end text-xs text-[#18B4C7]">
          <a
            href="https://usekeyp.com/"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            <div className="flex">Learn more</div>
          </a>
        </div>
      </div>
      <div className="my-2 flex flex-col">
        <div className="flex flex-row">
          <div>Wallet:&nbsp;</div>
          <EtherscanLink
            value={userAddress}
            truncated={isMobile}
            truncateTo={isMobile ? 8 : undefined}
            type="address"
          />{' '}
          <CopyTextButton value={userAddress} className="z-10 ml-2" />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="my-4 mt-8 flex flex-row gap-x-20">
              <div>Account Balance:&nbsp;</div>
              <div
                className={`${
                  userBalanceUsdFormatted ? 'text-success-500' : ''
                }`}
              >
                {`${userBalanceUsdFormatted}`} USD
              </div>
            </div>
            <div className="flex flex-row gap-x-28">
              <div>ETH Balance:&nbsp;</div>
              <div className={`${userBalanceWei ? 'text-success-500' : ''}`}>
                <ETHAmount
                  amount={userBalanceWei}
                  fallback="--"
                  hideTooltip={true}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center bg-success-500 p-6 text-left">
            <div className="flex">
              Funding Successful. Transaction Pending. View on Etherscan.
            </div>
            <div>This might take a few minutes</div>
          </div>
        </div>
      </div>
      <BigHeading className="mt-8 mb-8" text={'Add Funds'} />
      <div className="mb-8 grid gap-6 sm:grid-flow-row sm:grid-cols-2">
        {[...onRampList].map(ramp => {
          if (!ramp) return null
          const onSubmit = () => {
            // TODO: troubleshoot submitRamp
            // submitRamp({ direction: 'ON', type: ramp.type })
          }
          return (
            <RampProvider
              key={ramp.name}
              onSubmit={onSubmit}
              isLoading={false}
              {...ramp}
            />
          )
        })}
      </div>

      <BigHeading className="mt-8 mb-8" text={'FAQs'} />
      <Collapse
        className="bg-transparent"
        defaultActiveKey={AddFundsQAs.length ? 0 : undefined}
        accordion
      >
        {AddFundsQAs().map((qa, i) => (
          <Collapse.Panel header={qa.q} key={i}>
            {qa.a && <div>{qa.a}</div>}
            {qa.img && (
              <Image
                src={qa.img.src}
                alt={qa.img.alt}
                width={qa.img.width}
                height={qa.img.height}
                loading="lazy"
              />
            )}
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  )
}
