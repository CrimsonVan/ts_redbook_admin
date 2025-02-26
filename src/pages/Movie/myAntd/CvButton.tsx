import cn from 'classnames'
import './CvButton.less'
export function CvButton({ children, type = 'default' }: any) {
  console.log('打印type参数', type)
  return (
    <button
      className={cn({
        'cv-btn': true,
        [`cv-btn-color-${type}`]: true,
        'cv-btn-variant-outlined': true,
        'cv-btn-color-default': true
      })}
    >
      {children}
    </button>
  )
}
