import React from "react";
import ReactDOM from "react-dom";
import "./styles/base.less";
import { Provider } from "react-redux";
import Model from "./src/model/Model";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import { MOMENT_LOCALE } from "./src/controller/constants/Environment";
import "moment/locale/ru";
import Moment from "moment";
import Application from "./src/view/Application";

Moment.locale( MOMENT_LOCALE ) ;

ReactDOM.render(
	<Provider store={ Model }>
		<LocaleProvider locale={ enUS }>
			<Application/>
		</LocaleProvider>
	</Provider> ,
	document.getElementById( "stage" )
);