import {put,call} from 'redux-saga/effects'
import {getData,clean,cleanError,fetchErrmsg,fetchPasmsg} from '../store/authSlice'
import {PayloadAction} from '@reduxjs/toolkit'
import {SAGAACT,ITM,AUTHDATA} from '../../types/type'


type RES ={
    [key:string]:any
}


export function* authSaga (action:PayloadAction<SAGAACT>){
yield put(cleanError())
try{
    const response:RES = yield call(()=> fetch(action.payload.URL,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload.val),
      })) 

    const data:AUTHDATA = yield response.json()
    console.log(data,'working')
    if (data.error) {
        const errmsg = data.error.message;
        if (errmsg === "EMAIL_EXISTS") {
           yield put(fetchErrmsg("This user is already exists"))
        } else if (
          errmsg ===
          "WEAK_PASSWORD : Password should be at least 6 characters"
        ) {
         yield put(fetchPasmsg("Password is weak"))
        } else if (errmsg === "INVALID_PASSWORD") {
        yield put(fetchPasmsg("Invalid Password"))
        } else if (errmsg === "EMAIL_NOT_FOUND") {
         yield put(fetchErrmsg("Email not found"))
        } else {
          yield put(clean())
        }
      } else {
        const currentTime = new Date().getTime()
        const expire:any = currentTime - parseInt(data.expiresIn)*1000
        localStorage.setItem("token", data.idToken);
        localStorage.setItem('expire',expire)
        console.log(data,'eeeee')
        yield put(getData({
          token: data.idToken,
          expiresIn: expire,
          userId: data.localId,
        }));
      }
}catch(err){

}
// const sendRequest = async()=>{
//     const response = await fetch(action.payload.URL)
//     const data = await response.json()
//     if (data.error) {
//         const errmsg = data.error.message;
//         if (errmsg === "EMAIL_EXISTS") {
//             fetchErrmsg("This user is already exists")
//         } else if (
//           errmsg ===
//           "WEAK_PASSWORD : Password should be at least 6 characters"
//         ) {
//           fetchPasmsg("Password is weak")
//         } else if (errmsg === "INVALID_PASSWORD") {
//         fetchPasmsg("Invalid Password")
//         } else if (errmsg === "EMAIL_NOT_FOUND") {
//           fetchErrmsg("Email not found")
//         } else {
//           clean()
//         }
//       } else {
//         const currentTime = new Date().getTime()
//         const expire:any = currentTime - parseInt(data.expiresIn)*1000
//         localStorage.setItem("token", data.idToken);
//         localStorage.setItem('expire',expire)
//         console.log(data,'eeeee')
//         getData({
//           token: data.idToken,
//           expiresIn: expire,
//           userId: data.localId,
//         });
//       }
// }
// yield sendRequest()
}
