import SearchReducer from '../Reducer/SearchReducer'

import { applyMiddleware } from 'redux'
import MiddleReSa from '../Saga/MiddleGesa'
import createSagaMiddleware from 'redux-saga'
var redux = require("redux")
const sagaMiddleware = createSagaMiddleware()

const allReducer = redux.combineReducers({
    Search: SearchReducer
})
export default redux.createStore(allReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(MiddleReSa) 