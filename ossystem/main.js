import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory, Route, IndexRoute } from "react-router";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";
import { APPLICATION_ID } from "./src/controller/constants/Environment";
import store from "./src/model/Model";
import enUS from "antd/lib/locale-provider/en_US";
import RoleBasedComponentDecoration from "./src/controller/decorators/RoleBasedComponentDecoration";
import { ROLE_ADMIN } from "./src/controller/authentication/Roles";
import Bootstrap from "./src/view/structure/bootstrap/Bootstrap";
import Catalog from "./src/view/structure/bootstrap/application/catalog/Catalog";
import Add from "./src/view/structure/bootstrap/application/add/Add";
import NotFound from "./src/view/structure/error/NotFound";
import Home from "./src/view/structure/bootstrap/application/home/Home";
import "./styles/styles.less";

const routes = (
	<div>
		<Route path="/" component={Bootstrap}>
			<IndexRoute component={Home}/>
			<Route path="catalog" component={Catalog} />
			<Route path="add" component={RoleBasedComponentDecoration(Add, [ ROLE_ADMIN ])} />
		</Route>
		<Route path='*' component={NotFound} />
	</div>
) ;

const template = (
	<Provider store={store}>
		<LocaleProvider locale={enUS}>
			<Router history={browserHistory} routes={ routes }/>
		</LocaleProvider>
	</Provider>
);

const element = document.createElement( "div" );
element.id = APPLICATION_ID;
const node = document.body.childNodes[ 0 ];
document.body.insertBefore( element, node );
const target = document.getElementById( APPLICATION_ID );

ReactDOM.render( template, target );