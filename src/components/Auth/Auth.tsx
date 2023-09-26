import React,{useContext,useState,useEffect} from 'react'
import classes from './Auth.module.css'
import { AuthContext } from '../context/AuthContext'
import {ITM} from '../../types/type'
import {sagaConnect,getData,clean} from '../store/authSlice'
import {useAppSelector,useAppDispatch} from '../store/hooks'

const Auth=()=> {
  const [signedIn,setSign] = useState(false)
  const [val,setVal] = useState<ITM>({
    email:'',
    password:'',
    returnSecureToken:true
  })
  const data = useAppSelector(state=>state.authState.data)
  const Errmsg = useAppSelector(state=>state.authState.error.Errmsg)
  const Paserr =useAppSelector(state=>state.authState.error.Paserr)
  const dispatch = useAppDispatch()

  // const authFunc = useContext(AuthContext).authHandler
  // const data = useContext(AuthContext).data
  // const Errmsg = useContext(AuthContext).error.Errmsg
  // const Paserr = useContext(AuthContext).error.Paserr
const btnHandler =()=>{
setSign(prevst=>!prevst)
}
const changeHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
const {value,name} = e.target
setVal(prevst=>{
  return {...prevst,[name]:value}
})
}
const API = 'AIzaSyCLeJqvFuVUMVHrMMq0qSmm3wqBnVB4szs'
const URL = signedIn ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`
: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`
const submitHandler =(event:React.FormEvent)=>{
  event.preventDefault()
  dispatch(sagaConnect({URL:URL,val:val}))
}

  return (
    <div className={classes.auth}>
       <form className={classes.form} onSubmit={submitHandler}>
           <div className={classes.input}>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' placeholder='Please enter your email' required name='email' onChange={changeHandler}/>
            {Errmsg && <p className={classes.err}>{Errmsg}</p>}
           </div>
           <div className={classes.input}>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' placeholder='Please enter your password' name='password' required onChange={changeHandler}/>
            {Paserr && <p className={classes.err}>{Paserr}</p>}
           </div>
           <div className={classes.btn}>
           <button type='submit'>SUBMIT</button>
           <button type='button' onClick={btnHandler}>SWITCH TO {!signedIn ? 'LOG IN' : 'SIGH UP'}</button>
           </div>
       </form>
    </div>
  )
}
export default Auth