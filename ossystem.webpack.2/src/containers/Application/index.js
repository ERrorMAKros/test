import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from "../../components/Menu";

//  import Budget from "../../routes/Budget";
//  import Reports from "../../routes/Reports";
import Home from "../../routes/Home";
import SignIn from "../../routes/SignIn";
import All from "../../routes/All";
import About from "../../routes/About";
import "./style.scss";

const Application = () => (
	<main>
		<Menu />
		<Switch>
			<Route path="/home" component={Home}/>
			<Route path="/about" component={About}/>
			<Route path="/signin" component={SignIn}/>
			<Route path="/all" component={All}/>
			<Redirect to="/home"/>
		</Switch>
	</main>
);

export default Application;
