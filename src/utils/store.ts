import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import itemsSlice from '../components/store/itemsSlice'
import statusSlice from '../components/store/statusSlice'

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  mainSt:itemsSlice,
  statusSt:statusSlice
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']