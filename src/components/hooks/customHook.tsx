import {useCallback,useState} from 'react'
import {Ing,IN} from '../../types/type'
import { useAppDispatch } from '../store/hooks'



export const useHook =(ID?:string,itmsInd?:Ing,val?:IN,ind?:any)=>{
    const dispatch = useAppDispatch()
    const sendRequest =useCallback(async(url:any,mth?:string,body?:IN | Ing,srch?:boolean)=>{
      dispatch({type:'SEND'})
        try{
      
            const response = await fetch(url,{
                method:mth,
                headers:{"Content-Type":"application/json"},
                body:body && JSON.stringify(body)
            })
            console.log(response,'llllllllll')
            if(!response.ok){
                
                console.log("throw er")
            }
            const data = await response.json()
            console.log(data,'tryyyyyyyyy')
       dispatch({type:'RESPONSE'})
        if(mth=== 'DELETE'){
           dispatch({type:'REMOVE',id:ID})
        }
        else if(mth === 'GET'){
         console.log('gggggggetttt')
            let ing:Ing[] = []
            for(let key in data){
                ing=[...ing,
                    {
                        ...data[key],
                        id:key
                    }
                ]
            }
            dispatch({type:'FETCH',itmArr:ing})
        }
       
        else {
            dispatch({type:'ADD ITEMS',itm:{...val,id:ind<0 ? data.name : itmsInd?.id}})
            console.log('notget')
        }
            
        
        }catch(err:any){
            console.log(err.message,'erererere')
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                dispatch({type:'ERROR',err:modErr})
            }
        }
        
    },[dispatch,val,itmsInd,ind,ID])

    return{
       sendRequest
    }
}