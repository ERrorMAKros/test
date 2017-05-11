import { applyMiddleware, createStore, compose } from "redux" ;
import logger from "redux-logger" ;
import thunk from "redux-thunk" ;
import promise from "redux-promise-middleware" ;
import Reducers from "./reducers" ;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const middleware = applyMiddleware( promise(), thunk , logger() ) ;
const composer = composeEnhancers( middleware ) ;
const Store = createStore( Reducers, composer ) ;

/*
let unsubscribe = Store.subscribe( ()=> {} ) ;
unsubscribe() ;
*/

export default Store ;