const MARKER = "★" ;
const COLORS = {
	output: "#fff" ,
	notify: "#00e911" ,
	error: "#e91c87" ,
	info: "#00d0e9"
} ;
const Logger = ( name, msg = null , data = null , color = "white" ) => {
	
	if ( ! name ) name = "";
	else name += " ";
	
	if( ! msg ) msg = "" ;
	if( data.length == 1 ) data = data.shift() ;
	else
		if( ! Boolean( data.length ) ) data = "";
		
	
	/* output */ console.log( "%c" + MARKER + " " + name + msg, "color: " + color + ";", data );
}

export class Debug {

	error = ( className, msg = null , ...data ) => {
		Logger( className, msg, data, COLORS.error );
	}
	warn = ( className, msg = null , ...data ) => {
		Logger( className, msg, data, COLORS.notify );
	}
	log = ( className, msg = null , ...data ) => {
		Logger( className, msg, data, COLORS.output );
	}
	info = ( className, msg = null , ...data ) => {
		Logger( className, msg, data, COLORS.info );
	}
	clear = () => console.clear() ;

}
export default new Debug() ;