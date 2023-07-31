import React,{useState,useEffect} from 'react'
import classes from './IngridientsMain.module.css'
import IngridientForm from '../IngridientForm/IngridientForm'
import Search from '../Search/Search'
import IngridientList from '../IngridientList/IngridientList'
import {IN} from '../../types/type'
import Context from '../context/Context'
import {useAppSelector} from '../store/hooks'
import {INST,Items} from '../../types/type'
import {useHook} from '../hooks/customHook'


const IngredientsMain:React.FC=()=> {
    const [mainSt,setMainST] = useState()
    const {sendRequest} =useHook()

const items= useAppSelector((state:INST)=>state.items)
const loading = useAppSelector(state=>state.loading)
const error = useAppSelector(state=>state.error);

console.log(items,'itmsmsdjs')
useEffect(()=>{
    sendRequest('https://auth-with-hooks-default-rtdb.firebaseio.com/form.json','GET')
},[sendRequest])

  return (
    <div className={classes.main}>
      <IngridientForm/>
      <Search/>
      <IngridientList ings={items} loading={loading} error={error}/>
    </div>
  )
}

export default IngredientsMain