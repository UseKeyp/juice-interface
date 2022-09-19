import { Space } from 'antd'
import { useContext } from 'react'
import { PageContext } from '../contexts/PageContext'
import { BackButton, DoneButton, NextButton, SkipButton } from './components'

export const PageButtonControl = ({
  isNextEnabled = true, // Default enabled if not supplied
  onPageDone,
}: {
  isNextEnabled?: boolean
  onPageDone?: () => void
}) => {
  const {
    isSkippable,
    canGoBack,
    isFinalPage,
    doneText,
    goToPreviousPage,
    goToNextPage,
  } = useContext(PageContext)

  return (
    <div
      style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Space>
        {canGoBack && <BackButton onClick={goToPreviousPage} />}
        {isFinalPage && <DoneButton text={doneText} onClick={onPageDone} />}
      </Space>
      <Space style={{ marginLeft: 'auto' }}>
        {!isFinalPage && isSkippable && <SkipButton onClick={goToNextPage} />}
        {!isFinalPage && (
          <NextButton disabled={!isNextEnabled} onClick={onPageDone} />
        )}
      </Space>
    </div>
  )
}