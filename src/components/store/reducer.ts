import React from 'react'
import {Ing,Items} from '../../types/type'






const initialState:Items={
items:[]
}


type ACT={
    type:string,
    itmArr:Ing[],
    itm:Ing,
    id:string
}

const Reducer =(state=initialState,action:any):Items=>{
switch(action.type){
    case('FETCH'):return {...state,items:action.itmArr}
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

