import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Style from "./style.scss";

export default class extends PureComponent {
  static defaultProps = {
    data: [],
  }
  static propTypes = {
    data: PropTypes.array,
  }
  render() {
    const { data } = this.props ;
    return (
      <div className={ Style.Footer }>
        Record(s) total: <div data-count-label>{ data ? data.length : "?" }</div>
      </div>
    )
  }
}
