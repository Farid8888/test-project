import React from 'react'
import classes from './StatusBar.module.css'
import {useAppSelector} from '../../store/hooks'
import {ST} from '../../../types/type'


export default function StatusBar() {
    const status = useAppSelector(state=>state.statusSt.status?.status)
    const message = useAppSelector(state=>state.statusSt.status?.message)
    console.log(status,'sssssssss')
    let clasSt =[classes.statusbar,
        status==='pending' ? classes.pending : status==='success' ? classes.green : status === 'error' && classes.red]
  return (
    <div className={clasSt.join(' ')}>
       <div className={classes.status}>{message}</div>
    </div>
  )
}


