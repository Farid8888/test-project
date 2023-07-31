import React,{useEffect,useState,useRef,useContext} from 'react'
import classes from './Search.module.css'
import {Ing} from '../../types/type'
import Context from '../context/Context'
import {useHook} from '../hooks/customHook'
import { useAppSelector } from '../store/hooks'



const Search=()=> {
    const searchHandler = useContext(Context).searchItems
    const itmmm = useAppSelector(state=>state.items)
    console.log(itmmm,'itmmmmmm')
    const {sendRequest} = useHook()
    const [srch,setSrch] = useState(' ')
     const searchRef = useRef<HTMLInputElement>(null)
  
    
    const changeHandler =(event:React.ChangeEvent<HTMLInputElement>)=>{
       setSrch(event.target.value)
    }

    useEffect(()=>{
        const srchRef = searchRef.current!.value
            const timer = setTimeout(()=>{
                console.log('sdsjnjsnjdsnjdknsdjk')
                if(srch === srchRef){
                    const query = srch.length === 0 ? '' : `?orderBy="title"&equalTo="${srch}"`
                    sendRequest(`https://auth-with-hooks-default-rtdb.firebaseio.com/form.json${query}`,'GET')
                }
            },4000)
        return ()=>{
            clearTimeout(timer)
        }
     },[srch,sendRequest])
  return (
    <div className={classes.search}>
      <p>Filter By</p>
      <p>Loading...</p>
      <div>
      <input type='search' onChange={changeHandler} ref={searchRef}/>
      </div>
    </div>
  )
}

export default Search