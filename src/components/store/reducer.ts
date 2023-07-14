import React from 'react'
import {Ing} from '../../types/type'



type Items={
    items:Ing[]
}
const initialState:Items={
items:[]
}


type ACT={
    type:string,
    itm:Ing,
    id:string
}

const Reducer =(state=initialState,action:ACT)=>{
switch(action.type){
    case('FETCH'):return state.items.concat(action.itm)
    case('ADD ITEMS'):
    const findedIndex = state.items.findIndex(item=>item.title === action.itm.title)
    if(findedIndex>=0){
        const newArr =[...state.items]
    const objInd = state.items[findedIndex]
    const newObj = {...objInd,amount: parseInt(objInd.amount) + parseInt(action.itm.amount)}
    newArr[findedIndex] = newObj
    return {...state,items:newArr}
}else{
    return state.items.concat({...action.itm,id:action.id})
}
  case('REMOVE'):return state.items.filter(item=>item.id !== action.id)
  default:return initialState
}
}
export default Reducer

