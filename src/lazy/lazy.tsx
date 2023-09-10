import React,{Suspense} from 'react'

const MainLazy = React.lazy(()=>import('../components/pages/MainPage'))
export  const MainComponent = <Suspense fallback={<div ></div>}>
    <MainLazy/>
  </Suspense>
  

  const AuthLazy = React.lazy(()=>import('../components/pages/AuthPage'))
  export const AuthComponent = <Suspense fallback={<div ></div>}>
    <AuthLazy/>
  </Suspense>

const ListLazy = React.lazy(()=>import('../components/pages/LIstPage'))
export const ListComponent = <Suspense fallback={<div ></div>}>
  <ListLazy/>
</Suspense>

const ItemLazy = React.lazy(()=>import('../components/pages/ItemPage'))
  export const ItemComponent = <Suspense fallback={<div ></div>}>
    <ItemLazy/>
  </Suspense>
 