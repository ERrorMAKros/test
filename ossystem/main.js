import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";
import { APPLICATION_ID } from "./src/controller/constants/Environment";
import store from "./src/model/Model";
import enUS from "antd/lib/locale-provider/en_US";
import "./styles/styles.less";
import "./styles/view/Body.less";
import { Router, Route, IndexRoute } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import Application from "./src/view/application/Application";
import Catalog from "./src/view/catalog/Catalog";
import Add from "./src/view/add/Add";
import NotFound from "./src/view/error/NotFound";
import Layout from "./src/view/layout/Layout";

const template = (
	<Provider store={store}>
		<LocaleProvider locale={enUS}>
			<Router history={createBrowserHistory()}>
				<Route path='/' component={Application}>
					<IndexRoute component={Layout}/>
					<Route path='catalog' component={Catalog}/>
					<Route path='add' component={Add}/>
				</Route>
				<Route path='*' component={NotFound}/>
			</Router>
		</LocaleProvider>
	</Provider>
);

const element = document.createElement( "div" );
element.id = APPLICATION_ID;
const node = document.body.childNodes[ 0 ];
document.body.insertBefore( element, node );
const target = document.getElementById( APPLICATION_ID );

ReactDOM.render( template, target );