import {IN} from '../../types/type'





export const postItems =(itms:IN)=>{
    return async (dispatch:any)=>{
        
        dispatch({type:'ADD ITEMS',itm:itms})
    }
}



// export const addItems =(itms:IN)=>{
//     return ({type:'ADD ITEMS',itm:itms})
// }



export const response=()=>{
    return async (dispatch:any)=>{
       dispatch({type:'RESPONSE'})
       dispatch({type:'RESPONSING'})
    }
}


export const send =()=>{
    return async (dispatch:any)=>{
        dispatch({type:'SEND'})
       
    }
}

export const error=()=>{
    return async (dispatch:any)=>{
        dispatch({type:'ERROR'})
    }
}