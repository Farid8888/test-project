import React,{useEffect} from 'react'
import IngridientItem from '../IngridientList/IngridientItem'
import {useParams} from 'react-router-dom'
import classes from './pagesClasses/ItemPage.module.css'
import {useAppDispatch,useAppSelector} from '../store/hooks'
import {mainItem} from '../store/itemsSlice'
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner'

export default function ItemPage() {
    const params:any =useParams()
    const dispatch = useAppDispatch()
    const items = useAppSelector(state=>state.mainSt.items)
    const loading = useAppSelector(state=>state.mainSt.loading)
    let content 
    if(loading){
      content = <div style={{textAlign:'center'}}><LoadingSpinner/></div>
    }else{
         content = items.map(item=>{
            return <IngridientItem cl={classes.cl} key={item.id} amount={item.amount} title={item.title} id={item.id}/>
        })
    }
    useEffect(()=>{
       dispatch(mainItem(params.id))
    },[params.id,dispatch])
  return (
    <div >
      {content}
    </div>
  )
}
