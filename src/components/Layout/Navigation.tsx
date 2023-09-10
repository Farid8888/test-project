import React from 'react'
import {NavLink} from 'react-router-dom'
import classes from './Navigation.module.css'

export default function Navigation() {
  return (
    <header className={classes.navigation}>
        <h1>Title Bar</h1>
      <nav>
        <ul>
            <li><NavLink to='/' className={({isActive,isPending})=>
               isPending ? "pending" : isActive ? classes.active : ""
            }>Main</NavLink></li>
            <li><NavLink to='/auth' className={({isActive,isPending})=>{
              return  isPending ? "pending" : isActive ? classes.active : ""
            }}>Auth</NavLink></li>
            <li><NavLink to='/list' className={({isActive,isPending})=>
               isPending ? "pending" : isActive ? classes.active : ""
            }>List</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
