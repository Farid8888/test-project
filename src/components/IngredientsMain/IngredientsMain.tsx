import React,{useEffect,useContext} from 'react'
import classes from './IngridientsMain.module.css'
import IngridientForm from '../IngridientForm/IngridientForm'
import Search from '../Search/Search'
import IngridientList from '../IngridientList/IngridientList'
import {IN} from '../../types/type'
import Context from '../context/Context'


export default function IngredientsMain() {
const ctx = useContext(Context)
const addItems =(items:IN)=>{
   ctx.addItems(items)
}
const {fetchItems} = ctx
useEffect(()=>{
fetchItems()
},[fetchItems])

  return (
    <div className={classes.main}>
      <IngridientForm addItems={addItems}/>
      <Search/>
      <IngridientList ings={ctx.items}/>
    </div>
  )
}
