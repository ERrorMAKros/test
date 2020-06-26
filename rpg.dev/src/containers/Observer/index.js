import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import Application from "../../components/Application";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";

export default class extends Component {
	state = {}
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<LocaleProvider locale={ enUS }>
				<Router>
					<AppContainer>
						<Application/>
					</AppContainer>
				</Router>
			</LocaleProvider>
		)
	}
	componentDidMount() {}
}
