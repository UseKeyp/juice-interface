import { t } from '@lingui/macro'
import { AppWrapper, Head } from 'components/common'
import AddFunds from './AddFunds'

export default function AddFundsPage() {
  return (
    <>
      <Head
        title={t`Add funds`}
        url={process.env.NEXT_PUBLIC_BASE_URL + '/addfunds'}
        description={t`Add funds to your wallet`}
      />
      <AppWrapper>
        <AddFunds />
      </AppWrapper>
    </>
  )
}
