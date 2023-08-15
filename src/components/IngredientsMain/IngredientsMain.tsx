import React,{useEffect,useMemo} from 'react'
import classes from './IngridientsMain.module.css'
import IngridientForm from '../IngridientForm/IngridientForm'
import Search from '../Search/Search'
import IngridientList from '../IngridientList/IngridientList'
import {useAppSelector,useAppDispatch} from '../store/hooks'
import {mainFetch} from '../store/itemsSlice'
import {INST,} from '../../types/type'
import {useHook} from '../hooks/customHook'
import StatusBar from '../UI/StatusBar/StatusBar'



const IngredientsMain:React.FC=()=> {
    // const {sendRequest} =useHook(null,null,null,null,false)
const dispatch = useAppDispatch()
const items= useAppSelector((state)=>state.mainSt.items)
const loading = useAppSelector(state=>state.mainSt.loading)
const error = useAppSelector(state=>state.mainSt.error);

useEffect(()=>{
    // sendRequest('https://auth-with-hooks-default-rtdb.firebaseio.com/form.json','GET')
//  dispatch(fetchArr(''))
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

export default IngredientsMain