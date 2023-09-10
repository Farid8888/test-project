import React from 'react'
import IngridientList from '../IngridientList/IngridientList';
import {useAppSelector} from '../store/hooks'


export default function LIstPage() {
    const items= useAppSelector((state)=>state.mainSt.items)
const loading = useAppSelector(state=>state.mainSt.loading)
const error = useAppSelector(state=>state.mainSt.error);
  return (
    <div style={{width:'30rem',maxWidth:'95%',margin:'auto'}}>
      <IngridientList ings={items} loading={loading} error={error}/>
    </div>
  )
}
