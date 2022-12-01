import { t, Trans } from '@lingui/macro'
import { AppWrapper, Head } from 'components/common'
import { useWallet } from 'hooks/Wallet'
import { BigHeading } from '../home/BigHeading'
import { Collapse } from 'antd'
import Image from 'next/image'
import AddFundsQAs from './AddFundsQAs'
import RampProvider from './RampProvider'

const onRampList = [
  {
    type: 'WERT',
    iconName: 'wert',
    name: 'Wert.io',
    description: (
      <p className="mt-4">
        <Trans>
          <b>Fee: 5%</b> <br />
          Available in most places (
          <a
            href="https://support.wert.io/en/articles/5194509-supported-countries"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            list
          </a>
          )
          <br />
          Limit: $1,000 w/o KYC
        </Trans>
      </p>
    ),
  },
  {
    type: 'RAMP_NETWORK',
    iconName: 'ramp_network',
    name: 'Ramp Network',
    description: (
      <p className="mt-4">
        <Trans>
          <b>Fee: 2.9% </b>(
          <a
            href="https://support.ramp.network/en/articles/431-transaction-fees"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            details
          </a>
          )
          <br />
          Available in most places (
          <a
            href="https://support.ramp.network/en/articles/433-supported-countries-and-territories"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            list
          </a>
          )
          <br />
          Limit: €100/day
        </Trans>
      </p>
    ),
  },
  {
    type: 'WYRE',
    iconName: 'wyre',
    name: 'Wyre',
    helperText: (
      <p>
        {t`Tip: Do not use auto-complete, a password manager, or copy/paste. Try
          using a different email if your first attempt fails.`}
      </p>
    ),
    description: (
      <p className="mt-4">
        <Trans>
          <b>Fee: 2.9% + $0.30</b> (
          <a
            href="https://support.sendwyre.com/hc/en-us/articles/360059565013-Wyre-card-processing-fees"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            details
          </a>
          )
          <br />
          Available in most places (
          <a
            href="https://docs.sendwyre.com/reference/hosted-checkout#supported-states-and-countries"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            list
          </a>
          )
          <br />
          Limit: $100/day
        </Trans>
      </p>
    ),
  },
  {
    iconName: 'mt_pelerin',
    name: 'Mt Pelerin',
    type: 'MT_PELERIN',
    description: (
      <p className="mt-4">
        <Trans>
          <b>Fee: 1.5% + CHF 1.2</b> (
          <a
            href="https://www.mtpelerin.com/pricing"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            details
          </a>
          )
          <br />
          Available in most places excluding the US (
          <a
            href="https://developers.mtpelerin.com/service-information/supported-countries"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            list
          </a>
          )
          <br />
          Limit: CHF 200/purchase
        </Trans>
      </p>
    ),
  },
]
export default function AddFundsPage() {
  const { userAddress } = useWallet()
  // const { data: balance } = useEthBalanceQuery(userAddress)
  // const amount: BigNumber | undefined = balance
  return (
    <>
      <Head
        title={t`Add funds`}
        url={process.env.NEXT_PUBLIC_BASE_URL + '/addfunds'}
        description={t`Add funds to your wallet`}
      />
      <AppWrapper>
        <div className="flex flex-row gap-x-2">
          <BigHeading text={'Your Wallet'} />
          <span className="flex align-bottom text-xs">Powered by Keyp</span>
          <div>Learn more</div>
        </div>
        <div className="flex flex-row">
          <div>Wallet:</div>
          <div>{userAddress}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div>Account Balance</div>
            <div>TODO</div>
          </div>
          <div className="flex flex-row">
            <div>ETH Balance</div>
            <div>TODO</div>
          </div>
        </div>
        <BigHeading text={'Add Funds'} />
        <div className="grid gap-6 sm:grid-flow-row sm:grid-cols-2">
          {[...onRampList].map(ramp => {
            // if (!ramp) return null
            const onSubmit = () => {
              // submitRamp({ direction: 'ON', type: ramp.type })
              // console.log("Hi")
            }
            if (ramp.type === 'WALLET_DEPOSIT')
              // onSubmit = () => getAddress(currentUser.address)
              // console.log(ramp)
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

        <BigHeading text={'FAQs'} />
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
      </AppWrapper>
    </>
  )
}
