import {IN} from '../../types/type'
import {ARG,DispatchItm} from '../../types/type'
import {Dispatch} from 'redux'



// export const  postItems = (itms:Items)=>async (dispatch:any)=>{
//  dispatch({type:'ADD ITEMS',itms:itms})
// }

export const postItems =(itms:IN)=>{
    return async (dispatch:any)=>{

        dispatch({type:'ADD ITEMS',itm:itms})
    }
}

export const putItems =()=>{
    return async (dispatch:any)=>{

        
    }
}

export const addItems =(itms:IN)=>{
    return ({type:'ADD ITEMS',itm:itms})
}
// export const putItems =()=>{
// return (dispatch:DispatchItm)=>{
//     dispatch({type:'ADD ITEMS',itms:itms})
// }
// }