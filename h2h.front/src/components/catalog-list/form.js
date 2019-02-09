import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import ds from "./datasource";

export default class extends PureComponent {
  static defaultProps = {
    data: { ... ds },
    onClose: ()=> {},
    onSubmit: ( data )=>( data ),
  }
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      homepage: PropTypes.string,
      description: PropTypes.string
    }),
    onClose: PropTypes.func ,
    onSubmit: PropTypes.func
  }

  constructor( props ) {
    super( props )
    const { data } = props ;
    this.state = { data }
  }
  render() {
    const { onClose, mode } = this.props ;
    const { data } = this.state ;
    return (
      <Dialog open={ true }>
          <DialogTitle>Fill the fields</DialogTitle>
          <DialogContent>
            <DialogContentText>fields marked with * is required</DialogContentText>
            <ValidatorForm onSubmit={ this.onSubmit } instantValidate={ false }>
              { this.fields( data, mode, this.onChange ) }
              <DialogActions>
                <Button onClick={ onClose } color="primary">CANCEL</Button>
                <Button type="submit">SAVE</Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
    )
  }
  fields = ( data, mode, onChange ) => {
    let fields = null ;
    for( let name in data ) {
      if( name == 'id' ) continue ;
      const value = data[name];
      if( ! fields ) fields = [] ;
      fields.push(
        <TextValidator
          ref={ name }
          key={ name }
          onBlur={this.onBlur}
          label={ `${ name }*` }
          name={ name }
          onChange={ onChange }
          value={ value }
          validators={['required']}
          errorMessages={[ 'this field is required' ]}
        />
      )
    }

    return fields ;
  }

  onChange = ( { target:{ name, value } } ) => {
    this.setState({ data:{ ... this.state.data, [ name ]: value } });
  }
  onBlur = ( { target:{ name, value } } ) => {
    this.refs[name].validate( value );
  }
  onSubmit = () => {
    const { data:{ id }, onSubmit } = this.props ;
    const { data } = this.state ;
    onSubmit && onSubmit({ ... data, id })
  }
}
