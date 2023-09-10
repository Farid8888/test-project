import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './components/context/Context';
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import Reducer from './components/store/itemsSlice';
import statusReducer from './components/store/statusSlice'
import createSagaMiddleware from  'redux-saga'
import {watchSagas} from './components/store/index'
import {BrowserRouter} from 'react-router-dom'

const sagaMidlleware = createSagaMiddleware()

const store = configureStore({
 reducer:{
  mainSt:Reducer,
  statusSt:statusReducer
 },
 middleware:[sagaMidlleware]
})
sagaMidlleware.run(watchSagas)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <BrowserRouter>
    <Provider store={store}>
    <ContextProvider>
    <App />
    </ContextProvider>
    </Provider>
    </BrowserRouter>
  </>
);

reportWebVitals();
