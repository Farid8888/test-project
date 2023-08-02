import React, { useState } from 'react'
import classes from './IngridientForm.module.css'
import {useHook} from '../hooks/customHook'
import { useAppSelector } from '../store/hooks'


type V={
    title:string,
    amount:string,
    [key:string]:string
}

const IngridientForm =()=>{
    const items = useAppSelector(state=>state.mainSt.items)
    const [foc,setFoc] = useState(false)
    const [amt,setAmt] = useState(false)

const [val,setVal] =useState({
    title:'',
    amount:''
})
const ind = items.findIndex(itm=>itm.title === val.title)
const itmsInd = items[ind]
const {sendRequest} = useHook('',itmsInd,val,ind,true)
    const changeHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
       const {value,name} = event.target
        setVal(prevSt=>{
            return {...prevSt,[name]:value}
        })
    }

    const focTitle=()=>{
     setFoc(true)
    }
    const focAmount =()=>{
        setAmt(true)
    }

    const validation =Object.values(val).some(item=>item === '')
 console.log(validation,'bblblblbbl')
    let URL:any
    let ITM:any
    
    const submitHandler =(event:React.FormEvent)=>{
     event.preventDefault()
    
    ITM = ind >=0 ? {...items[ind],amount:parseInt(items[ind].amount) + parseInt(val.amount)} : val
    URL =ind<0 ? `https://auth-with-hooks-default-rtdb.firebaseio.com/form/.json` :
    `https://auth-with-hooks-default-rtdb.firebaseio.com/form/${items[ind].id}.json`
    
        sendRequest(URL,ind>= 0 ? 'PUT': 'POST',ITM)
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
           <div className={`${classes.inp} ${!val.title && foc && classes.title}`}>
            <label htmlFor='name'>Name</label>
            <input  type='text' id='name' name='title' placeholder='Please enter a value' onChange={changeHandler} onBlur={focTitle}/>
            <p style={{color:'rgb(201, 69, 100)',margin:0}}>{!val.title && foc && 'Please enter the title'}</p>
           </div>
           <div className={`${classes.inp} ${!val.amount && amt && classes.amount}`}>
            <label htmlFor='amount'>Amount</label>
            <input  type='number' id='amount' name='amount' minLength={1} maxLength={5} onChange={changeHandler} onBlur={focAmount}/>
            <p style={{color:'rgb(201, 69, 100)',margin:0}}>{!val.amount && amt && 'Please enter amount'}</p>
           </div>
           <button className={`${classes.btn} ${validation && classes.valid}`} type='submit'>Add Ingredient</button>
        </form>
    )
}

export default IngridientForm