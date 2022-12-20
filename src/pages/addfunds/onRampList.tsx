import { Trans } from '@lingui/macro'

export const onRampList = [
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
]
