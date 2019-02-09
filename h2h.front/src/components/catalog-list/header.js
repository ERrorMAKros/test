import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Style from "./style.scss";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import ds from "./datasource";

export default class Header extends PureComponent {
  static defaultProps = {
    enabled: false ,
    onClick:()=>{}
  }
  static propTypes = {
    enabled: PropTypes.bool,
    onClick: PropTypes.func
  }
  render() {
    const { enabled, onClick } = this.props ;
    return (
      <div className={ Style.Header }>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton disabled={ enabled } color="inherit" aria-label="Menu" onClick={ () => onClick({ ... ds }) }>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
