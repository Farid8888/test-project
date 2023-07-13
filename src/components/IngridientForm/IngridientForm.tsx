import React, { useState } from 'react'
import classes from './IngridientForm.module.css'
import {IN} from '../../types/type'


type Add ={
    addItems:(items:IN)=>void
}

const IngridientForm:React.FC<Add> =(props)=>{
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
    const submitHandler =(event:React.FormEvent)=>{
     event.preventDefault()
        props.addItems(val)
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