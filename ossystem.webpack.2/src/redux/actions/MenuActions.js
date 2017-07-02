export const MenuActionEvents = {
	MENU_ITEMCHANGED: 'Menu.ITEM_CHANGED'
} ;

export function menuItemChanged( path ) {
	
	const type = MenuActionEvents.MENU_ITEMCHANGED ;
	const data = { path } ;
	
	return (dispatch) => {
		dispatch({ type, data }) ;
	}
}