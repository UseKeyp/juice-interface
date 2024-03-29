import { classNames } from 'utils/classNames'

export function Tab({
  name,
  isSelected,
  onClick,
}: {
  name: string | JSX.Element
  isSelected: boolean
  href?: string
  onClick?: VoidFunction
}) {
  return (
    <span
      role="button"
      onClick={onClick}
      className={classNames(
        'cursor-pointer pb-1 font-medium uppercase hover:text-black dark:hover:text-grey-100',
        isSelected
          ? 'border-l-0 border-r-0 border-t-0 border-b-2 border-solid text-black dark:text-slate-100'
          : 'text-grey-500 dark:text-slate-200',
      )}
    >
      {name}
    </span>
  )
}
