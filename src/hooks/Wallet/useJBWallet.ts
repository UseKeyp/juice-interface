import { signOut, useSession } from 'next-auth/react'
import { useWallet } from './useWallet'

export function useJBWallet() {
  const eoa = useWallet()

  const { status, data: session } = useSession()

  const user = session?.user as
    | {
        accessToken: string
        address: string
        id: string
        username: string
      }
    | undefined

  const isAuthenticated = status === 'authenticated'

  return {
    isConnected: isAuthenticated || eoa.isConnected,
    userAddress: user?.address || eoa.userAddress,
    eoa,
    keyp: {
      isAuthenticated,
      signOut,
      ...user,
    },
    connectionType: eoa.isConnected
      ? 'eoa'
      : isAuthenticated
      ? 'keyp'
      : undefined,
    disconnect: isAuthenticated ? signOut : eoa.disconnect,
  }
}
