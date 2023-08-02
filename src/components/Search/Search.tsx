import React,{useEffect,useState,useRef} from 'react'
import classes from './Search.module.css'
import {useHook} from '../hooks/customHook'
import {useAppSelector} from '../store/hooks'



const Search=()=> {
    const {sendRequest} = useHook(null,null,null,null,true)
    const [srch,setSrch] = useState(' ')
    const status = useAppSelector(state=>state.statusSt.status?.status)
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
      <p>{status === 'pending' && 'Loading...'}</p>
      <div>
      <input type='search' onChange={changeHandler} ref={searchRef}/>
      </div>
    </div>
  )
}

export default Search