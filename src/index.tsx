import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './components/context/Context';
import {Provider} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import Reducer from './components/store/itemsSlice';
import statusReducer from './components/store/statusSlice'
import {Ing,INST} from './types/type'
import createSagaMiddleware from  'redux-saga'
import {watchSagas} from './components/store/index'


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
  <React.StrictMode>
    <Provider store={store}>
    <ContextProvider>
    <App />
    </ContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
