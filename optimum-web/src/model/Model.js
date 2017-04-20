import { applyMiddleware, createStore, compose } from "redux" ;
import thunk from "redux-thunk" ;
import promise from "redux-promise-middleware" ;
import Reducers from "../model/reducers" ;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
const middleware = applyMiddleware( promise(), thunk ) ;
const composer = composeEnhancers( middleware ) ;
const Model = createStore( Reducers, composer ) ;

export default Model ;