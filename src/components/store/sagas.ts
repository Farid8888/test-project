import { PayloadAction } from '@reduxjs/toolkit';
import {Ing,SAGITM} from '../../types/type'
import {fetchFun,response as rsp,send,error,addItems as add,remove} from './itemsSlice'
import { sending,responsing,erroring } from './statusSlice'
import {put} from 'redux-saga/effects'
import axios from 'axios'


type Res ={
    [key:string]:Ing,
}
type Data={
    data:Res,
}


export function* addItemsAsync (action:PayloadAction<SAGITM>){
    const {mth,itms,URL,ITM}=action.payload
       yield put(send())
        yield put(sending({status:'pending',message:'...Sending'}))
        try{
        const response:Data = yield mth === 'post' ? axios.post(URL,ITM) : axios.put(URL,ITM)
        console.log(response,'sagasagsgas')
        yield put(rsp())
        yield put(responsing({status:'success',message:'Success'}))
        yield put(add({...itms.val,id:itms.ind<0 ? response.data.name : itms.id}))
        }catch(err:any){
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                yield put(error(modErr))
                yield put(erroring({status:'error',message:'Error'}))
            }
        }
}
type Q={
    query?:any
}
export function* fetchArr(action:PayloadAction<Q>){
    const {query} = action.payload
        yield put(send())
        yield query &&  put(sending({status:'pending',message:'...Sending'}))
         try{
        //    const response:Response = yield call(()=>fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form.json`))
        //    console.log(response,'sagagagagagasgags')
        //    const data:Res= yield response.json()
           const response:Data = yield axios.get(`https://auth-with-hooks-default-rtdb.firebaseio.com/form.json/${query}`)
           
           const data:Res =response.data
           let itemArr:Ing[]  = []
           for(let key in data){
            itemArr=[...itemArr,{
                ...data[key],
                id:key
            }]
           }
           yield put(rsp())
           yield query && put(responsing({status:'success',message:'Success'}))
           yield put(fetchFun(itemArr))
         }catch(err:any){
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                yield put(error(modErr))
               yield query && put(erroring({status:'error',message:'Error'}))
            }
         }
}


export function* deleteFun (action:PayloadAction<string>){
    const id = action.payload
        yield put(send())
        yield put(sending({status:'pending',message:'...Sending'}))
        try{
        yield axios.delete(`https://auth-with-hooks-default-rtdb.firebaseio.com/form/${id}.json`)
        yield put(rsp())
        yield put(responsing({status:'success',message:'Success'}))
        yield put(remove(id))
        }catch(err:any){
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                yield put(error(modErr))
                yield put(erroring({status:'error',message:'Error'}))
            }
        }
        
    }


