import { BigHeading } from '../home/BigHeading'
import EtherscanLink from '../../components/EtherscanLink'
import CopyTextButton from '../../components/CopyTextButton'
import RampProvider from './RampProvider'
import { Collapse } from 'antd'
import AddFundsQAs from './AddFundsQAs'
import Image from 'next/image'
import { useWallet } from '../../hooks/Wallet'
import { useEthBalanceQuery } from '../../hooks/EthBalance'
import { onRampList } from './onRampList'
import { useCurrencyConverter } from '../../hooks/CurrencyConverter'
import { formatEther } from 'ethers/lib/utils'
import useMobile from '../../hooks/Mobile'
import ETHAmount from '../../components/currency/ETHAmount'
import React, { useState } from 'react'
import popupLoadingHtml from './popupLoadingHtml'
import { isBrowser } from '../../utils/isBrowser'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require('crypto-js')

export default function AddFunds() {
  const [state, setState] = React.useState({
    isLoading: false,
    error: null,
  })
  const [transactionPending] = useState(false)
  const isMobile = useMobile()
  const { userAddress } = useWallet()
  const WYRE_TOKEN_SYMBOL = 'MUSDC'
  const WYRE_REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}redirect/wyre`
  const WYRE_REDIRECT_URI_ERROR = `${process.env.NEXT_PUBLIC_BASE_URL}redirect/wyre?error=true`

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://api.sendwyre.com/v3'
      : 'https://api.testwyre.com/v3'
  const WYRE_SECRET_KEY = `${process.env.WYRE_SECRET_KEY}`
  const WYRE_API_KEY = `${process.env.WYRE_API_KEY}`
  const signature = (url, data) => {
    let dataToBeSigned = url
    if (data) dataToBeSigned = url + data
    const token = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(
        dataToBeSigned.toString(CryptoJS.enc.Utf8),
        WYRE_SECRET_KEY,
      ),
    )
    return token
  }

  const fetchWyre = (url, data) => {
    const timestamp = Date.now()
    const urlWithTimestamp = url + `?timestamp=${timestamp}000`
    const stringData = JSON.stringify(data)
    return fetch(urlWithTimestamp, {
      method: data ? 'post' : 'get',
      ...(stringData && { body: stringData }), // Use an empty string for the HTTP body in GET requests
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': WYRE_API_KEY,
        'X-Api-Signature': signature(urlWithTimestamp, stringData),
      },
    }).then(async res => {
      if (res.status === 204) return `No content returned by Wyre - ${url}`
      const data = await res.json()
      if (data.errorCode) {
        throw {
          status: res.status,
          url,
          statusText: res.statusText,
          errorCode: data.errorCode,
          type: data.type,
          message: data.message,
        }
      }
      return data
    })
  }
  const createDepositReservation = async destinationAddress => {
    try {
      const url = `${API_URL}/orders/reserve`
      const data = {
        paymentMethod: 'debit-card',
        destCurrency: WYRE_TOKEN_SYMBOL,
        hideTrackBtn: true,
        redirectUrl: WYRE_REDIRECT_URI,
        failureRedirectUrl: WYRE_REDIRECT_URI_ERROR,
        dest: `matic:${destinationAddress}`,
        lockFields: ['destCurrency', 'dest', 'paymentMethod'],
      }
      const response = await fetchWyre(url, data)
      if (!response.url) throw 'Error'
      return { ...response, ...data }
    } catch (e) {
      console.error(e)
      throw new Error(
        'createDepositReservation() Error creating Wyre reservation',
      )
    }
  }

  const encodeBody = body =>
    Object.keys(body)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
      .join('&')

  const DEV_ORIGIN = 'http://localhost:3000'
  const MAINNET_ORIGIN = 'https://juicebox.money'

  const getRampOnUrl = async ({ type }) => {
    try {
      let url
      const address = userAddress
      if (type === 'RAMP_NETWORK') {
        url =
          'https://buy.ramp.network/?' +
          encodeBody({
            userAddress: address,
            hostLogoUrl:
              'https://usekeyp.com/lib_EuhSXxjdIHnRGpWc/1losb3su6g1bq058.svg?w=224',
            hostAppName: 'Keyp',
            swapAsset: 'ETH_ETH',
            finalUrl: `${
              process.env.NODE_ENV === 'development'
                ? DEV_ORIGIN
                : MAINNET_ORIGIN
            }/redirect/ramp_network`,
            // Use for testing
            //'https://ri-widget-staging.firebaseapp.com/',
          })
      } else if (type === 'WYRE') {
        ;({ url } = await createDepositReservation(address))
      } else if (type === 'WERT') {
        url = `${
          process.env.NODE_ENV === 'development' ? DEV_ORIGIN : MAINNET_ORIGIN
        }/wert?address=${address}`
      }
      return { url }
    } catch (e) {
      console.error(e)
      throw new Error('getRampOnUrl() ', e)
    }
  }
  const getRampUrl = async ({ type }) => {
    let myWindow: Window | null
    try {
      myWindow = window.open(
        '',
        '_blank',
        'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes',
      )
      myWindow.document.write(popupLoadingHtml)
      setState({ ...state, isLoading: type })
      const { url } = await getRampOnUrl({ type })
      if (isBrowser && url) {
        myWindow.location = url
        setState({ ...state, isLoading: false, rampError: '' })
      }
    } catch (e) {
      setState({ ...state, isLoading: false, rampError: e })
      myWindow.document.write(
        `<h3>Oops! An error occured<br/><br/>Sending you back...</h3><p>${e}</p>`,
      )
      setTimeout(() => {
        myWindow.close()
      }, 3000)
    }
  }
  const submitRamp = async ({ type }) => {
    return getRampUrl({ type })
  }

  const { data: userBalanceWei } = useEthBalanceQuery(userAddress)
  const converter = useCurrencyConverter()
  const userBalanceUsd = converter.wadToCurrency(userBalanceWei, 'USD', 'ETH')
  const userBalanceUsdFormatted = userBalanceUsd
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
          {transactionPending ? (
            <div className="mt-8 flex flex-col justify-center bg-success-500 p-6 text-left">
              <div className="flex">
                Funding Successful. Transaction Pending. View on Etherscan.
              </div>
              <div>This might take a few minutes</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <BigHeading className="mt-8 mb-8" text={'Add Funds'} />
      <div className="mb-8 grid gap-6 sm:grid-flow-row sm:grid-cols-2">
        {[...onRampList].map(ramp => {
          if (!ramp) return null
          const onSubmit = () => {
            submitRamp({ type: ramp.type })
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
