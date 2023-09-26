import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Navigation.module.css'
// import { AuthContext } from '../context/AuthContext'
import {useAppSelector,useAppDispatch} from '../store/hooks'
import {clean} from '../store/authSlice'

export default function Navigation() {
  // const token = useContext(AuthContext).data?.token
  // const clean = useContext(AuthContext).clean
  const token = useAppSelector(state=>state.authState.data.token)
  const dispatch = useAppDispatch()
  console.log(token,'lsdlsdlsldl')
  return (
    <header className={classes.navigation}>
        <h1>Title Bar</h1>
      <nav>
        <ul>
            <li><NavLink to='/' className={({isActive,isPending})=>
               isPending ? "pending" : isActive ? classes.active : ""
            }>Main</NavLink></li>
            {!token ? <li><NavLink to='/auth' className={({isActive,isPending})=>{
              return  isPending ? "pending" : isActive ? classes.active : ""
            }}>Auth</NavLink></li>
            : <li><NavLink to='/list' className={({isActive,isPending})=>
               isPending ? "pending" : isActive ? classes.active : ""
            }>List</NavLink></li>}
            {token && <li onClick={()=>dispatch(clean())}><NavLink to='/'>Log Out</NavLink></li>}
        </ul>
      </nav>
    </header>
  )
}
