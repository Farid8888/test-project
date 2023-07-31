import React from 'react'
import classes from './Card.module.css'

type CH={
    children:React.ReactNode
}

export default function Card(props:CH) {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  )
}
