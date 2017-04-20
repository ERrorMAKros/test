import React from "react";
import ReactDOM from "react-dom";
import "./styles/base.less";
import "./styles/styles.less";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";
import Model from "./src/model/Model";
import enUS from "antd/lib/locale-provider/en_US";
import Application from "./src/view/Application";

ReactDOM.render(
	<Provider store={ Model }>
		<LocaleProvider locale={ enUS }>
			<Application/>
		</LocaleProvider>
	</Provider>,
	document.getElementById( "stage" )
);