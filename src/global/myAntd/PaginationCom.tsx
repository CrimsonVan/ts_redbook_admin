//二次封装antd组件
import styled from 'styled-components'
import { Pagination } from 'antd'
function PaginationComp({
  pageSize,
  total,
  onChange,
  hideOnSinglePage = false,
  showSizeChanger = false
}: {
  pageSize?: number
  total?: number
  onChange?: any
  hideOnSinglePage?: boolean
  showSizeChanger?: boolean
}) {
  return (
    <>
      <PaginationStyledComp>
        <Pagination
          pageSize={pageSize}
          total={total}
          onChange={onChange}
          hideOnSinglePage={hideOnSinglePage}
          showSizeChanger={showSizeChanger}
        ></Pagination>
      </PaginationStyledComp>
    </>
  )
}

const PaginationStyledComp = styled.div`
  background-color: #fff;
  margin-top: 10px;
`

export default PaginationComp
