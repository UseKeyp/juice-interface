import { t } from '@lingui/macro'
import { AppWrapper, Head } from 'components/common'
import WertPage from './WertPage'

export default function AddFundsPage() {
  return (
    <>
      <Head
        title={t`Add funds`}
        url={process.env.NEXT_PUBLIC_BASE_URL + '/wert'}
        description={t`Wert.io checkout`}
      />
      <AppWrapper>
        <WertPage />
      </AppWrapper>
    </>
  )
}
