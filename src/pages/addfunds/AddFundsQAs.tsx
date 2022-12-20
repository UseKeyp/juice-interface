import { Trans } from '@lingui/macro'

export default function AddFundsQAs(): {
  q: JSX.Element
  a?: JSX.Element
  img?: {
    src: string
    alt: string
    width: number
    height: number
  }
}[] {
  return [
    {
      q: <Trans>What does powered by Keyp mean?</Trans>,
      a: (
        <Trans>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Trans>
      ),
    },
    {
      q: <Trans>What does Juicebox cost?</Trans>,
      a: (
        <Trans>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Trans>
      ),
    },
  ]
}
