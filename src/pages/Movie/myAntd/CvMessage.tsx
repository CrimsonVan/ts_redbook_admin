import './CvMessage.less'
import { createRoot } from 'react-dom/client'
import { InfoCircleTwoTone } from '@ant-design/icons'
export function CvMessage({ content, icon }: any) {
  return (
    <div className={'cv-message-notice'}>
      <div className={'cv-message-notice-content'}>
        {icon} {content}
      </div>
    </div>
  )
}

export const cvMessage: any = {
  wrapper: null,
  root: null,
  list: [],
  showAndHide(content: any, icon: any) {
    if (this.root) {
      this.root = null
    }
    if (!this.wrapper) {
      this.wrapper = document.createElement('div') as any
      this.wrapper.className = 'cv-message' as any
      document.body.appendChild(this.wrapper as any)
    }
    this.root = createRoot(this.wrapper)
    this.list.push(<CvMessage content={content} icon={icon} key={this.list.length}></CvMessage>)
    this.root.render(this.list)
    setTimeout(() => {
      this.list.shift()
      this.wrapper.children[0].remove()
      this.root = null
      if (this.list.length === 0) {
        this.wrapper = null
      }
    }, 2000)
  },
  info(content: string) {
    this.showAndHide(content, <InfoCircleTwoTone style={{ color: 'blue' }} />)
  }
}
