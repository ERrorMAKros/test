import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Layout from "./components/Layout"
import store from "./store"

const app = document.getElementById('app');
const $jsx = <Provider store={store}><Layout /></Provider> ;

ReactDOM.render( $jsx, app);