import React, { Component } from "react";
import icon from '../../images/icon.png';
import styles from "./styles.scss";

export default class About extends Component {
  render() {
    return (
    	<div className={ styles.about }>
		    about
		    <img src={icon} className={ styles.icon } />
	    </div>
    );
  }
}
