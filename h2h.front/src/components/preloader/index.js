import React, { PureComponent } from "react";
import Style from "./style.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

export default class Preloader extends PureComponent {
  static defaultProps={
    active: false
  }
  static propTypes={
    active: PropTypes.bool
  }
  render() {
    const { active, children } = this.props ;
    return active ? (
      <div className={ Style.Preloader }>
        <CircularProgress className={ Style.Spinner } color="secondary" />
      </div>
    ) : children ;
  }
}
