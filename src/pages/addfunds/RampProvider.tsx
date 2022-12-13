import Icon from './Icon'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/themeContext'
import Loading from '../../components/Loading'

const RampProvider = ({
  error,
  isLoading,
  onSubmit,
  buttonText = 'Continue',
  disabled,
  status,
  highlight,
  highlightStatus,
  description,
  helperText,
  hideButton,
  iconName,
  name,
  successText,
}) => {
  const { isDarkMode } = useContext(ThemeContext)
  const backgroundColor =
    isLoading || disabled ? 'bg-grey-700 pointer-events-none' : 'bg-[#18B4C7]'
  const buttonClassName = `flex mt-4 justify-center items-center w-32 h-[40px] text-xl ${backgroundColor}`
  let errorText
  if (error != null && error != '' && error.length > 0) {
    errorText = error.substring(0, 200)
  } else {
    errorText = ''
  }
  const button = (
    <button
      id="connection-button"
      className={buttonClassName}
      onClick={onSubmit}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Loading /> : buttonText}
    </button>
  )

  const iconContent = iconName ? (
    <Icon
      name={iconName}
      size="45%"
      color={isDarkMode ? 'white' : 'black'}
      className="mb-2"
    />
  ) : (
    <h2>{name}</h2>
  )
  return (
    <div
      className={`bg-chessBlack-200 h-full border-[1px] border-solid border-black p-4 dark:border-solid dark:border-grey-600 ${
        highlight ? 'border-green' : 'border-chessBlack-200'
      }`}
    >
      <div className="align-center flex flex items-center">{iconContent}</div>
      {description && <div className="mt-2">{description}</div>}
      {status && (
        <h2
          className={`bg-chessBlack-100 mt-4 rounded-lg p-2 ${
            highlightStatus ? 'border-green' : ''
          }`}
        >
          {status}
        </h2>
      )}
      {!hideButton && button}
      {errorText && (
        <p className="text-errorYellow mt-4 font-bold">{errorText}</p>
      )}
      {successText && (
        <p className="text-green mt-4 font-bold">{successText}</p>
      )}
      {helperText && <div className="mt-2">{helperText}</div>}
    </div>
  )
}
export default RampProvider
