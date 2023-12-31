import {useCallback} from 'react'
import {Ing,IN} from '../../types/type'
import { useAppDispatch } from '../store/hooks'



export const useHook =(ID?:string | null,itmsInd?:Ing | null,val?:IN | null,ind?:any,show?:boolean)=>{
    const dispatch = useAppDispatch()
    const sendRequest =useCallback(async(url:any,mth?:string,body?:IN | Ing | null)=>{
      dispatch({type:'SEND'})
      show && dispatch({type:'SENDING',notification:{status:'pending',message:'...Sending'}})
        try{
      
            const response = await fetch(url,{
                method:mth,
                headers:{"Content-Type":"application/json"},
                body:body && JSON.stringify(body)
            })
            if(!response.ok){
                
            }
            const data = await response.json()
       dispatch({type:'RESPONSE'})
       show && dispatch({type:'RESPONSING',notification:{status:'success',message:'Success'}})
        if(mth=== 'DELETE'){
           dispatch({type:'REMOVE',id:ID})
        }
        else if(mth === 'GET'){
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

        }
            
        
        }catch(err:any){
            let modErr:string
            if(err.message === 'Failed to fetch'){
                modErr ='Something going wrong'
                dispatch({type:'ERROR',err:modErr})
                dispatch({type:'ERRORING',notification:{status:'error',message:'Error'}})
            }
        }
        
    },[dispatch,val,itmsInd,ind,ID,show])

    return{
       sendRequest
    }
}