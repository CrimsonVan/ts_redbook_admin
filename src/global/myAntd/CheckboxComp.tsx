import { Button, Checkbox, Col, Popover, Row } from 'antd'
import styles from './CheckboxComp.module.less'
import { useEffect, useState, useMemo } from 'react'
import { SettingOutlined } from '@ant-design/icons'

interface boxProps {
  boxOptions?: { label: string; value: any }[] //所有指标
  defaultCheckedList: any[] //上次选择之后记录的指标
  onFinished: any //确认
  type: 'link' | 'button'
  isTitle?: boolean //是否有副标题
  listOptions?: {
    title: string
    valueOptions: {
      label: string
      value: any
    }[]
  }[] //标题+value入参   istitle为true的时候传这个  不传boxOptions
}

export default function CheckBoxGroup({
  defaultCheckedList,
  boxOptions = [],
  listOptions = [],
  isTitle = false,
  onFinished,
  type = 'button'
}: boxProps) {
  const [open, setOpen] = useState(false) //是否打开弹窗
  const [allOptions, setAllOptions] = useState<any>([]) //所有选项
  const [checkedList, setCheckedList] = useState<any>(defaultCheckedList) //已选的所有选项

  const Operation = {
    button: (
      <Button
        onClick={() => setOpen(true)}
        id="groupCheckbox"
        type="primary"
        style={{ width: '113px', fontSize: '12px', padding: '4px 7px' }}
      >
        选择数据指标（{checkedList.length}）
      </Button>
    ),
    link: (
      <Button
        onClick={() => setOpen(true)}
        id="groupCheckbox"
        type="link"
        style={{ width: '113px', fontSize: '14px', padding: '4px 7px' }}
        icon={<SettingOutlined />}
      >
        列表配置
      </Button>
    )
  }

  useEffect(() => {
    if (!open) {
      return
    }
    let new_allOptions: any[] = []
    // 是否需要副标题
    if (isTitle) {
      //listOptions
      listOptions.forEach((item) => {
        item.valueOptions.forEach((ele) => {
          new_allOptions.push(ele.value)
        })
      })
      setAllOptions(new_allOptions)
    } else {
      // allOptions
      boxOptions.forEach((item) => new_allOptions.push(item.value))
      setAllOptions(new_allOptions)
    }
  }, [open])

  //是否全选属性
  const checkAll = useMemo(
    () => allOptions.length === checkedList.length,
    [allOptions, checkedList]
  )

  //是否有已选属性
  const indeterminate = useMemo(
    () => checkedList.length > 0 && checkedList.length < allOptions.length,
    [allOptions, checkedList]
  )

  //选择完成的回调
  const onGroupChange = (list: string[]) => {
    setCheckedList(list)
  }

  //全选、反选操作
  const onCheckAllChange = (e: any) => {
    setCheckedList(e.target.checked ? allOptions : [])
  }

  // 确认
  const onConfirm = () => {
    setOpen(false)
    onFinished(checkedList)
  }

  // 取消
  const onCancel = () => {
    setCheckedList(defaultCheckedList)
    setOpen(false)
  }

  return (
    <Popover
      placement="bottomRight"
      trigger={'click'}
      overlayClassName={styles.checkPopover}
      destroyTooltipOnHide={true}
      open={open}
      title={
        <>
          {/* 弹窗标题 */}
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 0, fontWeight: 'normal' }}
          >
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              全选
            </Checkbox>
            <div style={{ color: '#c2c2c2' }}>
              （<span style={{ color: '#666FFF' }}>{checkedList.length}</span> / {allOptions.length}
              已选）
            </div>
            <Button type="link" onClick={() => setCheckedList([])}>
              重置
            </Button>
          </div>
        </>
      }
      content={
        <>
          {/* 选项 */}
          <Checkbox.Group value={checkedList} style={{ width: '100%' }} onChange={onGroupChange}>
            {!isTitle ? (
              <Row>
                {(boxOptions || []).map((item, index) => {
                  return (
                    <Col span={8} style={{ marginTop: '8px' }} key={index}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  )
                })}
              </Row>
            ) : (
              listOptions.map((item, index) => {
                return (
                  <div key={index} style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '70px', marginTop: '8px' }}>{item.title}：</div>
                    <Row style={{ width: 'calc(100% - 70px)' }}>
                      {(item.valueOptions || []).map((ele, index) => {
                        return (
                          <Col span={8} style={{ marginTop: '8px' }} key={index}>
                            <Checkbox value={ele.value}>{ele.label}</Checkbox>
                          </Col>
                        )
                      })}
                    </Row>
                  </div>
                )
              })
            )}
          </Checkbox.Group>
          {/* 弹窗底部按钮 */}
          <div style={{ direction: 'rtl', marginTop: '10px' }}>
            <Button type="primary" style={{ marginLeft: 10 }} onClick={() => onConfirm()}>
              确定
            </Button>
            <Button onClick={() => onCancel()}>取消</Button>
          </div>
        </>
      }
      arrow={false}
    >
      {Operation[type]}
    </Popover>
  )
}
