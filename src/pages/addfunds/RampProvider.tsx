// import Icon from 'src/components/Icon'
// import LoadingDots from 'src/components/LoadingDots'
// import Button from 'src/components/Button'

import Image from 'next/image'

const RampProvider = ({
  error,
  isLoading,
  onSubmit,
  buttonText = 'Continue',
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
  const backgroundColor = 'bg-[#18B4C7]'
  const buttonClassName = `flex mt-4 justify-center items-center w-32 h-[40px] text-xl ${backgroundColor}`
  let errorText
  if (error != null && error != '' && error.length > 0) {
    errorText = error.substring(0, 200)
  } else {
    errorText = ''
  }
  const button = (
    <div id="connection-button" className={buttonClassName} onClick={onSubmit}>
      {isLoading ? <div /> : buttonText}
    </div>
  )

  const iconContent = iconName ? (
    <Image
      src={'/mstile-150x150.png'}
      alt={iconName}
      width={45}
      height={45}
      loading="lazy"
    />
  ) : (
    <h2>{name}</h2>
  )

  return (
    <div
      className={`align-center bg-chessBlack-200 h-full rounded-lg border-[1px] p-4 ${
        highlight ? 'border-green' : 'border-chessBlack-200'
      }`}
    >
      <div className="align-center flex items-center">{iconContent}</div>
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
