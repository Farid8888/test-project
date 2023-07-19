import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './components/context/Context';
import {Provider} from 'react-redux'
import {createStore,Store,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Reducer from './components/store/reducer';
import {Ing} from './types/type'


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
const store=createStore(Reducer,applyMiddleware(thunk))
// const store:Store<Items,ACT>& {
//   dispatch: DispatchType
// } =createStore(Reducer)
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
