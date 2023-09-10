import React, { useState } from 'react'
import classes from './IngridientForm.module.css'
import {mainAddItems} from '../store/itemsSlice'
import { useAppSelector,useAppDispatch } from '../store/hooks'





const IngridientForm =()=>{
    const dispatch = useAppDispatch()
    const items = useAppSelector(state=>state.mainSt.items)
    const [foc,setFoc] = useState(false)
    const [amt,setAmt] = useState(false)

const [val,setVal] =useState({
    title:'',
    amount:''
})
const ind = items.findIndex(itm=>itm.title === val.title)
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
    let URL:any
    let ITM:any
    
    const submitHandler =(event:React.FormEvent)=>{
     event.preventDefault()
    ITM = ind >=0 ? {...items[ind],amount:parseInt(items[ind].amount) + parseInt(val.amount)} : val
    URL =ind<0 ? `https://auth-with-hooks-default-rtdb.firebaseio.com/form/.json` :
    `https://auth-with-hooks-default-rtdb.firebaseio.com/form/${items[ind].id}.json`
    const mth = ind>= 0 ? 'put': 'post'
    const itms = {val,ind,id:items[ind]}
        dispatch(mainAddItems({ITM,itms,URL,mth}))
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

export default React.memo(IngridientForm)