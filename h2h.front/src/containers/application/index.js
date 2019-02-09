import React, { Component } from "react";
import Catalogue from "../catalogue";
import Styles from "./style.scss";

export default class Application extends Component {
	render() {
		return (
      <main className={ Styles.Application }>
        <div className={ Styles.Content }>
          <section>
            <Catalogue />
          </section>
        </div>
      </main>
		)
	}
}
