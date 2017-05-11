import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./src/model/Store";


import { Router, Route, IndexRoute } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import Application from "./src/components/Application";
import About from "./src/components/About";
import Home from "./src/components/Home";
import Stage from "./src/components/Stage";
import Ninja from "./src/components/Ninja";
import NotFound from "./src/components/NotFound";

import DecorateComponent from "./src/model/DecorateComponent";

ReactDOM.render(
	<Provider store={ Store }>
		<Router history={ createBrowserHistory() }>
			<Route path='/' component={Stage}>
				<IndexRoute component={Application} />
				<Route path='home' component={Home} />
				<Route path='about(/:x/:y)' component={About} onEnter={ About.middleware } />
				<Route path='ninja' component={DecorateComponent(Ninja)} />
			</Route>
			<Route path='*' component={NotFound} />
		</Router>
	</Provider> ,
	document.getElementById( "stage" )
);