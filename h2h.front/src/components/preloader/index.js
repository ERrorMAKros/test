import React, { PureComponent } from "react";
import { Debug } from "../../utils/Common";
import Style from "./style.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types"

export default class Preloader extends PureComponent {
  static defaultProps={
    active: false
  }
  static propTypes={
    active: PropTypes.bool
  }
  constructor( props ) {
    super( props );
    /* debug */ Debug.info( Preloader.name, null, this );
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
