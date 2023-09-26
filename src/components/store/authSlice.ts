import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH, DATASAGA, SAGAACT} from "../../types/type";

const initialState: DATASAGA = {
  data: {
    token: "",
    expiresIn: "",
    userId: "",
  },
  error: {
    Paserr: "",
    Errmsg: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<AUTH>) => {
      state.data.token = action.payload.token
      state.data.expiresIn = action.payload.expiresIn
      state.data.userId = action.payload.userId
    },
    cleanError: (state) => {
      state.error = { Paserr: "", Errmsg: "" };
    },
    fetchErrmsg:(state,action:PayloadAction<string>)=>{
       state.error.Errmsg = action.payload
    },
    fetchPasmsg:(state,action:PayloadAction<string>)=>{
     state.error.Paserr = action.payload
    },
    clean:(state)=>{
      state.data={
        token: "",
        expiresIn: "",
        userId: "",
        }
        localStorage.removeItem('token')
        localStorage.removeItem('expire')
    },
    sagaConnect:(state,action:PayloadAction<SAGAACT>)=>{

    }
  },
});

export const {getData,cleanError,clean,sagaConnect,fetchErrmsg,fetchPasmsg} = AuthSlice.actions 
export default AuthSlice.reducer