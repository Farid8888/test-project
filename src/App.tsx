import React,{useState} from 'react';
import IngredientsMain from './components/IngredientsMain/IngredientsMain';
import Modal from './components/UI/Modal/Modal';
import { useAppSelector,useAppDispatch } from './components/store/hooks';

function App() {
  const dispatch = useAppDispatch()
  const error =useAppSelector(state=>state.error)
const modalHandler =()=>{
  dispatch({type:'CLEAN'})
}
  
  return (
    <div >
      {error && <Modal modalHandler={modalHandler}>
        <h2>{error}</h2>
        <button type='button' onClick={modalHandler}>Go Back</button>
        </Modal>}
      <IngredientsMain/>
    </div>
  );
}

export default App;
