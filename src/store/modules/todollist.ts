import { createSlice } from '@reduxjs/toolkit'
// 内置类型检查
import type { PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  todoArr: Array<string>
}
type editArg = {
  index: number | null
  val: string
}
const initialState: InitialState = {
  todoArr: ['吃饭', '睡觉', '看电影', '看鬼片']
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
    }
  }
})

const { addTodoArr, delTodoArr, editTodoArr } = todoStore.actions
const todoStoreReducer = todoStore.reducer
export { addTodoArr, delTodoArr, editTodoArr }
export default todoStoreReducer
