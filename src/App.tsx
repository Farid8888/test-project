import React from 'react';
import IngredientsMain from './components/IngredientsMain/IngredientsMain';
import Modal from './components/UI/Modal/Modal';
import { useAppSelector,useAppDispatch } from './components/store/hooks';
import StatusBar from './components/UI/StatusBar/StatusBar'
import {clean} from './components/store/itemsSlice'

function App() {
  const dispatch = useAppDispatch()
  const error =useAppSelector(state=>state.mainSt.error)
const status = useAppSelector(state=>state.statusSt.status)
const modalHandler =()=>{
  dispatch(clean())
}
  
  return (
    <div >
      {status && <StatusBar/>}
      {error && <Modal modalHandler={modalHandler}>
        <h2>{error}</h2>
        <button type='button' onClick={modalHandler}>Go Back</button>
        </Modal>}
      <IngredientsMain/>
    </div>
  );
}

export default App;
