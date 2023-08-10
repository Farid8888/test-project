import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import {INST,Ing} from '../../types/type'


const initialState:INST={
    items:[],
    loading:false,
    error:'',
    }

const itemsSlice=createSlice({
    name:'items',
    initialState,
    reducers:{
        fetchFun:(state,action:PayloadAction<Ing[]>)=>{
           state.items = action.payload
        },
        search:(state,action:PayloadAction<Ing[]>)=>{
            state.items = action.payload
         },
         send:(state)=>{
            state.loading = true
         },
         response:(state)=>{
            state.loading = false
         },
         error:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
         },
         clean:(state)=>{
            state.error = ''
         },
         addItems:(state,action:PayloadAction<Ing>)=>{
            const findedIndex = state.items.findIndex(item=>item.title === action.payload.title)
    if(findedIndex>=0){
        const newArr =[...state.items]
    const objInd = state.items[findedIndex]
    const newObj = {...objInd,amount: parseInt(objInd.amount) + parseInt(action.payload.amount)}
    newArr[findedIndex] = newObj
    state.items=newArr
}else{
    const newA = state.items.concat({...action.payload})
    state.items=newA
}
         },
         remove:(state,action:PayloadAction<string>)=>{
            const filtAr = state.items.filter(item=>item.id !== action.payload)
             state.items=filtAr
         },
    }
})

export const {fetchFun,search,send,remove,response,error,addItems,clean} = itemsSlice.actions
export default itemsSlice.reducer