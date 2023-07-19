import React, { useState } from 'react'
import classes from './IngridientForm.module.css'
import {IN} from '../../types/type'
import {useSelector} from 'react-redux'
import {useAppDispatch} from '../store/hooks'
import {Items,Ing,DispatchItm} from '../../types/type'
import {postItems,addItems} from '../store/actions'

type Add ={
    addItems:(items:IN)=>void
}

const IngridientForm:React.FC<Add> =(props)=>{
    const items:Ing[] = useSelector((state:Items)=>state.items)
    const dispatch = useAppDispatch()
    console.log(items,'nnnnnnnnn')
const [val,setVal] =useState({
    title:'',
    amount:''
})
console.log(val)

    const changeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
       const {value,name} = event.target
        setVal(prevSt=>{
            return {...prevSt,[name]:value}
        })
    }
    let URL:any
    let ITM:any
    
    const submitHandler =(event:React.FormEvent)=>{
     event.preventDefault()
    const ind = items.findIndex(itm=>itm.title === val.title)
     
     
    ITM = ind >=0 ? {...items[ind],amount:parseInt(items[ind].amount) + parseInt(val.amount)} : val
    URL =ind<0 ? `https://auth-with-hooks-default-rtdb.firebaseio.com/form/.json` :
    `https://auth-with-hooks-default-rtdb.firebaseio.com/form/${items[ind].id}.json`
    console.log(ITM,ind,'ind')
    fetch(URL,{
        method:ind>= 0 ? 'PUT': 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(ITM)
      }).then(response=>response.json()).then(data=>{
        dispatch({type:'ADD ITEMS',itm:{...val,id:ind<0 ? data.name : items[ind].id}})
        })
    }
    return(
        <form className={classes.form} onSubmit={submitHandler}>
           <div className={classes.inp}>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='title' placeholder='Please enter a value' onChange={changeHandler}/>
           </div>
           <div className={classes.inp}>
            <label htmlFor='amount'>Amount</label>
            <input type='number' id='amount' name='amount' minLength={1} maxLength={5} onChange={changeHandler}/>
           </div>
           <button type='submit'>Add Ingredient</button>
        </form>
    )
}

export default IngridientForm