import React from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'
import Card from '../Card/Card'


type BC ={
    modalHandler:()=>void,
}

type OV ={
    children?:React.ReactNode
}

type MD={
    children:React.ReactNode,
    modalHandler:()=>void
}
const BackDrop =(props:BC)=>{
    return(
        <div className={classes.backDrop} onClick={props.modalHandler}>
            <OverLay/>
            </div>
    )
} 
const OverLay =(props:OV)=>{
    return(
        <div className={classes.overlay}><Card>{props.children}</Card></div>
    )
} 


const Modal =(props:MD)=>{
    return(
        <React.Fragment>
       {ReactDOM.createPortal(<BackDrop modalHandler={props.modalHandler}/>,document.getElementById('modal')!)}
       {ReactDOM.createPortal(<OverLay>{props.children}</OverLay>,document.getElementById('modal')!)}
       </React.Fragment>
    )
}

export default Modal



