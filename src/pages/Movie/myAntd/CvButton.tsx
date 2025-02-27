import cn from 'classnames'
import './CvButton.less'
import Styles from './CvButton.module.less'
export function CvButton({ children, type = 'default', size, danger, onClick }: any) {
  return (
    <button
      onClick={() => {
        onClick()
      }}
      className={cn({
        [Styles['cv-btn']]: true,
        [Styles[`cv-btn-color-${type}`]]: true,
        [Styles['cv-btn-variant-outlined']]: type === 'default',
        [Styles['cv-btn-variant-solid']]: type === 'primary',
        [Styles['cv-btn-lg']]: size && size === 'large',
        [Styles['cv-btn-sm']]: size && size === 'small',
        [Styles['cv-btn-color-dangerous']]: danger
      })}
    >
      {children}
    </button>
  )
}
