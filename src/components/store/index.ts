
import {take, takeEvery} from 'redux-saga/effects'
import {addItemsAsync,fetchArr,deleteFun,itemFun} from '../store/sagas'
import {authSaga} from '../store/authSaga'
import { all, fork } from "redux-saga/effects";





export function* watchSagas(){
yield takeEvery('items/mainAddItems',addItemsAsync)
yield takeEvery('items/mainFetch',fetchArr)
yield takeEvery('items/mainSearch',fetchArr)
yield takeEvery('items/mainRemove',deleteFun)
yield takeEvery('items/mainItem',itemFun)
yield takeEvery('auth/sagaConnect',authSaga)
} 

// export function* watchFetch(){
//     yield takeEvery('items/mainFetch',fetchArr)
// }
export const rootSaga = function* () {
    yield all([
      fork(watchSagas),
      // Other forks
    ]);
  };
  
  export default rootSaga;