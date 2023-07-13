import React,{createContext,useState,useCallback,useReducer} from 'react'
import {IN,Ing} from '../../types/type'
import {PayloadActionCreator} from '@reduxjs/toolkit'

type Ch={
    children:React.ReactNode
}

type Cont={
    items:Items[],
    status:STATUS,
    addItems:(items:IN)=>void,
    removeItems:(id:string)=>void,
    searchItems:(searchItems:Items[])=>void,
    fetchItems:()=>void
}

type Items={
    title:string,
    amount:string,
    id:string
}

type STATUS={
    loading:boolean,
    error:string
}

type ACT={
    type:string,
    err?:any
}
const initialState:STATUS={
    loading:false,
    error:''
}
const Context=createContext<Cont>({
    items:[],
    status:initialState,
    addItems:()=>{},
    removeItems:()=>{},
    searchItems:()=>{},
    fetchItems:()=>{}
})

export default Context

const reducer =(state=initialState,action:ACT)=>{
switch(action.type){
    case('SEND'):return {...state,loading:true}
    case('RESPONSE'):return {...state,loading:false}
    case('ERROR'):return {loading:false,error:action.err}
    default:return initialState
}
}


export const ContextProvider:React.FC<Ch> =(props)=>{
 const [ingridients,setIngridients] = useState<Ing[]>([])
 const [err,setErr] = useState(false)
 const [status,dispatch] = useReducer(reducer,initialState)
 const searchHandler =useCallback((searchItems:Items[])=>{
    setIngridients(searchItems)
 },[])
 const fetchItems =useCallback(async()=>{
    dispatch({type:'SEND'})        
    try{
        const response = await fetch('https://auth-with-hooks-default-rtdb.firebaseio.com/.json')
        if(!response.ok){
            throw new Error('Something going wrong')
        }
        const data = await response.json()
        let ing:Ing[] = []
        for(let key in data.form){
            ing=[...ing,
            {
                ...data.form[key],
                id:key
            }
            ]
        }
        setIngridients(ing)
        dispatch({type:'RESPONSE'})
    }catch(err){
        console.log(err,'error')
        dispatch({type:'ERROR',err:err})
    }
        
 },[])
 const addItems =(items:IN)=>{
    dispatch({type:'SEND'})
    const findedIndex = ingridients.findIndex(item=>item.title === items.title)
    if(findedIndex>=0){
        const newArr =[...ingridients]
    const objInd = ingridients[findedIndex]
    const newObj = {...objInd,amount: parseInt(objInd.amount) + parseInt(items.amount)}
    newArr[findedIndex] = newObj
    fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form/${objInd.id}.json`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(newObj)
      }).then(response=>response.json()).then(data=>{
        dispatch({type:'RESPONSE'})
      }).catch(err=>{
        dispatch({type:'ERROR',err:err})
      })
        setIngridients(newArr)
    }else{
        fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form/.json`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(items)
          }).then(response=>response.json()).then(data=>{
            setIngridients(prevst=>{
                return prevst.concat({...items,id:data.name})
            })
            dispatch({type:'RESPONSE'})
          }).catch(err=>{
            dispatch({type:'ERROR',err:err})
          })
        
    }
    
}

const removeItems =(id:string)=>{
    dispatch({type:'SEND'})
    setIngridients(prevst=>{
        return prevst.filter(item=>item.id !== id)
    })
 
 fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form/${id}.json`,{
        method:'DELETE'
      }).then(response=>response.json()).then(data=>{
        dispatch({type:'RESPONSE'})
      }).catch(err=>{
        dispatch({type:'ERROR',err:err})
      })
}
    return(
        <Context.Provider value={{items:ingridients,addItems:addItems,removeItems:removeItems,searchItems:searchHandler,fetchItems:fetchItems,status:status}}>
           {props.children}
        </Context.Provider>
    )
}




