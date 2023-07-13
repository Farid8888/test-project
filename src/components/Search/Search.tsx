import React,{useEffect,useState,useRef,useContext} from 'react'
import classes from './Search.module.css'
import {Ing} from '../../types/type'
import Context from '../context/Context'




const Search=()=> {
    const searchHandler = useContext(Context).searchItems
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
                    fetch(`https://auth-with-hooks-default-rtdb.firebaseio.com/form.json${query}`)
                    .then(response=>response.json()).then(data=>{
                        let itms:Ing[] = []
                        for(let key in data){
                            itms =[...itms,{
                                ...data[key],
                                id:key
                            }]
                        }
                        searchHandler(itms)
                    })
                    console.log(query,srch,srchRef)
                }
            },4000)
        return ()=>{
            clearTimeout(timer)
        }
     },[srch,searchHandler])
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