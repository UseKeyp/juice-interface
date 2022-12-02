import { t, Trans } from '@lingui/macro'

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
