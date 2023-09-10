import React from 'react'
import classes from './IngridientItem.module.css'
import {useAppDispatch} from '../store/hooks'
import {mainRemove} from '../store/itemsSlice'
import {useNavigate,useLocation} from 'react-router-dom'
import {Ingridient} from '../../types/type'



const IngridientItem:React.FC<Ingridient>=(props)=> {
  const history = useNavigate()
  const loc = useLocation()
  console.log(history,'history',loc)
const dispatch = useAppDispatch()
    const remove =()=>{
        // dispatch(deleteFun(props.id,'DELETE'))
        dispatch(mainRemove(props.id))
    }
    const goItemPage =()=>{
      if(loc.pathname === '/list'){
        history(loc.pathname + '/' + props.id)
      }else{
        history('/list/' + props.id )
      }
    }
  return (
    <div className={`${classes.main} ${props.cl}`}>
    <div className={classes.item} onClick={goItemPage}>
      <p>{props.title}</p>
      <p>{props.amount}</p>
    </div>
    <div className={classes.btn}>
       <button type='button' onClick={remove}>DELETE</button>
    </div>
    </div>
  )
}

export default IngridientItem
