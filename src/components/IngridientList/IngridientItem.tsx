import React,{useContext} from 'react'
import classes from './IngridientItem.module.css'
import Context from '../context/Context'

type Ingridient ={
    amount:any,
    title:string,
    id:string
}

const IngridientItem:React.FC<Ingridient>=(props)=> {
    const remove =useContext(Context).removeItems
  return (
    <div className={classes.item} onClick={remove.bind(null,props.id)}>
      <p>{props.title}</p>
      <p>{props.amount}</p>
    </div>
  )
}

export default IngridientItem
