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
          <div className="flex">Learn more</div>
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
        <div className="my-4 mt-8 flex flex-row">
          <div>Account Balance:&nbsp;</div>
          <div>{`${userBalanceUsdFormatted}`} USD</div>
        </div>
        <div className="flex flex-row">
          <div>ETH Balance:&nbsp;</div>
          <ETHAmount amount={userBalanceWei} fallback="--" hideTooltip={true} />
        </div>
      </div>
      <BigHeading className="mt-8 mb-8" text={'Add Funds'} />
      <div className="mb-8 grid gap-6 sm:grid-flow-row sm:grid-cols-2">
        {[...onRampList].map(ramp => {
          if (!ramp) return null
          const onSubmit = () => {
            // submitRamp({ direction: 'ON', type: ramp.type })
          }
          return (
            <RampProvider
              key={ramp.name}
              onSubmit={onSubmit}
              // isLoading={ramp.isLoading}
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
