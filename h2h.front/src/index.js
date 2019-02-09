import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import { AppContainer } from "react-hot-loader";
import Application from "./containers/application";
import Moment from "moment";
import store from "./redux/store";

Moment.locale('ru');

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Application/>
		</AppContainer>
	</Provider> ,
	document.getElementById( 'root' )
);

if( module.hot ) module.hot.accept( 'containers/application', () => <Application/> );
