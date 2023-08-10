
import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import {ST,NTF} from '../../types/type'



const initialState:ST={
    status:null
}

const statusReducer=createSlice({
    name:'status',
    initialState,
    reducers:{
        sending:(state,action:PayloadAction<NTF>)=>{
            state.status = action.payload
        },
        responsing:(state,action:PayloadAction<NTF>)=>{
            state.status = action.payload
        },
        erroring:(state,action:PayloadAction<NTF>)=>{
            state.status = action.payload
        }
    }
})

export const {sending,responsing,erroring} = statusReducer.actions
export default statusReducer.reducer


