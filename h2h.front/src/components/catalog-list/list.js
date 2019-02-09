import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Style from "./style.scss";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

export default class extends PureComponent {
  static defaultProps = {
    data: [],
    onEdit: ( item )=>( item ) ,
    onRemove: ( item )=>( item )
  }
  static propTypes = {
    data: PropTypes.array,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }
  render() {
    const { data, onEdit, onRemove } = this.props ;
    const items = data.map(( item, index ) => {
      const { id, homepage, description } = item ;
      return (
        <ListItem button key={ index }>
          <ListItemText primary={ `${ id }. ${ homepage }` } secondary={ description }/>
          <ListItemSecondaryAction>
            <IconButton onClick={ ()=> onEdit && onEdit( item ) } color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={ ()=> onRemove && onRemove( item ) } color="secondary">
              <DeleteForeverIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }) ;
    return (
      <div className={ Style.Items }>
        <List component="nav">{ items }</List>
      </div>
    )
  }
}
