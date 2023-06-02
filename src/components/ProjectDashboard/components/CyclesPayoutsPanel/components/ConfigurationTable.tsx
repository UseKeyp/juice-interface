import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { ReactNode, useMemo } from 'react'
import { ConfigurationPanelTableData } from './ConfigurationPanel'

export const ConfigurationTable = ({
  title,
  data,
}: {
  title: ReactNode
  data: ConfigurationPanelTableData
}) => {
  const rows = useMemo(
    () =>
      Object.entries(data).map(([id, d]) => {
        if (d.new === undefined) {
          return {
            id,
            name: d.name,
            loading: true,
          }
        }
        if (d.old === undefined || d.old === d.new) {
          return {
            id,
            name: d.name,
            value: d.new,
          }
        }

        return {
          id: id,
          name: d.name,
          value: <Diff old={d.old} new={d.new} />,
        }
      }),
    [data],
  )

  return (
    <>
      <div>
        <div className="w-full">
          <div className="text-start text-base font-semibold">{title}</div>
          <div>
            {rows.map(row => (
              <ConfigurationTableRow
                key={row.id}
                name={row.name}
                value={row.value}
                loading={row.loading}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start text-base font-semibold">{title}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <ConfigurationTableRow
                key={row.id}
                name={row.name}
                value={row.value}
                loading={row.loading}
              />
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  )
}

const ConfigurationTableRow = ({
  name,
  value,
  loading = false,
}: {
  name: ReactNode
  value: ReactNode
  loading: boolean | undefined
}) => (
  <div className="flex justify-between gap-10 border-b border-grey-200 py-3">
    <div className="flex justify-between gap-3">{name}</div>
    {!loading ? (
      <div className="truncate text-end">{value}</div>
    ) : (
      <div className="text-end">
        <div className="h-4 w-20 animate-pulse rounded bg-grey-200" />
      </div>
    )}
  </div>
)

const Diff: React.FC<{ old?: ReactNode; new: ReactNode }> = props => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex w-full items-center justify-between gap-3.5 rounded bg-error-100 p-1 font-medium text-error-700">
      <MinusCircleIcon className="inline-block h-5 w-5" />
      <span>{props.old}</span>
    </div>
    <div className="flex w-full items-center justify-between gap-3.5 rounded bg-melon-100 p-1 font-medium text-melon-700">
      <PlusCircleIcon className="inline-block h-5 w-5" />
      <span>{props.new}</span>
    </div>
  </div>
)
