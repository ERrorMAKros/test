import React, { Component } from "react";
import { connect } from "react-redux";
import "./Stage.less";
import { Link } from 'react-router'

@connect( ( model ) => model )

export default class Stage extends Component {

    render = () => (
        <div id="stage">
		    [ STAGE ]
	        { `${ this.props.location.pathname }` }
		    <ul>
			    <li><Link to='/'>App</Link></li>
			    <li><Link to='/home'>Home</Link></li>
			    <li><Link to='/about'>About</Link></li>
			    <li><Link to='/about/5/124'>About #4 (middleware redirect to [home])</Link></li>
			    <li><Link to='/about/5/125'>About #5</Link></li>
			    <li><Link to='/ninja'>Ninja</Link></li>
		    </ul>
		    {this.props.children}
	    </div>
    )

}