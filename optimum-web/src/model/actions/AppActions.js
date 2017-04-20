export default class AppActions {
	
	static ON_CHECKBOX_VALUE = "App.CHECKBOX" ;
	static ON_SELECT_VALUE = "App.SELECT" ;
	static ON_POPUP_VISIBILITY = "App.ON_POPUP_VISIBILITY" ;
	
	constructor( dispatcher ) {
		this.dispatch = dispatcher ;
	}
	
	setCheckboxValue = ( checkboxChecked ) => this.dispatch( { type: AppActions.ON_CHECKBOX_VALUE , checkboxChecked } ) ;
	setSelectedValue = ( selected ) => this.dispatch( { type: AppActions.ON_SELECT_VALUE , selected } ) ;
	setPopupVisibility = ( popupOpened ) => this.dispatch( { type: AppActions.ON_POPUP_VISIBILITY , popupOpened } ) ;

} ;