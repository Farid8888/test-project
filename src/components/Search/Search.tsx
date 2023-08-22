import React,{useEffect,useState,useRef} from 'react'
import classes from './Search.module.css'
import {useAppSelector,useAppDispatch} from '../store/hooks'
import {mainSearch} from '../store/itemsSlice'



const Search=()=> {
  console.log('search')
    const [srch,setSrch] = useState(' ')
    const dispatch = useAppDispatch() 
    const status = useAppSelector(state=>state.statusSt.status?.status)
     const searchRef = useRef<HTMLInputElement>(null)
    const changeHandler =(event:React.ChangeEvent<HTMLInputElement>)=>{
       setSrch(event.target.value)
    }

    useEffect(()=>{
        const srchRef = searchRef.current!.value
            const timer = setTimeout(()=>{
                if(srch === srchRef){
                    const query = srch.length === 0 ? '' : `?orderBy="title"&equalTo="${srch}"`
                    dispatch(mainSearch({query}))
                }
            },4000)
        return ()=>{
            clearTimeout(timer)
        }
     },[srch,dispatch])
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

export default React.memo(Search)