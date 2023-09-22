import React,{useContext} from 'react';
import Layout from './components/Layout/Layout';
import {Routes,Route,Navigate} from 'react-router'
import {MainComponent,ListComponent,AuthComponent,ItemComponent} from './lazy/lazy';
import { AuthContext } from './components/context/AuthContext';


function App() {
  const token = useContext(AuthContext).data?.token
  return (
    <Layout>
      <Routes>
        <Route path='/' element={MainComponent}/>
        {!token && <Route path='/auth' element={AuthComponent}/>}
        {token && <Route path='/list' element={ListComponent}/>}
        {token && <Route path='/list/:id' element={ItemComponent}/>}
        <Route path='*' element={<Navigate to='/' replace/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
