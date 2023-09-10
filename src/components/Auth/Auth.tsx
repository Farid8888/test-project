import React from 'react'
import classes from './Auth.module.css'
import Card from '../UI/Card/Card'

export default function Auth() {
  return (
    <div className={classes.auth}>
       <form className={classes.form}>
           <div className={classes.input}>
            <label htmlFor='email'>Email</label>
            <input id='email' placeholder='Please enter your email' required name='email'/>
           </div>
           <div className={classes.input}>
            <label htmlFor='password'>Password</label>
            <input id='password' placeholder='Please enter your password' name='password' required/>
           </div>
           <div className={classes.btn}>
           <button type='submit'>Log in</button>
           <button type='submit'>Sign up</button>
           </div>
       </form>
    </div>
  )
}
