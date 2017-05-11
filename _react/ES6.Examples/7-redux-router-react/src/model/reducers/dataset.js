const DEFAULTS = {
	menu: [ "x", "y" , "z" ]
} ;

export default ( state = DEFAULTS, action ) => {
	
	/* debug */ console.info( "[R]" , { state , action } ) ;
	
	return { ...state , ...action } ;
}
