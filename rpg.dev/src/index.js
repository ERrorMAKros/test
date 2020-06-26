import React from "react"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import Observer from "./containers/Observer"
import Moment from "moment"
import store from "./redux/store"
import Underscore from "underscore"
import "../src/styles/antd.less"
import "../src/styles/globals.less"

Moment.locale('ru');
Underscore.templateSettings = { interpolate: /\{\{(.+?)\}\}/g } ;

ReactDOM.render(
	<Provider store={ store }>
		<Observer/>
	</Provider>,
	document.getElementById( 'root' )
);

// Hot Module Replacement API
if( module.hot ) module.hot.accept( 'containers/Observer', () => <Observer/> );
