import { createSlice } from '@reduxjs/toolkit'
import { userGetInfoService } from '../../api/user'
// 内置类型检查
import type { PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  todoArr: Array<any>
  userInfo: any
  token: any
}
type editArg = {
  index: number | null
  val: string
}
const initialState: InitialState = {
  todoArr: ['吃饭', '睡觉', '看电影', '看鬼片'],
  userInfo: {},
  token: null
}
const todoStore = createSlice({
  name: 'todolistStore',
  initialState: initialState,
  reducers: {
    addTodoArr(state, actions: PayloadAction<string>) {
      console.log('打印store传参', actions.payload)
      state.todoArr.push(actions.payload)
    },
    delTodoArr(state, actions: PayloadAction<number>) {
      state.todoArr = state.todoArr.filter((item, index) => item && index !== actions.payload)
    },
    editTodoArr(state, actions: PayloadAction<editArg>) {
      if (actions.payload.index) {
        state.todoArr[actions.payload.index] = actions.payload.val
      }
    },
    setUserInfo(state, actions: PayloadAction<any>) {
      state.userInfo = actions.payload
    },
    clearUserInfo(state) {
      state.userInfo = null
    },
    clearToken(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    setToken(state, actions: PayloadAction<any>) {
      state.token = actions.payload
      localStorage.setItem('token', actions.payload)
    }
  }
})

const { addTodoArr, delTodoArr, editTodoArr, setUserInfo, setToken, clearToken, clearUserInfo } =
  todoStore.actions
const todoStoreReducer = todoStore.reducer
//异步获取用户信息
const getUserInfo = (username: any) => {
  return async (dispatch: any) => {
    const res = await userGetInfoService({ username })
    console.log('打印用户信息', res.data.data)
    dispatch(setUserInfo(res.data.data))
  }
}
export { addTodoArr, delTodoArr, editTodoArr, getUserInfo, setToken, clearToken, clearUserInfo }
export default todoStoreReducer
