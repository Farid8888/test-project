import React,{useContext,useEffect} from 'react';
import Layout from './components/Layout/Layout';
import {Routes,Route,Navigate} from 'react-router'
import {MainComponent,ListComponent,AuthComponent,ItemComponent} from './lazy/lazy';
// import { AuthContext } from './components/context/AuthContext';
import {useAppSelector,useAppDispatch} from './components/store/hooks'
import {getData,clean} from './components/store/authSlice'


function App() {
  // const token = useContext(AuthContext).data?.token
  const token = useAppSelector(state=>state.authState.data.token)
  const data = useAppSelector(state=>state.authState.data)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const token = localStorage.getItem("token");
    const exp = localStorage.getItem('expire')
    if (token) {
      dispatch(getData({ token: token, expiresIn: "", userId: "" }));
    }
    console.log("cccccccccccc");
    const currentTime = new Date().getTime();
    console.log(data.expiresIn)
    let newExpire
    if(exp){
     newExpire = currentTime - parseInt(exp)
    }else{
       newExpire =  currentTime - data.expiresIn
    }
    console.log(newExpire,'newnwewexpitw')
    const timer = setTimeout(() => {
      dispatch(clean());
    }, newExpire);
  
    return () => clearTimeout(timer);
  }, [data.expiresIn,dispatch]);
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
