import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './components/context/Context';
import {Provider} from 'react-redux'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Reducer from './components/store/reducer';
import {statusReducer} from './components/store/statusReducer'
import {Ing,INST} from './types/type'


type ACT={
  type:string,
  itm:Ing,
  id:string
}
type Items={
  items:Ing[]
}
type DispatchType=(args:ACT)=>ACT
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


type st={
  status:string
}
  type StoreState={
    mainSt:INST,
    statusSt:st
  }


const reducers = combineReducers({
  mainSt:Reducer,
  statusSt:statusReducer
})

const store=createStore(reducers,applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
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
