import React,{useEffect} from 'react'
import classes from './IngridientsMain.module.css'
import IngridientForm from '../IngridientForm/IngridientForm'
import Search from '../Search/Search'
import IngridientList from '../IngridientList/IngridientList'
import {useAppSelector,useAppDispatch} from '../store/hooks'
import {mainFetch} from '../store/itemsSlice'




const IngredientsMain:React.FC=()=> {
  console.log('main')
const dispatch = useAppDispatch()
const items= useAppSelector((state)=>state.mainSt.items)
const loading = useAppSelector(state=>state.mainSt.loading)
const error = useAppSelector(state=>state.mainSt.error);

useEffect(()=>{
dispatch(mainFetch({query:''}))
},[dispatch])

  return (
    <div className={classes.main}>
      <IngridientForm/>
      <Search/>
      <IngridientList ings={items} loading={loading} error={error}/>
    </div>
  )
}

export default React.memo(IngredientsMain)