import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import todoStoreReducer from './modules/todollist'
// 定义类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const rootReducer = combineReducers({
  todoStore: todoStoreReducer
})

// 持久化配置
const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  //   reducer: {
  //     todoStore: todoStoreReducer,
  //   },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export default store
export const persistor = persistStore(store)
