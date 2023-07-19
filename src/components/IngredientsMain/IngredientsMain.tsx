import React,{useEffect,useContext} from 'react'
import classes from './IngridientsMain.module.css'
import IngridientForm from '../IngridientForm/IngridientForm'
import Search from '../Search/Search'
import IngridientList from '../IngridientList/IngridientList'
import {IN} from '../../types/type'
import Context from '../context/Context'
import {useSelector,useDispatch} from 'react-redux'
import {Ing,Items} from '../../types/type'

const IngredientsMain:React.FC=()=> {
const ctx = useContext(Context)
const items:Ing[]= useSelector((state:Items)=>state.items)
const dispatch = useDispatch()
const addItems =(items:IN)=>{
   ctx.addItems(items)
}

useEffect(()=>{
    const sendRequest =async()=>{
        try{
            const response = await fetch('https://auth-with-hooks-default-rtdb.firebaseio.com/.json')
            if(!response.ok){
                throw new Error('Something going wrong')
            }
            const data = await response.json()
            let ing:Ing[] = []
            for(let key in data.form){
                ing=[...ing,
                {
                    ...data.form[key],
                    id:key
                }
                ]
            }
            dispatch({type:'FETCH',itmArr:ing})
        
        }catch(err){
            console.log(err,'error')
           
        }
       
    }
    sendRequest()
},[dispatch])

  return (
    <div className={classes.main}>
      <IngridientForm addItems={addItems}/>
      <Search/>
      <IngridientList ings={items}/>
    </div>
  )
}

export default IngredientsMain