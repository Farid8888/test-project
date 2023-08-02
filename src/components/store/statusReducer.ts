import {ST} from '../../types/type'



const initialState:ST={
    status:null
}



export const statusReducer =(state=initialState,action:any):ST=>{
switch(action.type){
    case('SENDING'):return {...state,status:action.notification}
    case('RESPONSING'):return {...state,status:action.notification}
    case('ERRORING'):return {...state,status:action.notification}
    default : return state
}
}

