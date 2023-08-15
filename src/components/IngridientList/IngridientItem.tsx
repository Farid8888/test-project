import React from 'react'
import classes from './IngridientItem.module.css'
import {useAppDispatch} from '../store/hooks'
import {mainRemove} from '../store/itemsSlice'

type Ingridient ={
    amount:any,
    title:string,
    id:string
}

const IngridientItem:React.FC<Ingridient>=(props)=> {
const dispatch = useAppDispatch()
    const remove =()=>{
        // dispatch(deleteFun(props.id,'DELETE'))
        dispatch(mainRemove(props.id))
    }
  return (
    <div className={classes.item} onClick={remove}>
      <p>{props.title}</p>
      <p>{props.amount}</p>
    </div>
  )
}

export default IngridientItem
