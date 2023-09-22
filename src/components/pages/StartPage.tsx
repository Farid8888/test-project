import React from 'react'
import {Route,Routes} from 'react-router'
import { AuthComponent,ListComponent } from '../../lazy/lazy'

export default function StartPage() {
  return (
    <Routes>
       <Route path='/auth' element={AuthComponent}/>
        <Route path='/list' element={ListComponent}/>
    </Routes>
  )
}
