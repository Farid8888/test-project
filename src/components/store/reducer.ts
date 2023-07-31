import React from 'react'
import {Ing,INST} from '../../types/type'






const initialState:INST={
items:[],
loading:false,
error:''
}



const Reducer =(state=initialState,action:any):INST=>{
switch(action.type){
    case('FETCH'):return {...state,items:action.itmArr}
    case('SEARCH'):return {...state,items:action.itms}
    case('SEND'):return {...state,loading:true}
    case('RESPONSE'):return {...state,loading:false}
    case('ERROR'):return {...state,error:action.err,loading:false}
    case ('CLEAN'):return {...state,error:''}
    case('ADD ITEMS'):
    const findedIndex = state.items.findIndex(item=>item.title === action.itm.title)
    if(findedIndex>=0){
        const newArr =[...state.items]
    const objInd = state.items[findedIndex]
    const newObj = {...objInd,amount: parseInt(objInd.amount) + parseInt(action.itm.amount)}
    newArr[findedIndex] = newObj
    return {...state,items:newArr}
}else{
    const newA = state.items.concat({...action.itm})
    return {...state,items:newA}
}
  case('REMOVE'):
  const filtAr = state.items.filter(item=>item.id !== action.id)
  return {...state,items:filtAr}
  default:return initialState
}
}
export default Reducer

