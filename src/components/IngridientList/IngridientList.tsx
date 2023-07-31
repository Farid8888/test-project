import React,{useContext} from 'react'
import classes from './IngridientList.module.css'
import IngridientItem from './IngridientItem'
import Context from '../context/Context'
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner'
import {Ing} from '../../types/type'
import Modal from '../UI/Modal/Modal'


type IngsArr={
ings:Ing[],
loading:boolean,
error:boolean
}

const IngridientList:React.FC<IngsArr>=(props)=> {
    
let content
if(props.ings.length>0){
    content=props.ings.map(ing=>{
        return <IngridientItem key={ing.id} amount={ing.amount} title={ing.title} id={ing.id}/>
    })
}
if(props.loading && !props.error){
    content = <div style={{textAlign:'center',marginTop:'3rem'}}><LoadingSpinner/></div>
}

  return (
    <div className={classes.list}>
      <h1>Loaded Ingredients</h1>
      <div className={classes.line}></div>
      <div>
         {content}
      </div>
    </div>
  )
}


export default IngridientList