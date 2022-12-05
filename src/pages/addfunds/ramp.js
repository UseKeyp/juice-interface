import React from 'react'
import { useQuery } from '@apollo/client'

const COINBASE = 'COINBASE'
const WYRE = 'WYRE'

const RampContext = React.createContext({
  isLoading: true,
})
const useRamp = () => React.useContext(RampContext)

const RampProvider = ({ children }) => {
  // TODO: Get currentUser from context and ensure isAuthenticated
  // TODO: Define OAuthURL, openOAuthUrl, submitCodeGrant, error: errorOAuth

  const [state, setState] = React.useState({
    isLoading: false,
    error: null,
  })
  const [coinbase, setCoinbase] = React.useState({})
  const [pelerin] = React.useState({})
  const [wyre, setWyre] = React.useState({})

  const { error: rampError, loading: rampsLoading } = useQuery(
    //TODO: Define query
    {
      pollInterval: 30000,
      // skip: !isAuthenticated,
      fetchPolicy: 'network-only',
      onError: () => {
        setState({
          error: 'Something went wrong loading cash out providers',
          isLoading: false,
        })
      },
      onCompleted: async ({ ramps } = {}) => {
        const coinbaseRamp = ramps.find(ramp => ramp.type === COINBASE)
        const wyreRamp = ramps.find(ramp => ramp.type === WYRE)
        setCoinbase({ ...coinbaseRamp, ...coinbase })
        setWyre({ ...wyreRamp, ...wyre })
      },
    },
  )

  const submitRamp = async ({ direction, amount, reconnect }) => {
    //TODO: add back in type and enable line

    // if (direction === 'ON') return getRampUrl({ type, direction })
    if (direction === 'OFF') {
      //TODO: Implement withdraw and connect for ramps
      if (amount && !reconnect) {
        // if (type === 'COINBASE') return withdrawCoinbase(amount)
        // if (type === 'WYRE') return withdrawWyre(amount)
      }
      // if (type === 'WYRE') return connectWyre()
      // if (type === 'COINBASE') return connectCoinbase()
    }
  }
  // const getRampUrl = async ({ type, direction }) => {
  // let myWindow
  // try {
  //     myWindow = window.open(
  //         '',
  //         '_blank',
  //         'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
  //     )
  //TODO: Define popupLoadingHtml

  // myWindow.document.write(popupLoadingHtml)
  // setState({ ...state, isLoading: type, rampError: '' })

  // TODO: Define mutation
  //     const { data, error } = await rampUrlMutation({
  //         variables: { direction, type },
  //     })
  //     if (error) throw error
  //     const {
  //         getRampUrl: { url },
  //     } = data
  //     if (isBrowser && url) {
  //         myWindow.location = url
  //         setState({ ...state, isLoading: false, rampError: '' })
  //     }
  // } catch (e) {
  //     setState({ ...state, isLoading: false, rampError: e })
  //     myWindow.document.write(
  //         `<h3>Oops! An error occurred<br/><br/>Sending you back...</h3><p>${e}</p>`
  //     )
  //     setTimeout(() => {
  //         myWindow.close()
  //     }, 3000)
  // }
  // }

  return (
    <RampContext.Provider
      value={{
        isLoading: state.isLoading || rampsLoading,
        rampError: rampError || state.rampError,
        submitRamp,
        offRamps: [wyre, coinbase, pelerin],
      }}
    >
      {children}
    </RampContext.Provider>
  )
}

export { RampProvider, useRamp }
