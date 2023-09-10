import React from 'react';
import Layout from './components/Layout/Layout';
import {Routes,Route,Navigate} from 'react-router'
import {MainComponent,ListComponent,AuthComponent,ItemComponent} from './lazy/lazy';



function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={MainComponent}/>
        <Route path='/auth' element={AuthComponent}/>
        <Route path='/list' element={ListComponent}/>
        <Route path='/list/:id' element={ItemComponent}/>
        <Route path='*' element={<Navigate to='/' replace/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
