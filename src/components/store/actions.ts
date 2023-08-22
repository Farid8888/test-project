import {Ing} from '../../types/type'
import {fetchFun,response as rsp,send,error,remove} from '../store/itemsSlice'
import { sending,responsing,erroring } from './statusSlice'





export const addItems =(ITM:string,itm:any,url:any,mth:string)=>{
    return{
      ITM,
      itm,
      url,
      mth
    }  
    }


    
export const fetchArr =(query:string)=>{
    return async(dispatch:any)=>{
        dispatch(send())
        query && dispatch(sending({status:'pending',message:'...Sending'}))
         try{
           const response = await fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form.json${query}`)
           const data = await response.json()
           let itemArr:Ing[]  = []
           for(let key in data){
            itemArr=[...itemArr,{
                ...data[key],
                id:key
            }]
           }
           dispatch(rsp())
           query && dispatch(responsing({status:'success',message:'Success'}))
           dispatch(fetchFun(itemArr))
         }catch(err:any){
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                dispatch(error(modErr))
                query && dispatch(erroring({status:'error',message:'Error'}))
            }
         }
    }
}


export const deleteFun =(id:string,mth:string)=>{
    return async (dispatch:any)=>{
        dispatch(send())
        dispatch(sending({status:'pending',message:'...Sending'}))
        try{
        await fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form/${id}.json`,{
            method:mth
        })

        dispatch(rsp())
        dispatch(responsing({status:'success',message:'Success'}))
        dispatch(remove(id))
        }catch(err:any){
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                dispatch(error(modErr))
                dispatch(erroring({status:'error',message:'Error'}))
            }
        }
        
    }
}


