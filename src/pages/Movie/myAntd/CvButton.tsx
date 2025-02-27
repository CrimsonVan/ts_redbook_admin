import cn from 'classnames'
import './CvButton.less'
export function CvButton({ children, type = 'default', size, danger, onClick }: any) {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className={cn({
        'cv-btn': true,
        [`cv-btn-color-${type}`]: true,
        'cv-btn-variant-outlined': type === 'default',
        'cv-btn-variant-solid': type === 'primary',
        'cv-btn-lg': size && size === 'large',
        'cv-btn-sm': size && size === 'small',
        'cv-btn-color-dangerous': danger
      })}
    >
      {children}
    </button>
  )
}
