import React,{useContext} from 'react'
import classes from './IngridientItem.module.css'
import Context from '../context/Context'
import {useHook} from '../hooks/customHook'

type Ingridient ={
    amount:any,
    title:string,
    id:string
}

const IngridientItem:React.FC<Ingridient>=(props)=> {
    console.log(props.id,'itemidd')
    const {sendRequest} = useHook(props.id)
    const remove =()=>{
        sendRequest(`https://auth-with-hooks-default-rtdb.firebaseio.com/form/${props.id}.json`,'DELETE')
    }
  return (
    <div className={classes.item} onClick={remove}>
      <p>{props.title}</p>
      <p>{props.amount}</p>
    </div>
  )
}

export default IngridientItem
